import React, {useState} from 'react';
import { QtyBox } from '../../Components/QtyBox';
import { MdOutlineShoppingCart } from "react-icons/md";
import {FaRegHeart} from "react-icons/fa";
import {IoGitCompareOutline} from "react-icons/io5";
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const ProductDetailsComponent = (props) => {

    const [productActionIndex, setProductActionIndex] = useState(null);

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const [selectedColor, setSelectedColor] = useState(props?.item?.color[0]._id);
    const [isChecked, setIsChecked] = useState(0);

    const handleChange=(e,index)=>{
        if(e.target.checked){
            setIsChecked(index);
            setSelectedColor(e.target.value)
        }
    }

    return (
        <>
            <h1 className="text-[24px] font-[600] mb-2">{props?.item?.name}</h1>
            <div className="flex items-center gap-3">
                <span className="text-gray-400 text-[13px]">Thương hiệu: <span className="font-[500] text-black opacity-75">{props?.item?.brand}</span></span>

                <Rating name="size-small" defaultValue={(props?.item?.reviews.reduce((sum, review) => sum + Number(review.rating), 0))/ props?.item?.reviews.length} size="small" readOnly/>
                <span className="text-[13px] cursor-pointer" onClick={props.gotoReviews}>Bình luận ({props.reviewsCount>0?props.reviewsCount:0})</span>

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
                    {/* <span className="text-[16px]">Màu sắc: </span>
                    <div className="mt-2 flex item-center gap-2 actions">
                        {
                            props?.item?.color?.map((item,index)=>{
                                return (
                                    <Button className={`${productActionIndex === index ? '!bg-blue-900 !text-white' 
                                    : '!text-blue-900 !border-blue'}`} onClick={()=>setProductActionIndex(index)}>{item.name}</Button>
                                )
                            })
                        }
                    </div> */}

                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Chọn màu</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            {
                                props?.item?.color?.map((item,index)=>{
                                    return (
                                        item.countInStock===0 ? 
                                        <FormControlLabel value="disabled" checked={null} key={index} disabled control={<Radio />} label={item.name + " (" + item.countInStock + ")"}/> 
                                        : <FormControlLabel checked={isChecked === index} onChange={(e)=>handleChange(e,index)} key={index} value={item._id} control={<Radio />} label={item.name + " (" + item.countInStock + ")"} />
                                    )
                                })
                            }
                        </RadioGroup>
                    </FormControl>
                </div>

            }

            {/* <div className="mt-2 text-[14px]">Hiện còn: <span className="text-green-600 text-[14px] font-bold"> sản phẩm</span></div> */}

        
            <p className="text-[14px] mt-3 mb-2">Miễn phí vận chuyển toàn quốc* (nhận hàng sau 2-3 ngày)</p>           
            <div className="flex items-center gap-4">
                <div className="qtyBoxWrapper w-[80px]">
                    <QtyBox selectedColor={selectedColor}/>
                </div>

                <Button className="btn-org flex gap-2">
                    <MdOutlineShoppingCart className="text-[22px]"/>Thêm vào giỏ hàng
                </Button>
            </div>

            <div className="flex items-center gap-4 mt-6">
                <span className="flex items-center gap-2 text-[15px] link cursor-pointer font- [500]"><FaRegHeart className="text-[18px]"/> Thêm vào danh sách yêu thích</span>
                {/* <span className="flex items-center gap-2 text-[15px] link cursor-pointer font- [500]"><IoGitCompareOutline className="text-[18px]" />So sánh sản phẩm</span> */}
            </div> 
        </>
    )
}
