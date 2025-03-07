
import React, {useContext, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import {IoMdEye} from "react-icons/io";
import {IoMdEyeOff} from "react-icons/io";
import { MyContext } from "../../App";



const ForgotPassword=()=>{

    const [isShowPassword, setIsShowPassword] = useState(true);
    const [isShowPassword2, setIsShowPassword2] = useState(true);
  

    const context = useContext(MyContext);
    const history = useNavigate();


    return (
      <section className="section pt-40 pb-10">
        <div className="container">
            <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
                <h3 className="text-center text-[18px] text-black">Quên mật khẩu</h3>
                
                <form className="w-full mt-5">
                    <div className="form-group w-full mb-5 relative">
                        <TextField
                            type={isShowPassword === true ? "password" : "text"}
                            id="password"
                            label="Mật khẩu mới"
                            variant="outlined"
                            className="w-full"
                            name="name"
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
                            id="confirm_password"
                            label="Nhập lại mật khẩu mới"
                            variant="outlined"
                            className="w-full"
                            name="password"
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
                    <button type="submit" className="w-full bg-gray-700 text-white p-2 rounded-md hover:bg-gray-800  focus:bg-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Đổi mật khẩu</button>
                    </div>

                </form>
            </div>
        </div>
      </section>
    )
}

export default ForgotPassword;