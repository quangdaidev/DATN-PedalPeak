import { Button } from '@mui/material';
import React from 'react';
import { FaCloudUploadAlt, FaRegUser } from 'react-icons/fa';
import Logout from '@mui/icons-material/Logout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const MyAccount = () => {
  return (
    <section className="py-10 w-full mt-28">
        <div className="container flex gap-5">
            <div className="col1 w-[25%]">
                <div className="card bg-white shadow-md rounded-md p-5">
                    <div className="w-full p-5 flex items-center justify-center flex-col">
                        <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group"> 
                            <img alt="" src="https://bizweb.dktcdn.net/100/438/408/files/anh-chill-buon-yodyvn2.jpg?v=1684810757738" className="w-full h-full
                            object-cover"/>
                            <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)]
                            flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
                                <FaCloudUploadAlt className="text-white text-[25px]"/>
                                <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0"/>
                            </div>
                        </div>

                        <h3>Anna</h3>
                        <h6 className="text-[13px] font-[500]">anna223@gmail.com</h6>

                    </div>

                    <ul className="list-none p-2 bg-slate-100">
                        <li className="w-full">
                            <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-black !rounded-none flex items-center gap-2">
                                <PersonOutlineIcon className="text-[17px]"/>Thông tin tài khoản
                            </Button>
                        </li>                      

                        <li className="w-full">
                            <Button className="w-full  !text-left !py-2 !px-5 !justify-start !capitalize !text-black !rounded-none flex items-center gap-2">
                                <ShoppingCartCheckoutIcon className="text-[17px]"/>Đơn hàng
                            </Button>
                        </li>

                        <li className="w-full">
                            <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-black !rounded-none flex items-center gap-2">
                                <FavoriteBorderIcon className="text-[17px]"/>Sản phẩm yêu thích
                            </Button>
                        </li>

                        <li className="w-full">
                            <Button className="w-full  !text-left !py-2 !px-5 !justify-start !capitalize !text-black !rounded-none flex items-center gap-2">
                                <Logout className="text-[17px]"/>Đăng xuất
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
  )
}

export default MyAccount;