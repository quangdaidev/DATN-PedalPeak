import React from 'react';
import Button from "@mui/material/Button"; 
import { Link } from "react-router-dom";

export const OrderSuccess = () => {

    return(
        <section className='pt-[230px] w-full p-10 pb-[156px] flex items-center justify-center flex-col gap-2'> 
            <img src="https://cdn-icons-png.flaticon.com/512/294/294432.png" width="120" alt=""/>
            <h3 className='mb-0 text-[25px]'>Đặt hàng thành công</h3>
            <p className='mt-0'>Cảm ơn bạn đã mua hàng</p>
            <Link to="/">
                <Button className="btn-org btn-border">Về trang chủ</Button>
            </Link>
        </section>
    )
}

