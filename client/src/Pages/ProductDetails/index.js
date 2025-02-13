import React from "react";
import { Link } from 'react-router-dom';

const ProductDetails =()=>{
    
    return (
        <div className="container mx-auto mt-32 mb-8">
            <div className="flex">
                <div className="w-1/2">
                    <div style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[480px] w-full  bg-no-repeat "></div>

                    <div className=" border-2 border-gray-400 mt-9 mr-6">                    
                        <div className="p-3 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ct-icon text-blue-800">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span className="pl-3">Khung sườn thiết kế chắc chắn, thẩm mỹ, an toàn tuyệt đối</span>
                        </div>
                        <div className="p-3 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ct-icon text-blue-800">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span className="pl-3">Xe nhập khẩu chính hãng</span>
                        </div>
                        <div className="p-3 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ct-icon text-blue-800">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span className="pl-3">Bảo hành 12 tháng</span>
                        </div>
                        <div className="p-3 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ct-icon text-blue-800">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span className="pl-3">Hỗ trợ trả góp lãi suất 0%</span>
                        </div>
                        <div className="p-3 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ct-icon text-blue-800">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span className="pl-3">Giao hàng miễn phí toàn quốc</span>
                        </div>
                    </div>
                </div>
                <div className="w-1/2">
                    <h1 className="text-3xl font-semibold text-slate-600 mb-4">Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C</h1>
                    <span className="text-blue-900 text-2xl font-bold mt-2 mr-5">Giá: 6.990.000đ VND</span> 
                    ( <span className=" text-xl font-bold mt-2 text-gray-400 line-through">Giá: 7.200.000000 VND</span> )
                    <p className="mt-3">Mô tả chi tiết: </p>
                    <p>- abc</p>
                    <input type="number" min={1} defaultValue={1} className='border p-2 rounded mt-3 w-14 mb-4' /> 
                    <br />
                    <div className="">
                        <div className="mb-2">Các màu sắc:</div>
                        <div className="flex flex-row justify-center items-center gap-2">
                            <div className="basis-1/3 cursor-pointer">
                                <div className="flex flex-row justify-center items-center gap-2 border-2 border-blue-500 hover:border-gray-800 rounded-xl">
                                    <div className="ct-magazine-small-img basis-1/3 flex flex-col pl-3">
                                        <div style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[100px] bg-contain bg-no-repeat bg-center"></div>
                                    </div>
                                    <div className="ct-magazine-post basis-2/3 pl-4">
                                        <div className="uppercase tracking-widest text-gray-500 font-semibold text-xl mb-3">Trắng</div>
                                        <div className="text-sm mb-3">6.990.000đ VND</div>
                                    </div>
                                </div>
                            </div>
                            <div className="basis-1/3 cursor-pointer">
                                <div className="flex flex-row justify-center items-center gap-2 border-2 border-blue-500 rounded-xl hover:border-gray-800 ">
                                    <div className="ct-magazine-small-img basis-1/3 flex flex-col pl-3">
                                        <div style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[100px] bg-contain bg-no-repeat bg-center"></div>
                                    </div>
                                    <div className="ct-magazine-post basis-2/3 pl-4">
                                        <div className="uppercase tracking-widest text-gray-500 font-semibold text-xl mb-3">Kem</div>
                                        <div className="text-sm mb-3">6.990.000đ VND</div>
                                    </div>
                                </div>
                            </div>
                            <div className="basis-1/3 cursor-pointer">
                                <div className="flex flex-row justify-center items-center gap-2 border-2 border-blue-500 rounded-xl hover:border-gray-800 ">
                                    <div className="ct-magazine-small-img basis-1/3 flex flex-col pl-3">
                                        <div style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[100px] bg-contain bg-no-repeat bg-center"></div>
                                    </div>
                                    <div className="ct-magazine-post basis-2/3 pl-4">
                                        <div className="uppercase tracking-widest text-gray-500 font-semibold text-xl mb-3">Đen</div>
                                        <div className="text-sm mb-3">6.990.000đ VND</div>
                                    </div>
                                </div>
                            </div>
                        </div>                
                    </div>

                    <div className="mt-6">
                        <div className="flex flex-row justify-end items-center gap-3">
                            <div className="basis-1/3">
                                <button type="submit"  className="ct-button bg-blue-600 text-white w-full ">Thêm vào giỏ</button>
                            </div>
                            <div className="basis-2/3">
                                <button type="submit" className="ct-button bg-red-600 text-white w-full">Mua hàng</button>
                            </div>
                        </div>
                    </div>

                    <div className=" border-2 border-blue-500 mt-6">                    
                        <div className="uppercase tracking-widest text-yellow-400 font-semibold text-2xl m-3">Giảm ngay 100k</div>
                        <div className="text-blue-800 text-sm m-3">Điền thông tin nhận ngay <strong>Mã giảm giá 100.000đ</strong></div>
                        <input type="text" placeholder="Họ và tên" className=" ml-3 mb-3 px-3 py-2 w-[97%] bg-inherit border-[1px] border-gray-700 rounded-xl outline-one text-white leading-5 hover:border-blue-800 duration-500 focus:hover:border-gray-300 placeholder:uppercase placeholder:text-xs placeholder:tracking-widest placeholder:font-semibold"/>
                        <input type="text" placeholder="Số điện thoại" className=" ml-3 mb-3 px-3 py-2 w-[97%] bg-inherit border-[1px] border-gray-700 rounded-xl outline-one text-white leading-5 hover:border-blue-800 duration-500 focus:hover:border-gray-300 placeholder:uppercase placeholder:text-xs placeholder:tracking-widest placeholder:font-semibold"/>
                        <button type="submit" className="ct-button bg-yellow-400 rounded-xl text-white ml-3 mb-6 w-[97%]">Nhận mã</button>
                    </div>
                    {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'> Thêm vào giỏ hàng</button> */}
                </div>
            </div>
            <div className="ct-sub-headline mt-24">
                <div className="ct-sub-headline-deco-line "></div>
                <div className="ct-sub-headline-label ">Có thể bạn muốn xem</div>
                <div className="ct-sub-headline-deco-line "></div>
            </div>
            <div className="new-products w-[100%] mx-auto mb-24">
                <div className="grid grid-cols-4 gap-6">
                    <div className="ct-product-card">
                        <div style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[350px] bg-contain bg-no-repeat ">
                        <Link href="">
                            <div className=" h-[350px] hover:bg-gray-900 hover:bg-opacity-10 hover:transition-all hover:ease-in-out hover:duration-500 relative group">                         
                                <div className="absolute w-[100px] bg-slate-300 py-2 px-4 top-3 right-3 text-center font-semibold text-blue-900">giá sale</div>                                                          
                            <div className="absolute bg-white text-gray-900 w-11/12 bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn ct-button">Đặt hàng</div>
                            </div>
                        </Link>
                        </div>
                        <div className="text-center my-8">
                        <Link href="#">
                            <div className="text-xl  mb-3 hover:text-blue-900 overflow-hidden line-clamp-2">Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C</div>
                        </Link>
                        <div className="">
                            <span className="text-lg text-blue-900">6.990.000đ VND</span>
                            <span className="ml-2 text-gray-400 line-through">7.20200.000đ VND</span>
                            <span></span>
                        </div>
                        </div>
                    </div>
                    <div className="ct-product-card">
                        <div style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[350px] bg-contain bg-no-repeat ">
                        <Link href="">
                            <div className=" h-[350px] hover:bg-gray-900 hover:bg-opacity-10 hover:transition-all hover:ease-in-out hover:duration-500 relative group">                         
                                <div className="absolute w-[100px] bg-slate-300 py-2 px-4 top-3 right-3 text-center font-semibold text-blue-900">giá sale</div>                                                          
                            <div className="absolute bg-white text-gray-900 w-11/12 bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn ct-button">Đặt hàng</div>
                            </div>
                        </Link>
                        </div>
                        <div className="text-center my-8">
                        <Link href="#">
                            <div className="text-xl  mb-3 hover:text-blue-900 overflow-hidden line-clamp-2">Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C</div>
                        </Link>
                        <div className="">
                            <span className="text-lg text-blue-900">6.990.000đ VND</span>
                            <span className="ml-2 text-gray-400 line-through">7.20200.000đ VND</span>
                            <span></span>
                        </div>
                        </div>
                    </div>
                    <div className="ct-product-card">
                        <div style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[350px] bg-contain bg-no-repeat ">
                        <Link href="">
                            <div className=" h-[350px] hover:bg-gray-900 hover:bg-opacity-10 hover:transition-all hover:ease-in-out hover:duration-500 relative group">                         
                                <div className="absolute w-[100px] bg-slate-300 py-2 px-4 top-3 right-3 text-center font-semibold text-blue-900">giá sale</div>                                                          
                            <div className="absolute bg-white text-gray-900 w-11/12 bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn ct-button">Đặt hàng</div>
                            </div>
                        </Link>
                        </div>
                        <div className="text-center my-8">
                        <Link href="#">
                            <div className="text-xl  mb-3 hover:text-blue-900 overflow-hidden line-clamp-2">Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C</div>
                        </Link>
                        <div className="">
                            <span className="text-lg text-blue-900">6.990.000đ VND</span>
                            <span className="ml-2 text-gray-400 line-through">7.20200.000đ VND</span>
                            <span></span>
                        </div>
                        </div>
                    </div>
                    <div className="ct-product-card">
                        <div style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[350px] bg-contain bg-no-repeat ">
                        <Link href="">
                            <div className=" h-[350px] hover:bg-gray-900 hover:bg-opacity-10 hover:transition-all hover:ease-in-out hover:duration-500 relative group">                         
                                <div className="absolute w-[100px] bg-slate-300 py-2 px-4 top-3 right-3 text-center font-semibold text-blue-900">giá sale</div>                                                          
                            <div className="absolute bg-white text-gray-900 w-11/12 bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn ct-button">Đặt hàng</div>
                            </div>
                        </Link>
                        </div>
                        <div className="text-center my-8">
                        <Link href="#">
                            <div className="text-xl  mb-3 hover:text-blue-900 overflow-hidden line-clamp-2">Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C</div>
                        </Link>
                        <div className="">
                            <span className="text-lg text-blue-900">6.990.000đ VND</span>
                            <span className="ml-2 text-gray-400 line-through">7.20200.000đ VND</span>
                            <span></span>
                        </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default ProductDetails;