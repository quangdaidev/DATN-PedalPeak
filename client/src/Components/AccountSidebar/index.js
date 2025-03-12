import React from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Logout from '@mui/icons-material/Logout';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from "react-router";
import { Button } from '@mui/material';

const AccountSidebar = () => {
  return (
    <div className="card bg-white shadow-md rounded-md sticky top-28">
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

        <ul className="list-none pb-2 bg-slate-100 myAccountTabs">
            <li className="w-full">
                <NavLink to="/my-account" exact={true} activeClassName="isActive">
                    <Button className="w-full !text-left !py-3 !px-5 !justify-start !capitalize !text-black !rounded-none flex items-center gap-2">
                        <AccountCircleIcon color="action" className=" text-[17px]"/>Thông tin tài khoản
                    </Button>
                </NavLink>
            </li>                      

            <li className="w-full">
                <NavLink to="/my-orders" exact={true} activeClassName="isActive">
                    <Button className="w-full  !text-left !py-3 !px-5 !justify-start !capitalize !text-black !rounded-none flex items-center gap-2">
                        <ShoppingCartIcon color="action"  className=" text-[17px]"/>Đơn hàng
                    </Button>
                </NavLink>
            </li>

            <li className="w-full">
                <NavLink to="/my-list" exact={true} activeClassName="isActive">
                    <Button className="w-full !text-left !py-3 !px-5 !justify-start !capitalize !text-black !rounded-none flex items-center gap-2">
                        <FavoriteIcon color="action"  className=" text-[17px]"/>Sản phẩm yêu thích
                    </Button>
                </NavLink>
            </li>

            <li className="w-full">
                <NavLink to="/logout" exact={true} activeClassName="isActive">
                    <Button className="w-full  !text-left !py-3 !px-5 !justify-start !capitalize !text-black !rounded-none flex items-center gap-2">
                        <Logout color="action" className=" text-[17px]"/>Đăng xuất
                    </Button>
                </NavLink>
            </li>
        </ul>
    </div>
  )
}

export default AccountSidebar;
