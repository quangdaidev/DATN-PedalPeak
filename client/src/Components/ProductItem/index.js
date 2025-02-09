import React from "react";
import { Link } from 'react-router-dom';

const ProductItem =()=>{
    

    return (
        <>
            <div className="ct-product-card mb-12">
                <div style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[350px] bg-contain bg-no-repeat ">
                    <div>
                        <div className=" h-[346px] hover:bg-gray-900 hover:bg-opacity-10 hover:transition-all hover:ease-in-out hover:duration-500 relative group">              
                            <div className="absolute w-[100px] bg-slate-300 py-2 px-4 top-3 right-3 text-center font-semibold text-blue-800">giá sale</div>       
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
            </div>
        </>
    )
}

export default ProductItem;