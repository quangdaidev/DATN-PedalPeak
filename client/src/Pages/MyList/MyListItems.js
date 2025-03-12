import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const MyListItems = (props) => {
   
    return (
        <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b " >
            <div className="img w-[15%] rounded-md overflow-hidden">
                <Link to="/product/7845" className="group">
                    <img
                        alt="" src="https://bizweb.dktcdn.net/100/412/747/products/z3798208191431-0bdcbd25d1be6c030414f35de4c430eb.jpg?v=168856301030"
                        className="w-full group-hover:scale-105 transition-all"
                    />
                </Link> 
            </div>

            <div className="info w-[85%] relative">
                <IoCloseSharp className="cursor-pointer absolute top-[0px] right-[0px] text-[22px] link"/>
                <span className="text-[13px]">Xe đạp thể thao</span>
                <h3 className="text-[15px]">
                    <Link className="link">Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C</Link>
                </h3>
                <Rating name="size-small" defaultValue={4} size="small" readOnly/>

                <div className="flex items-center gap-4 mt-2 mb-2">
                    <span className="price text-[14px] font-[600]">$58.00</span>

                    <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                    $58.00 
                    </span>

                    <span className="price text-primary-600 text-[14px] font-[600]">
                    55% OFF
                    </span>
                </div>

                <br/>

                <Button className="btn-org btn-sm">Thêm vào giỏ hàng</Button>
            </div>     
        </div>
    );
};

export default MyListItems;



        
    
