import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { BsFillBagCheckFill } from 'react-icons/bs';
import {MyContext} from '../../App';
import { FaPlus } from 'react-icons/fa';
import Radio from '@mui/material/Radio';
import { deleteData, fetchDataFromApi, postData } from '../../utils/api';
import moment from 'moment';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const VITE_APP_RAZORPAY_KEY_ID = "zsp_test_lh06WJjtmN7Evj";
const VITE_APP_RAZORPAY_KEY_SECRET = "cQ1LJqRbvB92QhrWUF042X7";

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

    const [vnpSecureHash, setVnpSecureHash] = useState('');

    const vnpHashSecret = '57G56MRY30CVNJ9MC3S0S24IXJJGK2ZG';  // Thay thế bằng khóa bảo mật của bạn từ VNPAY

    // Hàm tạo chuỗi query từ đối tượng options
    function createQueryString(params) {
        return Object.keys(params).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');
    }
    
  // Hàm tạo SecureHash
    const createVnpSecureHash = (params) => {
    // Sắp xếp các tham số theo thứ tự từ A đến Z (theo key)
        const sortedKeys = Object.keys(params).sort();
        let hashString = '';

        // Xây dựng chuỗi các tham số
        sortedKeys.forEach((key) => {
            if (params[key]) {
                hashString += `${key}=${params[key]}&`;
            }
        });

        // Loại bỏ dấu "&" thừa ở cuối chuỗi
        hashString = hashString.slice(0, -1);

        // Tạo SecureHash bằng HMAC-SHA512
        const secureHash = CryptoJS.HmacSHA512(hashString, vnpHashSecret).toString(CryptoJS.enc.Hex).toUpperCase();

        return secureHash;
    };

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

    // const checkout=(e)=>{
    //     e.preventDefault();

    //     var options = {
    //         key: VITE_APP_RAZORPAY_KEY_ID,
    //         key_secret: VITE_APP_RAZORPAY_KEY_SECRET,
    //         amount: parseInt(totalAmount * 100),
    //         currency: "INR",
    //         order_receipt: context?.userData?.name,
    //         name: "PedalPeak Shop",
    //         description: "cho mục đích thử ngiệm",
    //         handler: function (response) {
    //             // console.log(response);

    //             const paymentId = response.Razorpay_payment_id;

    //             const user = context?.userData;

    //             const payLoad = {
    //                 userId: user?._id,
    //                 products: context?.cartData,
    //                 paymentId: paymentId,
    //                 payment_status:"COMPLETED",
    //                 delivery_address: selectedAddress,
    //                 totalAmt: totalAmount,
    //                 date: new Date().toLocaleString("en-US", {
    //                     month: "short",
    //                     day: "2-digit",
    //                     year: "numeric",
    //                 })
    //             };

    //             // postData(`/api/order/create`, payLoad).then((res) => { 
    //             //     context.openAlertBox("success", res?.message);
    //             //     if (res?.error === false) {
    //             //     deleteData(`/api/cart/emptyCart/${user?._id}`).then((res) => {
    //             //         context?.getCartItems();
    //             //     })
    //             //     history("/");
    //             //     } else {
    //             //         context.alertBox("error", res?.message);
    //             //     }
    //             // });               
    //         },

    //         theme: {
    //             color: "#ff5252",
    //         },
    //     }

    //     var pay = new window.Razorpay(options);
    //     pay.open();

    // }

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
                window.open(res?.data, '_blank', 'width=1100,height=900');
            })

            // Xử lý sau khi thanh toán thành công hoặc thất bại
            // window.addEventListener("paymentResult", function(event) {
            //     const result = event.detail;
                
            //     // Kiểm tra kết quả thanh toán
            //     if (result.vnp_ResponseCode === '00') {
            //         // Thanh toán thành công
            //         const paymentId = result.vnp_PaymentId;
        
            //         const user = context?.userData;
        
            //         const payLoad = {
            //             userId: user?._id,
            //             products: context?.cartData,
            //             paymentId: paymentId,
            //             payment_status: "COMPLETED",
            //             delivery_address: selectedAddress,
            //             totalAmt: totalAmount,
            //             date: new Date().toLocaleString("en-US", {
            //                 month: "short",
            //                 day: "2-digit",
            //                 year: "numeric",
            //             }),
            //         };
        
            //         // // Gửi dữ liệu đơn hàng lên server
            //         // postData(`/api/order/create`, payLoad).then((res) => {
            //         //     context.openAlertBox("success", res?.message);
            //         //     if (res?.error === false) {
            //         //         deleteData(`/api/cart/emptyCart/${user?._id}`).then((res) => {
            //         //             context?.getCartItems();
            //         //         });
            //         //         history("/");
            //         //     } else {
            //         //         context.alertBox("error", res?.message);
            //         //     }
            //         // });
            //     } else {
            //         // Thanh toán thất bại
            //         context.alertBox("error", "Thanh toán không thành công!");
            //     }
            // });
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
            
        

    return(
        <section className='py-10 mt-28'>
            <form onSubmit={checkout}>
                <div className='w-[70%] m-auto flex gap-5'>
                    <div className="leftCol w-[60%]">
                        <div className="card bg-white shadow-md p-5 rounded-md w-full"> 
                            <div className="flex items-center justify-between">
                                <h2>Địa chỉ nhận hàng</h2>
                                <Button variant="outlined"><FaPlus/>THÊM ĐỊA CHỈ MỚI</Button>
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
                                                    <p className="mb-0 font-[500]">{context?.userData?.mobile}</p>
                                                </div>
                                                <Button variant="text" className="!absolute top-[15px] right-[15px]" size="small">Cập nhật</Button>
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
                                                        <div className="text-[13px]">Màu sắc: {item?.color}</div>
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
        </section>
    )
}

export default Checkout;
