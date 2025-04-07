import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { BsFillBagCheckFill } from 'react-icons/bs';
import {MyContext} from '../../App';
import { FaPlus } from 'react-icons/fa';
import Radio from '@mui/material/Radio';



const Checkout = () => {

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const context = useContext(MyContext);

    const [isChecked, setIsChecked] = useState(0);

    const handleChange=(e,index)=>{
        if(e.target.checked){
            setIsChecked(index)
        }
    }

    

    return(
        <section className='py-10 mt-28'>
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
                                                <Radio size="small" onChange={(e)=>handleChange(e,index)} checked={isChecked === index}/>
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

                        <div className="scroll max-h-[250px] overflow-y-scroll overflow-x-hidden pr-5">
                            
                            {
                                context?.cartData?.length !==0 && context?.cartData?.map((item,index)=>{
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

                        <div className="mt-3">
                            <Button className="btn-org w-full flex gap-2 items-center"><BsFillBagCheckFill className="text-[20px]"/>Thanh toán</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Checkout;
