import React from "react";
import { Link } from 'react-router-dom';


import "../ProductItem/style.css";

import Rating from '@mui/material/Rating';
import Button from "@mui/material/Button";

import {FaRegHeart} from "react-icons/fa";
import {IoGitCompareOutline} from "react-icons/io5";
import {MdZoomOutMap} from "react-icons/md";

import Tooltip from "@mui/material/Tooltip";

const ProductItem =(props)=>{
    

    return (
        <>
            {/* <div className="ct-product-card mb-12">
                <div style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[350px] bg-contain bg-no-repeat ">
                    <div>
                        <div className=" h-[346px] hover:bg-gray-900 hover:bg-opacity-10 hover:transition-all hover:ease-in-out hover:duration-500 relative group">              
                            <div className="absolute w-[100px] bg-slate-200 py-2 px-4 top-3 right-3 text-center font-semibold text-blue-800">giá sale</div>       
                            <button className="absolute bg-white text-gray-900 w-11/12 bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn ct-button">Đặt hàng</button>
                        </div>
                    </div>
                </div>
                <div className="text-center my-8">
                    <Link to="/product/1">
                        <div className="text-xl  mb-3 hover:text-blue-900 overflow-hidden line-clamp-2"> Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C</div>
                    </Link>
                    <div className="">
                        <span className="text-xl text-blue-900">6.990.000đ VND</span>
                        <span className="ml-2 text-gray-400 line-through">7.200.000000 VND</span>
                    </div>
                </div>
            </div> */}

            <div className="productItem !bg-slate-100 shadow-lg rounded-md overflow-hidden border-[1px] border-gray-500 border-1 mb-14">
                <div className="group imgWrapper w-[100%] h-[350px] overflow-hidden rounded-md relative"> 
                    <img alt="" src='/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg' className="h-[350px] bg-contain bg-no-repeat"/>
                    <img alt="" src="https://xedapgiakho.com/wp-content/uploads/2023/11/Xe-Dap-Touring-DTFLY-R-024-600x420.jpg" className="h-[350px] bg-contain bg-no-repeat transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100"/>


                    <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-orange-600 text-white rounded-lg p-1 text-[12px] font-[500]">
                    -10%
                    </span> 
                    <button className="absolute bg-blue-900 text-white w-11/12 bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn ct-button">Đặt hàng</button>

                    <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-4 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px]">
                        <Tooltip title="Chi tiết" placement="left-start">
                            <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-gray-100 text-black  hover:!bg-blue-900 hover:text-white group">
                                <MdZoomOutMap className="text-[20px] !text-black group-hover:text-white hover:!text-white"/>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Chia sẻ" placement="left-start">
                            <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-gray-100 text-black hover:!bg-blue-900 hover:text-white group">
                                <IoGitCompareOutline className="text-[20px] !text-black group-hover:text-white hover:!text-white"/>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Theo dõi" placement="left-start">
                            <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-gray-100 text-black hover:!bg-blue-900 hover:text-white group">
                                <FaRegHeart className="text-[20px] !text-black group-hover:text-white hover:!text-white"/>
                            </Button>
                        </Tooltip>
                    </div>
                </div>

                <div className='info p-3'>
                    <h6 className="text-[13px]"><Link to="/" className=' transition-all'>Soylent Green</Link></h6>
                    <h3 className="overflow-hidden line-clamp-2 text-[14px] mt-1 font-[500] mb-2 text-[rgba(0,0,0,0.9)]"> <Link to="/" className='transition-all'>Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C</Link></h3>
                    <Rating name="size-small" defaultValue={4} size="small" readOnly/>

                    <div className="flex items-center gap-4">
                        <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">7.200.000000đ</span>
                        <span className="price text-orange-600 text-[15px] font-[600]">6.990.000đ</span> 
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductItem;