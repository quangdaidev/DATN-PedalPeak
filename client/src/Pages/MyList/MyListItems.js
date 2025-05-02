import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import React, { useContext } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";

const MyListItems = (props) => {

    const context = useContext(MyContext);

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const addToCart = (product, userId, quantity)=>{
        context?.addToCart(product, userId,quantity)
    }

    const removeItem=(id)=>{
        deleteData(`/api/myList/${id}?token=${localStorage.getItem('accessToken')}`).then((res)=>{
            if(res?.error===false){
                context?.openAlertBox("success", res?.message);
                context?.getMyListData();
            }
        })
    }
   
    return (
        <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b " >
            <div className="img w-[15%] rounded-md overflow-hidden">
                <Link to={`/product/${props?.item?.productId}`} className="group">
                    <img
                        alt="" src={props?.item?.image}
                        className="w-full group-hover:scale-105 transition-all"
                    />
                </Link> 
            </div>

            <div className="info w-[85%] relative">
                <IoCloseSharp className="cursor-pointer absolute top-[0px] right-[0px] text-[22px] link"
                onClick={()=>removeItem(props?.item?._id)}
                />
                <span className="text-[13px]">Thương hiệu: {props?.item?.brand}</span>
                <h3 className="text-[15px]">
                    <Link to={`/product/${props?.item?.productId}`} className="link overflow-hidden line-clamp-2  h-12">{props?.item?.productTitle}</Link>
                </h3>
                <Rating name="size-small" value={(props?.item.reviews.reduce((sum, review) => sum + Number(review.rating), 0))/ props?.item.reviews.length} size="small" readOnly/>

                {
                    props?.item?.price !== 0 ?
                    <div className="flex items-center gap-4 mt-2 mb-2">
                        <span className="price text-[14px] font-[600]">{VND.format(props?.item?.price)}</span>

                        <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                        {VND.format(props?.item?.oldPrice)}
                        </span>

                        <span className="price text-primary-600 text-[14px] font-[600]">
                        {Math.round((((props?.item?.oldPrice -  props?.item?.price) /  props?.item?.oldPrice)) * 100)}% OFF
                        </span>
                    </div>
                    :
                    <div className="flex items-center gap-4 mt-2 mb-2">
                        <span className="price text-[14px] font-[600]">{VND.format(props?.item?.oldPrice)}</span>
                    </div>

                }
                

                <br/>

                <Button className="btn-org btn-sm" onClick={()=>addToCart(props?.item, context?.userData?._id, 1)}>Thêm vào giỏ hàng</Button>
            </div>     
        </div>
    );
};

export default MyListItems;



        
    
