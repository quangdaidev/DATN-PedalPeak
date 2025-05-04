import React, {useContext, useEffect, useState} from 'react';
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
import { MyContext } from '../../App';
import { postData } from '../../utils/api';

export const ProductDetailsComponent = (props) => {

    const [productActionIndex, setProductActionIndex] = useState(null);

    const [isAddedInMyList, setIsAddedInMyList] = useState(false);

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const [selectedColor, setSelectedColor] = useState("");
    const [qty, setQty] = useState(1);

    const context = useContext(MyContext);

    useEffect(()=>{
        setSelectedColor(props?.item?.color[0]?._id)
    },[])
    // setSelectedColor(props?.item?.color[0]?._id)
    const [isChecked, setIsChecked] = useState(0);

    // console.log("hhhh",props?.item?.color[0])

    const handleChange=(e,index)=>{
        if(e.target.checked){
            setIsChecked(index);
            setSelectedColor(e.target.value)
        }
    }

    const addToCart = (product, userId, quantity)=>{
        context?.addToCart(product, userId,quantity)
    }

    useEffect(() => {
        const myListItem = context?.myListData?.filter((item) =>
            item.productId.includes(props?.item?._id)
        )

        if(myListItem?.length !== 0) {
            setIsAddedInMyList(true);
        }else{
            setIsAddedInMyList(false);
        }
    },[])

    const handleAddToMyList = (item) => {
        console.log(item)
        if (context?.userData === null) {
            context.openAlertBox("error", "Bạn cần đăng nhập");
            return false
        }
        else {
            const obj = {
                productId: item?._id, 
                userId: context.userData?._id, 
                productTitle:item?.name, 
                image:item?.images[0],
                color:item?.color,
                // countInStock:item?.countInStock,
                // rating:item?.rating,
                price:item?.price,
                oldPrice: item?.oldPrice,
                brand: item?.brand,
                discount: item?.discount,
                reviews: item?.reviews
            }
    
            postData(`/api/myList/add?token=${localStorage.getItem('accessToken')}`, obj).then((res)=>{
                if(res?.error===false){
                    context.openAlertBox("success", res?.message);
                    setIsAddedInMyList(true);
                    context?.getMyListData();
                } else {
                    context.openAlertBox("error", res?.message);
                }
            })
    
        }
    }

    return (
        <>
            <h1 className="text-[24px] font-[600] mb-2">{props?.item?.name}</h1>
            <div className="flex items-center gap-3">
                <span className="text-gray-400 text-[13px]">Thương hiệu: <span className="font-[500] text-black opacity-75">{props?.item?.brand}</span></span>

                <Rating name="size-small" defaultValue={(props?.item?.reviews?.reduce((sum, review) => sum + Number(review.rating), 0))/ props?.item?.reviews?.length} size="small" readOnly/>
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
                                props?.item?.color?.map((color,index)=>{
                                    return (
                                        color.countInStock===0 ? 
                                        <FormControlLabel value="disabled" checked={null} key={index} disabled control={<Radio />} label={color.name + " (" + color.countInStock + ")"}/> 
                                        : <FormControlLabel checked={isChecked === index} onChange={(e)=>handleChange(e,index)} key={index} value={color._id} control={<Radio />} label={color.name + " (" + color.countInStock + ")"} />
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
                    <QtyBox selectedColor={selectedColor} setQty={setQty}/>
                </div>

                <Button className="btn-org flex gap-2" onClick={()=>addToCart(props?.item, context?.userData?._id, qty)}>
                    <MdOutlineShoppingCart className="text-[22px]"/>Thêm vào giỏ hàng
                </Button>
            </div>

            <div className="flex items-center gap-4 mt-6" onClick={()=>handleAddToMyList(props?.item)}>
            { isAddedInMyList === true ?  
                <span className="flex items-center gap-2 text-[15px] link cursor-pointer font- [500]">                  
                    <FaRegHeart className="text-[18px] !text-primary-600"/> Thêm vào danh sách yêu thích                              
                </span>
                :
                <span className="flex items-center gap-2 text-[15px] link cursor-pointer font- [500]">                  
                    <FaRegHeart className="text-[18px] "/> Thêm vào danh sách yêu thích                              
                </span>
            }
                {/* <span className="flex items-center gap-2 text-[15px] link cursor-pointer font- [500]"><IoGitCompareOutline className="text-[18px]" />So sánh sản phẩm</span> */}
            </div> 
        </>
    )
}
