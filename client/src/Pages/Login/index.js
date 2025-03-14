import React, {useContext, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';

import { FaFacebook } from "react-icons/fa";
import Button from "@mui/material/Button";
import {IoMdEye} from "react-icons/io";
import {IoMdEyeOff} from "react-icons/io";
import { MyContext } from "../../App";

const Login=()=>{

    const [isShowPassword, setIsShowPassword] = useState(false);

    // const [formFields, setFormFields] = useState({
    //     email:'',
    //     password:''
    // })

    const context = useContext(MyContext);
    const history = useNavigate();

    const forgotPassword =()=>{
        // if(formFields.email!==""){
        //     context.openAlertBox("tttttt");
        //     history("/verify");
        // }
        context.openAlertBox("success","OTP gửi thành công!");
        history("/verify");
    }

    return (
        <div>
            <div className="flex h-screen mt-20">
            {/* <!-- Left Pane --> */}
            <div className="hidden lg:flex items-center justify-center flex-1 bg-gray-100 text-black">
                <div className="">
                <div className="h-screen">
                    <img src="https://images.pexels.com/photos/3599576/pexels-photo-3599576.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="object-cover w-full h-full"/>
                </div>
                </div>
            </div>
            {/* <!-- Right Pane --> */}
            <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
                <div className="max-w-md w-full p-6">
                <h1 className="text-3xl font-semibold mb-6 text-black text-center">Đăng nhập</h1>
                <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Tham gia Cộng đồng của chúng tôi với quyền truy cập mọi lúc và miễn phí </h1>
                <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
                    <div className="w-full lg:w-1/2 mb-2 lg:mb-0">
                    <button type="button" className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4" id="google">
                        <path fill="#fbbb00" d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"></path>
                        <path fill="#518ef8" d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"></path>
                        <path fill="#28b446" d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"></path>
                        <path fill="#f14336" d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"></path>
                        </svg> Tài khoản Google </button>
                    </div>
                    <div className="w-full lg:w-1/2 ml-0 lg:ml-2">
                    <button type="button" className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
                    <FaFacebook style={{color: 'blue'}} />
                        Tài khoản Facebook </button>
                    </div>
                </div>
                <div className="mt-4 text-sm text-gray-600 text-center">
                    <p>hoặc</p>
                </div>
                <form  action="#" method="POST" className="space-y-4">
                    {/* <!-- Your form elements go here --> */}
                    <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
                    </div>
                    <div className=" relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                        <input 
                            id="password"
                            name="password"
                            type={isShowPassword===false ? 'password' : 'text'}
                            required
                            autoComplete="current-password" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"                              
                        />
                        <Button className="!absolute top-[28px] right-[8px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                        onClick={()=>setIsShowPassword(!isShowPassword)}
                        >
                        {
                            isShowPassword===true ?  <IoMdEye className="text-[20px] opacity-75"/> :  <IoMdEyeOff className="text-[20px] opacity-75"/>
                        }                          
                        </Button>
                    </div>
                    <p className="mt-10 link cursor-pointer text-[14px] font-[600]" onClick={forgotPassword}>Quên mật khẩu?</p>
                    <div>
                    {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
                    <button type="submit" className="w-full bg-gray-700 text-white p-2 rounded-md hover:bg-gray-800  focus:bg-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Đăng nhập</button>
                    </div>
                </form>
                <div className="mt-4 text-sm text-gray-600 text-center">
                    <p>Bạn chưa có tài khoản? <Link to="Register" className="text-black hover:underline">Đăng ký tại đây</Link>
                    </p>
                </div>
                </div>
            </div>
            </div>
      </div>
    )
}

export default Login;