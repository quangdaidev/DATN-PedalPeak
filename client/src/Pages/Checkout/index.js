import React from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { BsFillBagCheckFill } from 'react-icons/bs';

const Checkout = () => {
    return(
        <section className='py-10 mt-28'>
            <div className='container flex gap-5'>
                <div className="leftCol w-[70%]">
                    <div className="card bg-white shadow-md p-5 rounded-md w-full"> 
                        <h1>Hóa đơn chi tiết</h1>

                        <form className='w-full mt-5'>
                            <div className="flex items-center gap-5 pb-5">
                                <div className='col w-[50%]'>
                                    <TextField className="w-full" label="Họ tên" variant="outlined" size="small"/>
                                </div>

                                <div className='col w-[50%]'>
                                    <TextField className="w-full" type="email" label="Email" variant="outlined" size="small"/>
                                </div>
                            </div>

                            <h6 className=" text-[14px] font-[500] mb-3">Địa chỉ giao hàng</h6>
                         
                            <div className="flex items-center gap-5 pb-5">
                                <div className='col w-[100%]'>
                                    <TextField className="w-full" label="Số nhà và tên đường" variant="outlined" size="small"/>
                                </div>

                            </div>

                        </form>
                    </div>
                </div>

                <div className="rightCol w-[30%]">
                    <div className="card shadow-md bg-white p-5 rounded-md">
                        <h2 className="mb-4">Your Order</h2>

                        <div className="flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.1)]">
                            <span className="text-[14px] font-[600]">Product</span> 
                            <span className="text-[14px] font-[600]">Subtotal</span> 
                        </div>

                        <div className="scroll max-h-[250px] overflow-y-scroll overflow-x-hidden pr-5">
                            <div className="flex items-center justify-between py-2"> 
                                <div className="part flex items-center gap-3"> 
                                    <div className="size-16 shrink-0 overflow-hidden rounded-md border border-gray-200 group cursor-pointer">
                                        <img alt="" src="https://bizweb.dktcdn.net/100/412/747/products/z3798208191431-0bdcbd25d1be6c030414f35de4c430eb.jpg?v=1688563010307" 
                                        className='h-[60px] bg-contain bg-no-repeat w-full transition-all group-hover:scale-105'/>
                                    </div>

                                    <div className="info">
                                        <h4 className="text-[14px]">Xe đạp thể thao CRV-700...</h4>
                                        <span className="text-[13px]">Số lượng: 1</span>
                                    </div>
                                </div>

                                <span className="text-[14px] font-[500]">5.400.000đ</span>
                            </div>

                            <div className="flex items-center justify-between py-2"> 
                                <div className="part flex items-center gap-3"> 
                                    <div className="size-16 shrink-0 overflow-hidden rounded-md border border-gray-200 group cursor-pointer">
                                        <img alt="" src="https://bizweb.dktcdn.net/100/412/747/products/z3798208191431-0bdcbd25d1be6c030414f35de4c430eb.jpg?v=1688563010307" 
                                        className='h-[60px] bg-contain bg-no-repeat w-full transition-all group-hover:scale-105'/>
                                    </div>

                                    <div className="info">
                                        <h4 className="text-[14px]">Xe đạp thể thao CRV-700...</h4>
                                        <span className="text-[13px]">Số lượng: 1</span>
                                    </div>
                                </div>

                                <span className="text-[14px] font-[500]">5.400.000đ</span>
                            </div>

                            <div className="flex items-center justify-between py-2"> 
                                <div className="part flex items-center gap-3"> 
                                    <div className="size-16 shrink-0 overflow-hidden rounded-md border border-gray-200 group cursor-pointer">
                                        <img alt="" src="https://bizweb.dktcdn.net/100/412/747/products/z3798208191431-0bdcbd25d1be6c030414f35de4c430eb.jpg?v=1688563010307" 
                                        className='h-[60px] bg-contain bg-no-repeat w-full transition-all group-hover:scale-105'/>
                                    </div>

                                    <div className="info">
                                        <h4 className="text-[14px]">Xe đạp thể thao CRV-700...</h4>
                                        <span className="text-[13px]">Số lượng: 1</span>
                                    </div>
                                </div>

                                <span className="text-[14px] font-[500]">5.400.000đ</span>
                            </div>

                            <div className="flex items-center justify-between py-2"> 
                                <div className="part flex items-center gap-3"> 
                                    <div className="size-16 shrink-0 overflow-hidden rounded-md border border-gray-200 group cursor-pointer">
                                        <img alt="" src="https://bizweb.dktcdn.net/100/412/747/products/z3798208191431-0bdcbd25d1be6c030414f35de4c430eb.jpg?v=1688563010307" 
                                        className='h-[60px] bg-contain bg-no-repeat w-full transition-all group-hover:scale-105'/>
                                    </div>

                                    <div className="info">
                                        <h4 className="text-[14px]">Xe đạp thể thao CRV-700...</h4>
                                        <span className="text-[13px]">Số lượng: 1</span>
                                    </div>
                                </div>

                                <span className="text-[14px] font-[500]">5.400.000đ</span>
                            </div>
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
