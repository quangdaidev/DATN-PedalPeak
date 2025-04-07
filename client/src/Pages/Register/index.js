import React,{useContext, useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import {IoMdEye} from "react-icons/io";
import {IoMdEyeOff} from "react-icons/io";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";

import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register=()=>{

    const [isLoading, setIsLoading] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [formFields, setFormFields] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    // const  [valideValue,setValideValue] = useState(false) //valideValue trả về true or false


    const context = useContext(MyContext);
    const history = useNavigate();

    useEffect(()=>{
        window.scrollTo(0,0)
    })

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setFormFields(()=>{
            return {
                ...formFields,
                [name]: value
            }
        })
    }

    // const valideValue = Object.values(formFields).every(el => el) //valideValue trả về true or false

    const handleSubmit= (e) =>{

        e.preventDefault();

        setIsLoading(true)

        if(formFields.name===""){
            context.openAlertBox(
                "error",
                "Bạn chưa nhập tên người dùng"
            )
            setIsLoading(false);
            return false
        }

        if(formFields.email===""){
            context.openAlertBox(
                "error",
                "Bạn chưa nhập email"
            )
            setIsLoading(false);
            return false
        }

        if(formFields.password===""){
            context.openAlertBox(
                "error",
                "Bạn chưa nhập mật khẩu"
            )
            setIsLoading(false);
            return false
        }

        if(formFields.confirmPassword===""){
            context.openAlertBox(
                "error",
                "Bạn chưa xác nhận lại mật khẩu"
            )
            setIsLoading(false);
            return false
        }

        if(formFields.confirmPassword!==formFields.password){
            context.openAlertBox(
                "error",
                "Mật khẩu không khớp"
            )
            setIsLoading(false);
            return false
        }

        postData("/api/user/register",formFields).then((res)=>{
            console.log(res)
         
            if (res?.error !== true) {
                setIsLoading(true)
                localStorage.setItem("userEmail",formFields.email);
                context.openAlertBox("success", res?.message);
                setFormFields({
                    name:"",
                    email:"",
                    password:"",
                    confirmPassword:""
                })
                
                
                history("/verify")
              
            } else{
                context.openAlertBox("error", res?.message);
                setIsLoading(false);
            }
        })

    }

    return (
        <>
            <div className=" h-screen mt-14 font-[sans-serif]  max-w-4xl flex items-center mx-auto md:h-screen p-4">
                <div className=" bg-white grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
                    <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
                        <div>
                            <h4 className="text-white text-lg font-semibold">Tạo tài khoản</h4>
                            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Chào mừng đến với trang đăng ký của chúng tôi! Bắt đầu bằng cách tạo tài khoản của bạn.</p>
                        </div>
                        <div>
                            <h4 className="text-white text-lg font-semibold">Đơn giản và an toàn</h4>
                            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Quá trình đăng ký của chúng tôi được thiết kế đơn giản và an toàn. Chúng tôi ưu tiên quyền riêng tư và bảo mật dữ liệu của bạn.</p>
                        </div>
                    </div>

                    <div className="md:col-span-2 w-full py-6 px-6 sm:px-16">
                        <div className="mb-6">
                            <h3 className="text-gray-800 text-2xl font-bold">Tạo tài khoản</h3>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Tên người dùng</label>
                                    <div className="relative flex items-center">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={formFields.name}
                                            disabled={isLoading===true ? true : false}
                                            autoComplete="name"
                                            className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                                            placeholder="Nhập tên người dùng"
                                            onChange={onChangeInput}
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                                            <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                            <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                                        </svg>
                                    </div>
                                    {/* {errors.name && touched.name ? <div className='text-red-500'>{errors.name}</div> : null} */}
                                </div>

                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Email đăng nhập</label>
                                    <div className="relative flex items-center">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formFields.email}
                                            disabled={isLoading===true ? true : false}
                                            autoComplete="email"
                                            className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" 
                                            placeholder="Nhập email"
                                            onChange={onChangeInput}
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 682.667 682.667">
                                            <defs>
                                            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                                <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                            </clipPath>
                                            </defs>
                                            <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                            <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                                            <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    {/* {errors.email && touched.email ? <div className='text-red-500'>{errors.email}</div> : null} */}
                                </div>

                                {/* <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Ngày sinh</label>
                                    <div className="relative flex items-center">
                                        <input type="date" id="birthdate" name="birthdate" className="text-gray-800  bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"  required/>
                                
                                    </div>
                                    { touched.birthdate ? <div className='text-red-500'>{errors.birthdate}</div> : null}
                                </div> */}

                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Mật khẩu</label>
                                    <div className="relative flex items-center">
                                        <input
                                            id="password"
                                            name="password"
                                            type={isShowPassword===false ? 'password' : 'text'}
                                            value={formFields.password}
                                            disabled={isLoading===true ? true : false}
                                            autoComplete="current-password"
                                            className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" 
                                            placeholder="Nhập mật khẩu"
                                            onChange={onChangeInput}
                                        />
                                        <Button className="!absolute top-[6px] right-[8px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-[#bbb]"
                                            onClick={()=>setIsShowPassword(!isShowPassword)}
                                            >
                                            {
                                                isShowPassword===true ?  <IoMdEye className="text-[20px] opacity-75"/> :  <IoMdEyeOff className="text-[20px] opacity-75"/>
                                            }                          
                                        </Button>
                                    
                                    </div>
                                    {/* {errors.password && touched.password ? <div className='text-red-500'>{errors.password}</div> : null} */}
                                </div>

                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Nhập lại mật khẩu</label>
                                    <div className="relative flex items-center">
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={isShowPassword===false ? 'password' : 'text'}
                                            value={formFields.confirmPassword}
                                            disabled={isLoading===true ? true : false}
                                            autoComplete="current-password"
                                            className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" 
                                            placeholder="Xác nhận mật khẩu"
                                            onChange={onChangeInput}
                                        />
                                        <Button className="!absolute top-[6px] right-[8px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-[#bbb]"
                                            onClick={()=>setIsShowPassword(!isShowPassword)}
                                            >
                                            {
                                                isShowPassword===true ?  <IoMdEye className="text-[20px] opacity-75"/> :  <IoMdEyeOff className="text-[20px] opacity-75"/>
                                            }                          
                                        </Button>
                                    </div>
                                    {/* {errors.confirmPassword && touched.confirmPassword ? <div className='text-red-500'>{errors.confirmPassword}</div> : null} */}
                                </div>

                                {/* <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                                    Tôi đồng ý <Link to="#" className="text-blue-600 font-semibold hover:underline ml-1">Điều khoản và Chính sách bảo mật</Link>
                                    </label>
                                </div> */}
                            </div>

                            <div className="!mt-12">
                                    {
                                        isLoading === true ?
                                        <button type="submit" disabled={true} className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none">
                                            <div className="flex gap-3 items-center justify-center CircularProgress">                                           
                                                <CircularProgress color="inherit"/>                                          
                                            </div>
                                        </button>
                                        :
                                        <button type="submit" disabled={false} className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none">
                                            <div className="flex gap-3 items-center justify-center CircularProgress">                                            
                                                <span className=" text-xl">Đăng ký </span>                                            
                                            </div>
                                        </button>
                                    }
                                {/* <button type="submit" disabled={valideValue} className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none">
                                    <div className="flex gap-3 items-center justify-center CircularProgress">
                                    {
                                        isLoading === true ?  <CircularProgress color="inherit"/> : <span className=" text-xl">Đăng ký </span> 

                                    }
                                    </div>
                                </button> */}
                            </div>
                        </form>
                        <p className="text-gray-800 text-sm mt-6 text-center">Bạn đã có tài khoản? <Link to="/Login" className="text-blue-600 font-semibold hover:underline ml-1">Đăng nhập tại đây</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;