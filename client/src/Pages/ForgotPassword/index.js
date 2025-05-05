
import React, {useContext, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import {IoMdEye} from "react-icons/io";
import {IoMdEyeOff} from "react-icons/io";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import { CircularProgress } from "@mui/material";



const ForgotPassword=()=>{

    const [isShowPassword, setIsShowPassword] = useState(true);
    const [isShowPassword2, setIsShowPassword2] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const [formFields, setFormFields] = useState({
        email:localStorage.getItem("userEmail"),
        newPassword:"",
        confirmPassword:""
    })
  

    const context = useContext(MyContext);
    const history = useNavigate();

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setFormFields(()=>{
            return {
                ...formFields,
                [name]: value
            }
        })
    }

     const handleSubmit= (e) =>{
    
        e.preventDefault();

        setIsLoading(true);

        if(formFields.newPassword===""){
            context.openAlertBox(
                "error",
                "Bạn chưa nhập mật khẩu mới"
            )
            setIsLoading(false);
            return false
        }

        
        if (formFields.newPassword.length < 8) {
            context.openAlertBox(
                "error",
                "Mật khẩu phải có ít nhất 8 ký tự"
            );
            setIsLoading(false);
            return false;
        }

        if(formFields.confirmPassword===""){
            context.openAlertBox(
                "error",
                "Bạn chưa xác nhận lại mật khẩu"
            )
            setIsLoading(false);
            return false
        }

        if(formFields.confirmPassword !==formFields.newPassword){
            context.openAlertBox(
                "error",
                "Xác nhận mật khẩu không khớp"
            )
            setIsLoading(false);
            return false
        }

        setTimeout(() => {
            postData("/api/user/reset-password",formFields).then((res)=>{
            // console.log(res);
            if(res?.error === false){
                localStorage.removeItem("userEmail");
                localStorage.removeItem("actionType");
                setIsLoading(true);
                context.openAlertBox("success", res?.message);
                history("/login");
            }else{
                context.openAlertBox("error", res?.message);
            }
            }) 
        }, 3000);  
    }


    return (
      <section className="section pt-[210px] pb-36">
        <div className="container">
            <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
                <h3 className="text-center text-[18px] text-black">Cập nhật mật khẩu</h3>
                
                <form className="w-full mt-5" onSubmit={handleSubmit}>
                    <div className="form-group w-full mb-5 relative">
                        <TextField
                            type={isShowPassword === true ? "password" : "text"}
                            id="newPassword"
                            label="Mật khẩu mới"
                            variant="outlined"
                            className="w-full"
                            name="newPassword"
                            value={formFields.newPassword}
                            disabled={isLoading===true ? true : false}
                            onChange={onChangeInput}
                        />

                        <Button
                            className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w- [35px] rounded-full !text-black"
                            onClick={() => {
                                setIsShowPassword(!isShowPassword);
                            }}
                        >
                            {isShowPassword === false ? (
                                <IoMdEye className="text-[20px] opacity-75" />
                            ): (
                                <IoMdEyeOff className="text-[20px] opacity-75" />
                            )}
                        </Button>
                    </div>

                    <div className="form-group w-full mb-5 relative">
                        <TextField
                            type={isShowPassword2 === true ? "password" : "text"}
                            id="confirmPassword"
                            label="Nhập lại mật khẩu"
                            variant="outlined"
                            className="w-full"
                            name="confirmPassword"
                            value={formFields.confirmPassword}
                            disabled={isLoading===true ? true : false}
                            onChange={onChangeInput}
                        />

                        <Button
                            className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w- [35px] rounded-full !text-black"
                            onClick={() => {
                                setIsShowPassword2(!isShowPassword2);
                            }}
                        >
                            {isShowPassword2 === false ? (
                                <IoMdEye className="text-[20px] opacity-75" />
                            ): (
                                <IoMdEyeOff className="text-[20px] opacity-75" />
                            )}
                        </Button>
                    </div>

                    <div className="flex items-center w-full mt-3 mb-3">
                        {
                            isLoading === true 
                            ?
                            <button type="submit" disabled={true} className="w-full bg-gray-700 text-white p-2 rounded-md hover:bg-gray-800  focus:bg-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 CircularProgress">
                                <CircularProgress color="inherit"/>  
                            </button>                                   
                            :
                            <button type="submit" disabled={false} className="w-full bg-gray-700 text-white p-2 rounded-md hover:bg-gray-800  focus:bg-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Xác nhận</button>
                        }                  
                    </div>

                </form>
            </div>
        </div>
      </section>
    )
}

export default ForgotPassword;