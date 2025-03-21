import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import AccountSidebar from '../../Components/AccountSidebar';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { editData } from '../../utils/api';
import { CircularProgress } from "@mui/material";

const MyAccount = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState("");

    const [formFields, setFormFields] = useState({
        name:"",   
        email:"",
        mobile:""
    })

    const context = useContext(MyContext);
    const history = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("accessToken");

        if(token===null){
            history("/");
        }
    },)

    useEffect(()=>{
        if(context?.userData?._id!=="" && context?.userData?._id!==undefined){ 
            setUserId(context?.userData?._id);
            setFormFields({
                name: context?.userData?.name,   
                email: context?.userData?.email,
                mobile: context?.userData?.mobile
            })
            console.log("gfhdfgfdgh",context?.userData)
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

  return (
    <section className="py-10 w-full mt-28">
        <div className="container flex gap-5">
            <div className="col1 w-[20%]">
                <AccountSidebar/>
            </div>

            <div className="col2 w-[50%]">
                <div className="card bg-white p-5 shadow-md rounded-md">
                    <h2 className="pb-3">Thông tin tài khoản</h2>
                    <hr/>

                    <form className="mt-5" onSubmit={handleSubmit}>
                        <div className="flex items-center gap-5">
                            <div className="w-[50%]">
                                <TextField                                 
                                    label="Họ tên" 
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
                                <TextField                                 
                                    label="Số điện thoại" 
                                    variant="outlined" 
                                    size="small"
                                    className="w-full"
                                    name="mobile"
                                    value={formFields.mobile}
                                    disabled={isLoading===true ? true : false}
                                    onChange={onChangeInput}
                                />
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
               
            </div>
        </div>
    </section>
  )
}

export default MyAccount;