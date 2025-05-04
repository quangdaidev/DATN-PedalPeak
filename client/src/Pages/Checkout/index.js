import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button,CircularProgress } from '@mui/material';
import { BsFillBagCheckFill } from 'react-icons/bs';
import {MyContext} from '../../App';
import { FaPlus } from 'react-icons/fa';
import Radio from '@mui/material/Radio';
import { deleteData, editData, fetchDataFromApi, postData } from '../../utils/api';
import moment from 'moment';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';


import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { PhoneInput } from 'react-international-phone';


const Checkout = () => {

    const history = useNavigate();

    let total = 0;
    
    useEffect(()=>{
        const token = localStorage.getItem("accessToken");

        if(token===null){
            history("/");
        }
    },)

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const [userData, setUserData] = useState(null);
    const context = useContext(MyContext);
    let amount = 0;
    const [isChecked, setIsChecked] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [totalAmount, setTotalAmount] = useState();


    useEffect(() => {
        setUserData(context?.userData)
        setSelectedAddress(context?.userData?.address_details[0]?._id);

        fetchDataFromApi(`/api/order/order-list`).then((res)=>{
            console.log("order-list:::",res)
        })
    },[context?.userData, userData])


    useEffect(() => { 
        setTotalAmount (
            context.cartData?.length !== 0 ?
            context.cartData?.map(item => parseInt(item.price)* item.quantity).reduce((total, value) => total + value) : 0
        )
        
        // localStorage.setItem("totalAmount", context.cartData?.length !== 0 ? 
        // context.cartData?.map(item => parseInt(item.price) * item.quantity) 
        // .reduce((total, value) => total + value, 0): 0)
        // ?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })
    }, [context.cartData])
        

    const handleChange=(e,index)=>{
        if(e.target.checked){
            setIsChecked(index);
            setSelectedAddress(e.target.value)
        }
    }

    const checkout = (e) => {
        e.preventDefault();
        const user = context?.userData;

        if(userData?.address_details?.length !==0){
            let date = new Date();
            const payLoad = { 
                userId: user?._id,
                products: context?.cartData, 
                paymentId:  moment(date).format('DDHHmmss'),
                payment_status: "Chờ thanh toán online", 
                delivery_address: selectedAddress,
                totalAmt: totalAmount,
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })
            };

            postData(`/api/order/create?token=${localStorage.getItem("accessToken")}`, payLoad).then((res) => { 
                deleteData(`/api/cart/emptyCart/${user?._id}`).then((res) =>{
                    // context?.setCartData();
                    context?.getCartItems()
                })
            });

            postData("/api/payment/create_payment_url",{ amount: amount }).then((res)=>{
                // window.open(res?.data, '_blank', 'width=1200,height=900');
                window.open(res?.data);
            })

            history("/");


        } else {
            context.openAlertBox("error", "Bạn cần thêm địa chỉ nhận hàng");
        } 
           
    };

    const cashOnDelivery = () => {
        const user = context?.userData;

        if(userData?.address_details?.length !==0){
            const payLoad = { 
                userId: user?._id,
                products: context?.cartData, 
                paymentId: '',
                payment_status: "Trả tiền mặt", 
                delivery_address: selectedAddress,
                totalAmt: totalAmount,
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })
            };
    
    
            postData(`/api/order/create?token=${localStorage.getItem("accessToken")}`, payLoad).then((res) => { 
                if (res?.error === false) {
                    context.openAlertBox("success", res?.message);
                    history("/order/success");
                    deleteData(`/api/cart/emptyCart/${user?._id}`).then((res) =>{
                    // context?.setCartData();
                    context?.getCartItems()
                    })
                } else {
                    context.openAlertBox("error", res?.message);
                    history("/order/failed");
                }      
            });
        } else {
            context.openAlertBox("error", "Bạn cần thêm địa chỉ nhận hàng");
        }
    }
            
    const [mode,setMode] = useState("Thêm");
    const [address, setAddress] = useState([]);
    const [addressType, setAddressType] = useState("");
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [phone,setPhone] = useState('');
    const [addressId, setAddressId] = useState("");

    const [formFields, setFormFields] = useState({
        street:"",   
        ward:"",
        district:"",
        city:"",
        mobile: phone,
        status:true,
        addressType:"",
        userId:context?.userData?._id 
    });

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setFormFields(()=>{
            return {
                ...formFields,
                [name]: value
            }
        })
    }


    const handleClose = () => {
        setIsOpenModel(false);
        // setSelectedValue(value);
    };

    const handleChangeAddressType=(event)=>{
        setAddressType(event.target.value);
        setFormFields((prevState) => ({
            ...prevState,
            addressType: event.target.value
        }))
    }

    
    const handleSubmit = (e) => {
        
        e.preventDefault();

        setIsLoading(true);

        if (formFields.street === "") {
            context.openAlertBox("error", "Vui lòng điền địa chỉ nhà");
            setIsLoading(false);
            return false
        }

        if (formFields.ward === "") {
            context.openAlertBox("error", "Vui lòng điền tên phường" );
            setIsLoading(false);
            return false
        }

        if (formFields.district === "") {
            context.openAlertBox("error", "Vui lòng điền tên quận/huyện");
            setIsLoading(false);
            return false
        }

        if (formFields.city === "") {
            context.openAlertBox("error", "Vui lòng điền tên thành phố/tỉnh");
            setIsLoading(false);
            return false
        }

        if (formFields.phone === "") {
            context.openAlertBox("error", "Vui lòng điền số điện thoại");
            setIsLoading(false);
            return false
        }

        
        if (!/^\+?\d{8,15}$/.test(formFields.mobile)) {
            context.openAlertBox("error", " Vui lòng nhập đúng định dạng quốc tế (ví dụ: +84912345678).");
            setIsLoading(false);
            return false;
        }

        if (formFields.addressType === "") {
            context.openAlertBox("error", "Vui lòng chọn loại địa chỉ");
            setIsLoading(false);
            return false
        }

        if(mode === "Thêm"){
            const token = localStorage.getItem('accessToken');

            postData(`/api/address/add?token=${token}`, formFields, {withCredentials: true}).then((res) => {
                console.log("address",res)
                if(res?.error !== true) {
                    setTimeout(()=>{
                        setIsLoading(false);
                        setIsOpenModel(false);
                    },500)
                    // console.log("success",res?.message)
                    context.openAlertBox("success", res?.message);
                    
    
                    // context?.setisOpenFullScreenPanel({
                    //     open: false
                    // })
    
                    // fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                    //     context?.setAddress(res.data);
                    // })
                    fetchDataFromApi(`/api/user/user-details?token=${token}`).then((res)=>{
                        setAddress(res.data?.address_details);
                        setFormFields({
                            street:"",   
                            ward:"",
                            district:"",
                            city:"",
                            mobile: "",
                            status:true,
                            addressType:"",
                            userId:context?.userData?._id 
                        })
                        setAddressType("");
                        setPhone("");
                        context?.setUserData(res.data);
                    })
                } else {
                    context.openAlertBox("error", res?.data?.message);
                    setIsLoading(false);
                }
            })   
        }

        // console.log("address---bf-bf",formFields);
        if(mode==="Cập nhật"){
            setIsLoading(true);
            editData(`/api/address/${addressId}?token=${localStorage.getItem('accessToken')}`,formFields, {withCredentials: true}).then((res)=> {
                // console.log("allAddress::",res);
                
                context.openAlertBox("success", res?.message);
                fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}&&token=${localStorage.getItem('accessToken')}`).then((res) => {
                    setAddress(res.data);
                    setTimeout(()=>{
                        setIsLoading(false);
                        setIsOpenModel(false);
                    },500)
                    setFormFields({
                        street:"",   
                        ward:"",
                        district:"",
                        city:"",
                        mobile: "",
                        status:true,
                        addressType:"",
                        userId:context?.userData?._id 
                    })
                    setAddressType("");
                    setPhone("");

                    fetchDataFromApi(`/api/user/user-details?token=${localStorage.getItem('accessToken')}`).then((res)=>{
                        context?.setUserData(res.data);
                    })
                })
            })
        }
    }

    const editAddress=(id)=>{
        setMode("Cập nhật");
        setIsOpenModel(true);

        setAddressId(id);

        const token = localStorage.getItem('accessToken');
        
        fetchDataFromApi(`/api/address/${id}?token=${token}`).then((res)=>{
            setFormFields({
                street: res?.data?.street,   
                ward: res?.data?.ward,
                district: res?.data?.district,
                city: res?.data?.city,
                mobile: res?.data?.mobile,
                status: res?.data?.status,
                addressType: res?.data?.addressType,
                userId: res?.data?.userId
            })

            const ph = `"${res?.data?.mobile}"`;
            setPhone(ph);

            // setPhone(res?.data?.mobile);
            setAddressType(res?.data?.addressType)
        })
    }

    return(
        <section className='py-10 mt-28'>
            <form onSubmit={checkout}>
                <div className='w-[70%] m-auto flex gap-5'>
                    <div className="leftCol w-[60%]">
                        <div className="card bg-white shadow-md p-5 rounded-md w-full"> 
                            <div className="flex items-center justify-between">
                                <h2>Địa chỉ nhận hàng</h2>
                                <Button  onClick={() => setIsOpenModel(true)} variant="outlined"><FaPlus/>THÊM ĐỊA CHỈ MỚI</Button>
                            </div>

                            <br/>

                            <div className="flex flex-col gap-4">

                                {
                                    context?.userData?.address_details?.length !== 0 ? context?.userData?.address_details?.map((address, index) =>{
                                        return(
                                            <label className={`flex gap-3 p-4 border border-[rgba(0,0,0,0.1)] rounded-md relative ${isChecked===index && 'bg-blue-50'}`} key={index}>
                                                <div>
                                                    <Radio size="small" onChange={(e)=>handleChange(e,index)} checked={isChecked === index} value={address?._id}/>
                                                </div>
                                                
                                                <div className="info">
                                                    <span className="inline-block text-[13px] font-[500] p-1 bg-[#f1f1f1] rounded-md">{address?.addressType}</span>
                                                    <h3>{context?.userData?.name}</h3>
                                                    <p className="mt-0 mb-0">
                                                        {address.street + " - "+
                                                        address.ward + " - "+
                                                        address.district + " - "+
                                                        address.city }
                                                    </p>
                                                    <p className="mb-0 font-[500]">{context?.address?.mobile}</p>
                                                </div>
                                                <Button onClick={()=>editAddress(address?._id)} variant="text" className="!absolute top-[15px] right-[15px]" size="small">Cập nhật</Button>
                                            </label>
                                        )
                                    })

                                    :

                                    <>
                                    <div className="flex items-center mt-5 justify-between flex-col p-5"> 
                                        <img src="https://i.pinimg.com/564x/ff/05/dc/ff05dc4dad240614d98afb8fe10733dc.jpg" width="100" alt=""/>
                                        <h2 className="text-center">Bạn chưa thiết lập địa chỉ</h2> 
                                        <p className="mt-0">Thêm địa chỉ nhận hàng</p>
                                        <Button className="btn-org">TẠI ĐÂY</Button>
                                    </div>

                                    </>
                                }

                            </div>


                        </div>
                    </div>

                    <div className="rightCol w-[50%]">
                        <div className="card shadow-md bg-white p-5 rounded-md">
                            <h2 className="mb-4">Đơn hàng của bạn</h2>

                            <div className="flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.1)]">
                                <span className="text-[14px] font-[600]">Sản phẩm </span> 
                                <span className="text-[14px] font-[600]">Tổng tiền</span> 
                            </div>

                            <div className="scroll max-h-[250px] overflow-y-scroll overflow-x-hidden ">
                                
                                {
                                    context?.cartData?.length !==0 && context?.cartData?.map((item,index)=>{
                                        total += item?.price*item?.quantity;
                                        amount = total;
                                        return(
                                            <div className="flex items-center justify-between py-2" key={index}> 
                                                <div className="part flex items-center gap-3"> 
                                                    <div className="size-16 shrink-0 overflow-hidden rounded-md border border-gray-200 group cursor-pointer">
                                                        <img alt="" src={item.image} 
                                                        className='h-[60px] bg-contain bg-no-repeat w-full transition-all group-hover:scale-105'/>
                                                    </div>

                                                    <div className="info">
                                                        <h4 className="text-[14px]">{item?.productTitle?.substr(0,20)+'...'}</h4>
                                                        <span className="text-[13px]">Số lượng: {item?.quantity}</span>
                                                        <div className="text-[13px]">Màu sắc: {item?.colorChose}</div>
                                                    </div>
                                                </div>

                                                <span className="text-[14px] font-[500]">{VND.format(item?.price*item?.quantity)}</span>
                                            </div>
                                        )
                                    })
                                }
                                
                            </div>

                            <div className="flex flex-col  py-3 border-t border-b border-[rgba(0,0,0,0.1)]">
                                <div className="flex justify-between py-1 pr-[4px]">
                                    <span className="text-[14px] font-[500]">Tổng tiền hàng </span> 
                                    <span className="text-[14px] font-[600]">{VND.format(total)}</span> 
                                </div>
                                <div className="flex justify-between py-1 pr-[4px]" >
                                    <span className="text-[14px] font-[500]">Phí vận chuyển </span> 
                                    <span className="text-[14px] font-[600]">{VND.format(0)}</span> 
                                </div>
                                <div className="flex justify-between py-1 pr-[4px]">
                                    <span className="text-[14px] font-[500]">Giảm giá </span> 
                                    <span className="text-[14px] font-[600]">{VND.format(0)}</span> 
                                </div>
                            </div>
                           
                            <div className="flex flex-col py-3 border-t border-b border-[rgba(0,0,0,0.1)]">
                                <div className="flex justify-between py-1 pr-[4px]">
                                    <span className="text-[14px] font-[600]">Tổng tiền thanh toán </span> 
                                    <span className="text-[14px] font-[600]">{VND.format(amount)}</span> 
                                </div>
                                <div className="flex text-center py-1">
                                    <span className=" text-[14px] font-[300] ">
                                    (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)
                                    </span> 
                                </div>
                            </div>
                            
                            <div className="flex  items-center flex-col gap-3 mb-2">
                            
                                <Button type="submit" className="btn-org w-full flex gap-2 items-center"><BsFillBagCheckFill className="text-[20px]"/>VNPay</Button>
                           
                                <Button type="button" className="btn-dark btn-lg w-full flex gap-2 items-center" onClick={cashOnDelivery}>
                                    <BsFillBagCheckFill className="text-[20px]" />
                               Tiền mặt</Button>

                              
                            </div>
                            
                        </div>
                    </div>
                </div>
            </form>
            <Dialog open={isOpenModel}>
                <DialogTitle>{mode==="Thêm" ? 'Thêm' : 'Cập nhật'} địa chỉ</DialogTitle>
                <form className="p-8 py-3 pb-8" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-5 pb-5">
                        <div className='col w-[100%]'>
                            <TextField 
                                className="w-full" 
                                label="địa chỉ nhà" 
                                variant="outlined" 
                                size="small"
                                name="street" 
                                value={formFields.street || ''}
                                onChange={onChangeInput} 
                            />
                        </div>               
                    </div>

                    <div className="flex items-center gap-5 pb-5">
                        <div className='col w-[50%]'>
                            <TextField 
                                className="w-full" 
                                label="Phường/Xã" 
                                variant="outlined" 
                                size="small"
                                name="ward" 
                                onChange={onChangeInput} 
                                value={formFields.ward || ''}
                            />
                        </div>     
                        <div className='col w-[50%]'>
                            <TextField 
                                className="w-full" 
                                label="Quận/Huyện" 
                                variant="outlined" 
                                size="small"
                                name="district" 
                                onChange={onChangeInput} 
                                value={formFields.district || ''}
                            />
                        </div>                         
                    </div>

                    <div className="flex items-center gap-5 pb-5">
                        <div className='col w-[50%]'>
                            <TextField 
                                className="w-full" 
                                label="Thành phố/Tỉnh" 
                                variant="outlined" 
                                size="small"
                                name="city" 
                                onChange={onChangeInput} 
                                value={formFields.city || ''}
                            />
                        </div> 
                        <div className='col w-[50%]'>
                            <PhoneInput
                                defaultCountry='vn'
                                value={phone}
                                onChange={(phone) => {
                                    setPhone(phone);
                                    setFormFields({
                                        street:formFields.street,   
                                        ward:formFields.ward,
                                        district:formFields.district,
                                        city:formFields.city,
                                        mobile: phone,
                                        status:formFields.status,
                                        userId:context?.userData?._id ,
                                        selected: false
                                    })
                                }}
                            />
                        </div>                      
                    </div>

                    <div className="flex gap-5 pb-5 flex-col">
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Địa chỉ này là: </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                className='flex items-center gap-5'
                                value={addressType}
                                onChange={handleChangeAddressType}
                            >
                                <FormControlLabel value="Nhà riêng" control={<Radio />} label="Nhà riêng" />
                                <FormControlLabel value="Nơi làm việc" control={<Radio />} label="Nơi làm việc" />
                                
                            </RadioGroup>
                        </FormControl>
                    
                        <div className='col w-[50%]'>
                        
                        </div>                      
                    </div>

                    <div className="flex items-center gap-5">
                    {
                        isLoading === true ?
                        <Button type="submit" disabled={true} className="btn-org btn-lg w-full flex gap-2 items-center CircularProgress">
                            <CircularProgress color="inherit"/>                                          
                        </Button>
                        :
                        <Button type="submit" disabled={false} className="btn-org btn-lg w-full flex gap-2 items-center">Lưu</Button>
                    }
                    
                        <Button className="btn-org btn-border btn-lg w-full flex gap-2 items-center" onClick={handleClose}>Hủy</Button>
                    </div>
                </form>
                
            </Dialog> 
        </section>
    )
}

export default Checkout;
