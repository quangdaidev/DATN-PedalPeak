import { useContext, useEffect, useState } from 'react';
import patern from '../../assets/images/pattern.webp';
import { MyContext } from '../../App';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";

import googleIcon from '../../assets/images/googleIcon.png';
import { postData } from '../../utils/api';

import { CircularProgress } from "@mui/material";

const Login = () => {

    const [inputIndex, setInputIndex] = useState(null);
    const [isShowPassword, setisShowPassword] = useState(false);
    const context = useContext(MyContext);

    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        email:"",
        password:""
    })
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

    useEffect(() => {
        context.setisHideSidebarAndHeader(true);
    }, []);

    const focusInput = (index) => {
        setInputIndex(index);
    }

    const handleSubmit= (e) =>{

        e.preventDefault();

        setIsLoading(true)

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

        postData("/api/user/login-admin",formFields).then((res)=>{
            console.log(res)
            
            if (res?.error !== true) {
                setIsLoading(true)
                context.openAlertBox("success", res?.message);

                setFormFields({
                    email:"",
                    password:""
                })

                localStorage.setItem("accessToken",res?.data?.accesstoken);
                localStorage.setItem("refreshToken",res?.data?.refreshtoken); 
                
                context.setIsLogin(true);

                console.log("isLogin", context.isLogin)
                
                history("/dashboard")
                
            } else{
                context.openAlertBox("error", res?.message);
                setIsLoading(false);
            }
        })   
    }

    return (
        <>
            <img src={patern} alt="" className='loginPatern' />
            <section className="loginSection">
                <div className="loginBox">
                    <div className='logo text-center'>
                        <img src={logo} alt="" width="60px" />
                        <h5 className='font-weight-bold'>Đăng nhập trang quản trị</h5>
                    </div>

                    <div className='wrapper mt-3 card border'>
                        <form onSubmit={handleSubmit}>
                            <div className={`form-group position-relative ${inputIndex === 0 && 'focus'}`}>
                                <span className='icon'><MdEmail /></span>
                                <input 
                                    type='email' 
                                    className='form-control' 
                                    placeholder='admin001@pedalpeak.com' 
                                    onFocus={() => focusInput(0)} 
                                    onBlur={() => setInputIndex(null)} 
                                    autoFocus
                                    name="email"
                                    value={formFields.email}
                                    disabled={isLoading===true ? true : false}
                                    onChange={onChangeInput}
                                />
                            </div>

                            <div className={`form-group position-relative ${inputIndex === 1 && 'focus'}`}>
                                <span className='icon'><RiLockPasswordFill /></span>
                                <input 
                                type={`${isShowPassword === true ? 'text' : 'password'}`} 
                                className='form-control' 
                                placeholder='12345678' 
                                onFocus={() => focusInput(1)} 
                                onBlur={() => setInputIndex(null)} 
                                name="password"
                                value={formFields.password}
                                disabled={isLoading===true ? true : false}
                                onChange={onChangeInput}
                                />

                                <span className='toggleShowPassword' onClick={() => setisShowPassword(!isShowPassword)}>
                                    {
                                        isShowPassword === true ? <IoMdEye/> : <IoMdEyeOff />
                                    }

                                </span>

                            </div>

                            <div className='form-group'>
                                {
                                    isLoading === true ?
                                    <Button type="submit" disabled={true} className="btn-blue btn-lg w-100 btn-big CircularProgress">
                                        <CircularProgress color="inherit"/>      
                                    </Button>
                                    :
                                    <Button type="submit" className="btn-blue btn-lg w-100 btn-big">
                                        Đăng nhập  
                                    </Button>
                                }
                            </div>

                            <div className='form-group text-center mb-0'>
                                <Link to={'/forgot-password'} className="link">QUÊN MẬT KHẨU</Link>
                                <div className='d-flex align-items-center justify-content-center or mt-3 mb-3'>
                                    <span className='line'></span>
                                    <span className='txt'>hoặc</span>
                                    <span className='line'></span>
                                </div>

                                <Button variant="outlined" className='w-100 btn-lg btn-big loginWithGoogle'>
                                    <img src={googleIcon} alt="" width="25px" /> &nbsp; Đăng nhập với Google
                                </Button>

                            </div>

                        </form>
                    </div>

                    {/* <div className='wrapper mt-3 card border footer p-3'>
                        <span className='text-center'>
                            Don't have an account?
                            <Link to={'/signUp'} className='link color ml-2'>Register</Link>
                        </span>
                    </div> */}

                </div>
            </section>
        </>
    )
}

export default Login;