import React from 'react';
import Button from "@mui/material/Button"; 
import { Link } from "react-router-dom";

export const OrderFailed = () => {

    return(
        <section className='pt-[230px] w-full p-10 pb-[156px] flex items-center justify-center flex-col gap-2'> 
            <img src="https://cdn-icons-png.flaticon.com/512/10693/10693000.png" width="120" alt=""/>
            <h3 className='mb-0 text-[25px]'>Đặt hàng không thành công</h3>
            <p className='mt-0'>Vui lòng liên hệ Dịch vụ Chăm sóc khách hàng để được tư vấn</p>
            <Link to="/">
                <Button className="btn-org btn-border">Về trang chủ</Button>
            </Link>
        </section>
    )
}

