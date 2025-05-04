import React, { useState,useContext, useEffect} from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Logout from '@mui/icons-material/Logout';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink, useNavigate } from "react-router";
import { Button } from '@mui/material';
import { MyContext } from '../../App';
import { CircularProgress } from "@mui/material";
import {  fetchDataFromApi, uploadImage } from '../../utils/api';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

const AccountSidebar = () => {

    const [previews, setPreviews] = useState([]);
    const [uploading, setUploading] = useState(false);

    const context = useContext(MyContext);

    useEffect(()=>{
        const userAvatar = [];
        if(context?.userData?.avatar!=="" && context?.userData?.avatar!==undefined){
            userAvatar.push(context?.userData?.avatar);
            setPreviews(userAvatar);
        } 
    },[context?.userData])

    // let img_arr = [];
    // let uniqueArray = [];
    let selectedImages = [];

    const formdata = new FormData();


    const onChangeFile = async (e, apiEndPoint) => {
        try{
            setPreviews([]);
            const files = e.target.files;
            setUploading(true);
            console.log(files);

            for (var i = 0; i < files.length; i++) {
                if (
                    files[i] && ( files[i].type === "image/jpeg"||files[i].type === "image/jpg"||
                    files[i].type === "image/png"||
                    files[i].type === "image/webp" )
                ){
                    const file = files[i];
                    selectedImages.push(file);
                    formdata.append(`avatar`, file);

                    const token = localStorage.getItem('accessToken');

                    uploadImage(`/api/user/user-avatar?token=${token}`,formdata).then((res)=>{
                        setUploading(false);
                        let avatar = [];
                        avatar.push(res?.avatar);
                        setPreviews(avatar);
                    })
                    
                }else{
                    context.openAlertBox("error","Chỉ tệp định dạng JPG, JPEG, PNG và WEBP");
                    setUploading(false);
                    return false;
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    const history = useNavigate();

    const logout=()=>{

        fetchDataFromApi(`/api/user/logout?token=${localStorage.getItem('accessToken')}`,{withCredentials: true}).then((res)=>{
            console.log("logout",res);
            if(res?.error === false){
                context.setIsLogin(false);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken"); 
                context.setUserData(null);
                context?.setCartData([]);
                context?.setMyListData([]);
                history("/")
            }
        })
    }

    return (
        <div className="card bg-white shadow-md rounded-md sticky top-28">
            <div className="w-full p-5 flex items-center justify-center flex-col">
                <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200"> 
                    {
                        uploading === true 
                        ? 
                        <CircularProgress color="inherit"/>
                        :   
                        <>
                            {
                                previews?.length !== 0 ? previews?.map((img, index) => {
                                    return (
                                        <img 
                                            alt="" 
                                            src={img}
                                            key={index} 
                                            className="w-full h-full object-cover"
                                        />
                                    )
                                }):
                                    <img 
                                        alt="" 
                                        src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/477713Dpz/anh-mo-ta.png"
                                        className="w-full h-full object-cover"
                                    />
                            }
                        </>
                    }                  
                    
                    <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)]
                    flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
                        <FaCloudUploadAlt className="text-white text-[25px]"/>
                        <input 
                            type="file" 
                            className="absolute top-0 left-0 w-full h-full opacity-0"
                            accept='image/*'
                            onChange={(e)=>onChangeFile(e, "/api/user/user-avatar")}
                            name="avatar"
                        />
                    </div>
                </div>

                <h3>{context?.userData?.name}</h3>
                <h6 className="text-[13px] font-[500]">{context?.userData?.email}</h6>

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
                    <NavLink to="/address" exact={true} activeClassName="isActive">
                        <Button className="w-full !text-left !py-3 !px-5 !justify-start !capitalize !text-black !rounded-none flex items-center gap-2">
                            <AddLocationAltIcon color="action" className=" text-[17px]"/>Địa chỉ
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
                    <NavLink to="" exact={true} activeClassName="isActive">
                        <Button onClick={logout} className="w-full  !text-left !py-3 !px-5 !justify-start !capitalize !text-black !rounded-none flex items-center gap-2">
                            <Logout color="action" className=" text-[17px]"/>Đăng xuất
                        </Button>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default AccountSidebar;
