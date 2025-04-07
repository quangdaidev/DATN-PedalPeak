import React, {useContext, useEffect, useState} from 'react'
import AccountSidebar from '../../Components/AccountSidebar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { MyContext } from '../../App';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Alert, Button, CircularProgress, Select } from '@mui/material';
import { deleteData, editData, fetchDataFromApi, postData } from '../../utils/api';
import AddressBox from './addressBox';



const label = { inputProps: {'aria-label': 'Checkbox demo'}};

const Address = () => {

    const [phone,setPhone] = useState('');
 
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [address, setAddress] = useState([]);
    const [addressType, setAddressType] = useState("");
    const [mode,setMode] = useState("Thêm");

    const [addressId, setAddressId] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const context = useContext(MyContext);

    useEffect(()=>{

        if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {

            setAddress(context?.userData?.address_details);
            
            // const token = localStorage.getItem('accessToken');
            
            // fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}?token=${token}`).then((res) => {
                //     setAddress(res.Data);
                // })
               
        } 
    },[context?.userData])

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


    const removeAddress = (id) => {
        deleteData(`/api/address/${id}`).then((res) => {
            if(res?.error !== true) {
            console.log("delete", res)
            context.openAlertBox("success", res?.message);
            const token = localStorage.getItem('accessToken');
            fetchDataFromApi(`/api/user/user-details?token=${token}`).then((res)=>{
                setAddress(res.data?.address_details);
            })
            } else {
                context.openAlertBox("error", res?.data?.message);
            }
        })
    }

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
            return false
        }

        if (formFields.ward === "") {
            context.openAlertBox("error", "Vui lòng điền tên phường" );
            return false
        }

        if (formFields.district === "") {
            context.openAlertBox("error", "Vui lòng điền tên quận/huyện");
            return false
        }

        if (formFields.city === "") {
            context.openAlertBox("error", "Vui lòng điền tên thành phố/tỉnh");
            return false
        }

        if (formFields.phone === "") {
            context.openAlertBox("error", "Vui lòng điền số điện thoại");
            return false
        }

        if (formFields.addressType === "") {
            context.openAlertBox("error", "Vui lòng chọn loại địa chỉ");
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
                })
            })
        }
       
    }

    
    const editAddress = (id) => {

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

        // postData(`/api/address/add?token=${token}`, formFields, {withCredentials: true}).then((res) => {
        //     console.log("address",res)
        //     if(res?.error !== true) {
        //         setIsLoading(false);
        //         console.log("success",res?.message)
        //         context.openAlertBox("success", res?.message);
        //         setIsOpenModel(false);

        //         // context?.setisOpenFullScreenPanel({
        //         //     open: false
        //         // })

        //         // fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
        //         //     context?.setAddress(res.data);
        //         // })
        //         fetchDataFromApi(`/api/user/user-details?token=${token}`).then((res)=>{
        //             setAddress(res.data?.address_details);
        //             setFormFields({
        //                 street:"",   
        //                 ward:"",
        //                 district:"",
        //                 city:"",
        //                 mobile: "",
        //                 status:true,
        //                 addressType:"",
        //                 userId:context?.userData?._id 
        //             })
        //             setAddressType("");
        //             setPhone("");
        //         })
        //     } else {
        //         context.openAlertBox("error", res?.data?.message);
        //         setIsLoading(false);
        //     }
        // })   
    }


  return (
    <>
        <section className="mt-40 mb-16 w-full ">
            <div className="container flex gap-5">
                <div className="col1 w-[20%]">
                    <AccountSidebar/>
                </div>

                <div className="col2 w-[50%]">
                    <div className="card bg-white p-5 shadow-md rounded-md">
                        <div className="flex items-center pb-3">
                            <h2 className="pb-0">Địa chỉ</h2>
                        </div>
                        <hr/>

                        <div className="flex items-center justify-center p-5 rounded-md border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer"
                            onClick={() => setIsOpenModel(true)}
                        >
                            <span className="text-[14px] font-[500px]">Thêm địa chỉ</span>
                        </div>

                        <div className="flex gap-2 flex-col mt-4">
                            {
                                address?.length > 0 && address?.map((address,index)=>{
                                    return (
                                        <AddressBox address={address} key={index} removeAddress={removeAddress} editAddress={editAddress}/>
                                    )
                                })

                            }
                        </div>
                    </div>
                                
                </div>
            </div>
        </section>

        <Dialog open={isOpenModel}>
            <DialogTitle>{mode==="add" ? 'Thêm' : 'Cập nhật'} địa chỉ</DialogTitle>
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
    </>
  )
}

export default Address;
