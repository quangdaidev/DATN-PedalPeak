import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import AccountSidebar from '../../Components/AccountSidebar';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { editData } from '../../utils/api';
import { CircularProgress } from "@mui/material";
import {Collapse} from 'react-collapse';
import {IoMdEye} from "react-icons/io";
import {IoMdEyeOff} from "react-icons/io";

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const MyAccount = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [userId, setUserId] = useState("");
    const [isChangePasswordFormShow, setIsChangePasswordFormShow] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [phone,setPhone] = useState('');

    const [formFields, setFormFields] = useState({
        name:"",   
        email:"",
        mobile:""
    });

    const [changePassword, setChangePassword] = useState({
        email:"",
        oldPassword:"",   
        newPassword:"",
        confirmPassword:""
    });

    const context = useContext(MyContext);
    const history = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("accessToken");

        if(token===null){
            history("/");
        }
    },[])

    useEffect(()=>{
        if(context?.userData?._id!=="" && context?.userData?._id!==undefined){ 
            setUserId(context?.userData?._id);
            setFormFields({
                name: context?.userData?.name,   
                email: context?.userData?.email,
                mobile: context?.userData?.mobile
            })
            // console.log("userData",context?.userData)

            const ph = `"${context?.userData?.mobile}"`;
            setPhone(ph);

            setChangePassword({
                email: context?.userData?.email,
    
            })
        } 

    },[context?.userData])

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setFormFields(()=>{
            return {
                ...formFields,
                [name]: value
            }
        })

        setChangePassword(()=>{
            return {
                ...changePassword,
                [name]: value
            }
        })
    }

    const handleSubmit= (e) =>{
    
        e.preventDefault();

        setIsLoading(true)

        if(formFields.name===""){
            context.openAlertBox(
                "error",
                "Bạn chưa nhập tên"
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

        if(formFields.mobile===""){
            context.openAlertBox(
                "error",
                "Bạn chưa nhập số điện thoại"
            )
            setIsLoading(false);
            return false
        }

        const token = localStorage.getItem('accessToken');

        editData(`/api/user/${userId}?token=${token}`,formFields, {withCredentials: true}).then((res)=>{
            console.log(res)
            
            if (res?.error !== true) {
                setIsLoading(true)
                context.openAlertBox("success", res?.message);

                setFormFields({
                    name:formFields.name,   
                    email:formFields.email,
                    mobile:formFields.mobile,
                })

                setIsLoading(false);
                
                context.setIsLogin(true);

                console.log("isLogin", context.isLogin)
                
                history("/my-account")
            
                
            } else{
                context.openAlertBox("error", res?.message);
                setIsLoading(false);
            }

        })   
    }

    const ChangePassword= (e) =>{
    
        e.preventDefault();

        setIsLoading2(true);

        editData('/api/user/reset-password',changePassword, {withCredentials: true}).then((res)=>{
            // console.log(res)
            
            if (res?.error !== true) {
                setIsLoading2(false)
                context.openAlertBox("success", res?.message);
                      
            } else{
                context.openAlertBox("error", res?.message);
                setIsLoading2(false);
            }

        })   
    }

  return (
    <section className="mt-40 mb-16 w-full ">
        <div className="container flex gap-5">
            <div className="col1 w-[20%]">
                <AccountSidebar/>
            </div>

            <div className="col2 w-[50%]">
                <div className="card bg-white p-5 shadow-md rounded-md">
                    <div className="flex items-center pb-3">
                        <h2 className="pb-0">Thông tin tài khoản</h2>
                        <Button className="!ml-auto" onClick={()=>setIsChangePasswordFormShow(!isChangePasswordFormShow)}>Đổi mật khẩu</Button>
                    </div>
                    <hr/>

                    <form className="mt-5" onSubmit={handleSubmit}>
                        <div className="flex items-center gap-5">
                            <div className="w-[50%]">
                                <TextField                                 
                                    label="Họ Tên" 
                                    variant="outlined" 
                                    size="small"
                                    className="w-full"
                                    name="name"
                                    value={formFields.name}
                                    disabled={isLoading===true ? true : false}
                                    onChange={onChangeInput}
                                />
                                
                            </div>
                            <div className="w-[50%]">
                                <TextField   
                                    type="email"                              
                                    label="Email" 
                                    variant="outlined" 
                                    size="small"
                                    className="w-full"
                                    name="email"
                                    value={formFields.email}
                                    disabled={true}
                                    onChange={onChangeInput}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-5 mt-5">                      
                            <div className="w-[50%]">
                                <PhoneInput
                                    defaultCountry='vn'
                                    value={phone}
                                    disabled={isLoading === true ? true : false}
                                    onChange={(phone) => {
                                        setPhone(phone);
                                        setFormFields({
                                            mobile: phone
                                        })
                                    }}
                                />
                            </div>
                                                        
                            <div className="w-[50%]">                               
                            </div>                          
                        </div>

                        <br/>

                        <div className="flex item-center gap-4">
                            {
                                isLoading === true ?
                                <Button type="submit" disabled={true} className="btn-org w-[100px] CircularProgress">
                                    <CircularProgress color="inherit"/>   
                                </Button>    
                                :
                                <Button type="submit" disabled={false} className="btn-org w-[140px] CircularProgress">Cập nhật</Button>
                            }
                           
                            <Button className="btn-org btn-border w-[80px]">Hủy</Button>
                        </div>
                    </form>
                </div>
            
                {
                    <Collapse isOpened={isChangePasswordFormShow}>
                        <div className="card bg-white p-5 mt-5 shadow-md rounded-md">
                            <div className="flex items-center pb-3">
                                <h2 className="pb-0">Đổi mật khẩu</h2>
                            </div>
                            <hr/>

                            <form className="mt-5" onSubmit={ChangePassword}>
                                <div className="flex items-center gap-5">

                                    {
                                        context?.userData?.signUpWithGoogle===false &&
                                        <div className="w-[50%] relative flex items-center">
                                            <TextField  
                                                type={isShowPassword===false ? 'password' : 'text'}                             
                                                label="Mật khẩu cũ" 
                                                size="small"
                                                className="w-full"
                                                name="oldPassword"
                                                value={changePassword.oldPassword}
                                                disabled={isLoading2===true ? true : false}
                                                onChange={onChangeInput}
                                            />
                                            <Button className="!absolute top-[3px] right-[5px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-[#bbb]"
                                                onClick={()=>setIsShowPassword(!isShowPassword)}
                                                >
                                                {
                                                    isShowPassword===true ?  <IoMdEye className="text-[20px] opacity-75"/> :  <IoMdEyeOff className="text-[20px] opacity-75"/>
                                                }                          
                                            </Button>
                                        </div>
                                    }

                                   
                                    <div className="w-[50%]">                               
                                    </div> 
                                </div>

                                <div className="flex items-center gap-5 mt-5">
                                    <div className="w-[50%] relative flex items-center">
                                        <TextField   
                                            type={isShowPassword===false ? 'password' : 'text'}                            
                                            label="Mật khẩu mới" 
                                            variant="outlined" 
                                            size="small"
                                            className="w-full"
                                            name="newPassword"
                                            value={changePassword.newPassword}
                                            disabled={isLoading2===true ? true : false}
                                            onChange={onChangeInput}
                                        />
                                         <Button className="!absolute top-[3px] right-[5px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-[#bbb]"
                                            onClick={()=>setIsShowPassword(!isShowPassword)}
                                            >
                                            {
                                                isShowPassword===true ?  <IoMdEye className="text-[20px] opacity-75"/> :  <IoMdEyeOff className="text-[20px] opacity-75"/>
                                            }                          
                                        </Button>
                                    </div>
                                    <div className="w-[50%] relative flex items-center">
                                        <TextField    
                                            type={isShowPassword===false ? 'password' : 'text'}                                   
                                            label="Nhập lại mật khẩu mới" 
                                            variant="outlined" 
                                            size="small"
                                            className="w-full"
                                            name="confirmPassword"
                                            value={changePassword.confirmPassword}
                                            disabled={isLoading2===true ? true : false}
                                            onChange={onChangeInput}
                                        />
                                        <Button className="!absolute top-[3px] right-[5px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-[#bbb]"
                                            onClick={()=>setIsShowPassword(!isShowPassword)}
                                            >
                                            {
                                                isShowPassword===true ?  <IoMdEye className="text-[20px] opacity-75"/> :  <IoMdEyeOff className="text-[20px] opacity-75"/>
                                            }                          
                                        </Button>
                                    </div>
                                                              
                                </div>
                                <br/>

                                <div className="flex item-center gap-4">
                                    {
                                        isLoading2 === true ?
                                        <Button type="submit" disabled={true} className="btn-org w-[100px] CircularProgress">
                                            <CircularProgress color="inherit"/>   
                                        </Button>    
                                        :
                                        <Button type="submit" disabled={false} className="btn-org w-[140px] CircularProgress">Xác nhận</Button>
                                    }
                                
                                    <Button className="btn-org btn-border w-[80px]">Hủy</Button>
                                </div>
                            </form>
                        </div>
                    </Collapse>
                }
                              
            </div>
        </div>
    </section>
  )
}

export default MyAccount;