import React, {useContext, useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';


import "../ProductItemListView/style.css";

import Rating from '@mui/material/Rating';
import Button from "@mui/material/Button";

import {FaRegHeart} from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import {MdZoomOutMap} from "react-icons/md";
import {IoMdHeart} from "react-icons/io";

import { MyContext } from "../../App";

import Tooltip from "@mui/material/Tooltip";
import { postData } from "../../utils/api";

const ProductItemListView =(props)=>{

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const [isAddedInMyList, setIsAddedInMyList] = useState(false);
    
    const context = useContext(MyContext);

    const addToCart = (product, userId, quantity)=>{
        context?.addToCart(product, userId,quantity)
    }

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
                discount: item?.discount
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

    const history = useNavigate();

    const addToPayment = (product, userId, quantity)=>{
        if(userId === undefined){
            context?.openAlertBox("error", "Bạn cần đăng nhập");
            return false;
          }
        context?.addToCart(product, userId,quantity)

        history("/checkout");
    }
    

    return (
        <>
            <div className="productItemListView !bg-slate-100 shadow-lg rounded-md overflow-hidden border-[1px] border-gray-500 border-1 mb-14 flex items-center">
                <div className="group imgWrapper w-[30%] h-[350px] overflow-hidden rounded-md relative"> 
                    <Link to={`/product/${props?.item?._id}`}>
                        <img alt="" src={props?.item?.images[0]} className="h-[350px] bg-contain bg-no-repeat"/>
                        <img alt="" src={props?.item?.images[1]} className="h-[350px] bg-contain bg-no-repeat transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100"/>
                    </Link>

                    <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-orange-600 text-white rounded-lg p-1 text-[12px] font-[500]">
                    -10%
                    </span> 
                    {/* <button className="absolute bg-blue-900 text-white w-11/12 bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn ct-button">Đặt hàng</button> */}

                    <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-4 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
                        <Tooltip title="Chi tiết" placement="left-start">
                            <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-gray-100 text-black  hover:!bg-primary-600 hover:text-white group"
                            onClick={()=>context.handleOpenProductDetailsModal(true, props?.item)}
                            >
                                <MdZoomOutMap className="text-[20px] !text-black group-hover:text-white hover:!text-white"/>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Thêm vào giỏ" placement="left-start">
                            <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-gray-100 text-black hover:!bg-primary-600 hover:text-white group"
                            onClick={()=>addToCart(props?.item, context?.userData?._id, 1)}
                            >
                                <MdOutlineShoppingCart className="text-[20px] !text-black group-hover:text-white hover:!text-white"/>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Theo dõi" placement="left-start">
                            <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-gray-100 text-black hover:!bg-primary-600 hover:text-white group"
                            onClick={()=>handleAddToMyList(props?.item)}
                            >

                                {
                                    isAddedInMyList === true ?                                  
                                    <IoMdHeart className="text-[20px] !text-primary-600 group-hover:text-white hover:!text-white"/> 
                                    : 
                                    <FaRegHeart className="text-[20px] !text-black group-hover:text-white hover:!text-white"/>
                                }
                               
                            </Button>
                        </Tooltip>
                    </div>
                </div>

                <div className='info p-3 py-5 px-8 w-[75%]'>
                    <h6 className="text-[15px] !font-[400]"><Link to="/" className='link transition-all'>{props?.item?.brand}</Link></h6>
                    <h3 className="overflow-hidden line-clamp-2 text-[18px] mt-3 font-[500] mb-3 text-[rgba(0,0,0,0.9)]"> <Link to="/" className='link transition-all'>{props?.item?.name}</Link></h3>

                    <p className="text-[14px] mb-3">{props?.item?.description}</p>
                    
                    <Rating 
                        name="size-small" 
                        defaultValue={
                            (() => {
                                const validReviews = props?.item.reviews?.filter(r => r.rating !== "");
                                if (!validReviews || validReviews.length === 0) return 0;

                                const total = validReviews.reduce((sum, r) => sum + Number(r.rating), 0);
                                return total / validReviews.length;
                            })()
                            } 
                        size="small" 
                        readOnly
                    />

                    {
                        props?.item?.price !== 0 
                        ?
                        <div className="flex items-center gap-4">
                            <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">{VND.format(props?.item?.oldPrice)}</span>
                            <span className="price text-orange-600 text-[15px] font-[600]">{VND.format(props?.item?.price)}</span> 
                        </div>
                        :
                        <div className="flex items-center gap-4">
                            <span className="price text-orange-600 text-[15px] font-[600]">{VND.format(props?.item?.oldPrice)}</span> 
                        </div>
                    }

                    <div className="mt-3">
                        <Button onClick={()=>addToPayment(props?.item, context?.userData?._id, 1)} className="btn-org flex gap-2"><tt className="text-[20px]"/>Đặt mua sản phẩm</Button>
                    </div>

                </div>
            </div>

        </>
    )
}

export default ProductItemListView;