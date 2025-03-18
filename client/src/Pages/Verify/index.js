import React, { useContext, useEffect, useState } from "react"; 
import OtpBox from "../../Components/OtpBox";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import MyAccount from "../MyAccount";
import { MyContext } from "../../App";

const userEmail= localStorage.getItem("userEmail");

const Verify = () => {
    const [otp, setOtp] = useState("");
    const handleOtpChange = (value) => { 
        setOtp(value);
    };

    const history = useNavigate();
    const context = useContext(MyContext);

    const verityOTP=(e)=>{
        e.preventDefault();
        postData("/api/user/verifyEmail",{
            email:localStorage.getItem("userEmail"),
            otp:otp
        }).then((res) => {
            if(res?.error===false){
                context.openAlertBox("success", res?.message);
                history("/login")
            }else{
                context.openAlertBox("error", res?.message)
            }
        })
    }

return (
    <section className="section py-10 mt-28">
        <div className="container">
            <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10"> 
                <div className="text-center flex items-center justify-center">
                    <img alt="" src="https://icons.veryicon.com/png/o/business/business-style-icon/shield-24.png" className="w-[150px] h-[140px]"/>
                </div>
                <h3 className="text-center text-[18px] text-black mt-4 mb-2">
                Verify OTP
                </h3>
                <p className="text-center mb-4">OTP gửi đến <span className="text-primary-600 font-bold">{userEmail}</span></p>
               
                <form onSubmit={verityOTP}>
                    <OtpBox length={6} onChange={handleOtpChange} />

                    <div className="flex items-center justify-center ">
                        <button type="submit" className=" ml-40 mt-6 bg-blue-900 text-white w-10/12 bottom-4 -translate-x-1/2  group-hover:animate-fadeIn ct-button">Xác nhận</button>
                    </div>
                </form>
                
            </div>
        </div>
    </section>
    )}



export default Verify;