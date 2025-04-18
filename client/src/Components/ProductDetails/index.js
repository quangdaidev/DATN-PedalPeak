import React, {useState} from 'react';
import { QtyBox } from '../../Components/QtyBox';
import { MdOutlineShoppingCart } from "react-icons/md";
import {FaRegHeart} from "react-icons/fa";
import {IoGitCompareOutline} from "react-icons/io5";
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';

export const ProductDetailsComponent = (props) => {

    const [productActionIndex, setProductActionIndex] = useState(null);

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

  return (
    <>
        <h1 className="text-[24px] font-[600] mb-2">{props?.item?.name}</h1>
        <div className="flex items-center gap-3">
            <span className="text-gray-400 text-[13px]">Thương hiệu: <span className="font-[500] text-black opacity-75">{props?.item?.brand}</span></span>

            <Rating name="size-small" defaultValue={4} size="small" readOnly/>
            <span className="text-[13px] cursor-pointer" onClick={props.gotoReviews}>Review ({props.reviewsCount})</span>

        </div>

        {
            props?.item?.price !== 0 
            ?
            <div className="flex items-center gap-4 mt-4">
          
                <span className="oldPrice line-through text-gray-500 text-[20px] font-[500]">{VND.format(props?.item?.oldPrice)}</span>
                <span className="price text-orange-600 text-[20px] font-[600]">{VND.format(props?.item?.price)}</span> 

                {/* <span className="text-[14px]">Còn hàng: <span className="text-green-600 text-[14px] font-bold">{props?.item?.countInStock} sản phẩm</span></span> */}
            </div>
            :
            <div className="flex items-center gap-4 mt-4">
          
                <span className="price text-orange-600 text-[20px] font-[600]">{VND.format(props?.item?.oldPrice)}</span> 

            </div>        
        }

       

        <p className="mt-3 pr-10 text-[18px] leading-10">{props?.item?.description}</p>

        {
            props?.item?.color?.length !== 0 && 
            <div className="flex items-center gap-3">
                <span className="text-[16px]">Màu sắc: </span>
                <div className="mt-2 flex item-center gap-2 actions">
                    {
                        props?.item?.color?.map((item,index)=>{
                            return (
                                <Button className={`${productActionIndex === index ? '!bg-blue-900 !text-white' 
                                : '!text-blue-900 !border-blue'}`} onClick={()=>setProductActionIndex(index)}>{item}</Button>
                            )
                        })
                    }
                    {/* <Button className={`${productActionIndex === 0 ? '!bg-blue-900 !text-white' 
                    : '!text-blue-900 !border-blue'}`} onClick={()=>setProductActionIndex(0)}>Xanh</Button>
                    <Button className={`${productActionIndex === 1 ? '!bg-black !text-white' 
                    : '!text-black !border-black'}`} onClick={()=>setProductActionIndex(1)}>Đen</Button>
                    <Button className={`${productActionIndex === 2 ? '!bg-gray-600 !text-white' 
                    : '!text-gray-600 !border-gray-600'}`} onClick={()=>setProductActionIndex(2)}>Xám</Button>
                    <Button className={`${productActionIndex === 3 ? '!bg-white !text-gray-400 !border-gray-200' 
                    : '!text-white !border-gray-600 !bg-gray-400'}`} onClick={()=>setProductActionIndex(3)}>Trắng</Button> */}
                </div>
            </div>

        }

        <div className="mt-2 text-[14px]">Hiện còn: <span className="text-green-600 text-[14px] font-bold">{props?.item?.countInStock} sản phẩm</span></div>

       
        <p className="text-[14px] mt-3 mb-2">Miễn phí vận chuyển toàn quốc* (nhận hàng sau 2-3 ngày)</p>           
        <div className="flex items-center gap-4">
            <div className="qtyBoxWrapper w-[80px]">
                <QtyBox/>
            </div>

            <Button className="btn-org flex gap-2">
                <MdOutlineShoppingCart className="text-[22px]"/>Thêm vào giỏ hàng
            </Button>
        </div>

        <div className="flex items-center gap-4 mt-6">
            <span className="flex items-center gap-2 text-[15px] link cursor-pointer font- [500]"><FaRegHeart className="text-[18px]"/> Thêm vào danh sách yêu thích</span>
            <span className="flex items-center gap-2 text-[15px] link cursor-pointer font- [500]"><IoGitCompareOutline className="text-[18px]" />So sánh sản phẩm</span>
        </div> 
    </>
  )
}
