import React, {useContext, useEffect, useState} from 'react'
import AccountSidebar from '../../Components/AccountSidebar';
import Radio from '@mui/material/Radio';
import { MyContext } from '../../App';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Button, CircularProgress, MenuItem, Select } from '@mui/material';
import { deleteData, fetchDataFromApi, postData } from '../../utils/api';

import { FaRegTrashAlt } from 'react-icons/fa';

const label = { inputProps: {'aria-label': 'Checkbox demo'}};

const Address = () => {

    const [phone,setPhone] = useState('');
    const [status, setStatus] = useState(false);
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [address, setAddress] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const context = useContext(MyContext);

    useEffect(()=>{

        if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {

            setAddress(context?.userData?.address_details);
            
            // const token = localStorage.getItem('accessToken');
            
            // fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}?token=${token}`).then((res) => {
                //     setAddress(res.Data);
                // })
               
        } 
    },[context?.userData])

    const [formFields, setFormFields] = useState({
        street:"",   
        ward:"",
        district:"",
        city:"",
        mobile: phone,
        status:"",
        userId:context?.userData?._id ,
        selected: false
    });

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setFormFields(()=>{
            return {
                ...formFields,
                [name]: value
            }
        })
    }

    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }

    const handleClose = () => {
        setIsOpenModel(false);
        // setSelectedValue(value);
    };

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
        setFormFields((prevState) => ({
            ...prevState,
            status: event.target.value
        }))
    }

    const removeAddress = (id) => {
        deleteData(`/api/address/${id}`).then((res) => {
            if(res?.error !== true) {
            console.log("delete", res)
            context.openAlertBox("success", res?.message);
            const token = localStorage.getItem('accessToken');
            fetchDataFromApi(`/api/user/user-details?token=${token}`).then((res)=>{
                setAddress(res.data?.address_details);
            })
            } else {
                context.openAlertBox("error", res?.data?.message);
            }
        })
    }


    const handleSubmit = (e) => {
        
        e.preventDefault();

        setIsLoading(true);

        if (formFields.street === "") {
            context.openAlertBox("error", "Vui lòng điền địa chỉ nhà")
        }

        if (formFields.ward === "") {
            context.openAlertBox("error", "Vui lòng điền tên phường" )
        }

        if (formFields.district === "") {
            context.openAlertBox("error", "Vui lòng điền tên quận/huyện")
        }

        if (formFields.city === "") {
            context.openAlertBox("error", "Vui lòng điền tên thành phố/tỉnh")
        }

        if (formFields.phone === "") {
            context.openAlertBox("error", "Vui lòng điền số điện thoại")
        }

        // console.log("address---bf-bf",formFields);

        const token = localStorage.getItem('accessToken');

        postData(`/api/address/add?token=${token}`, formFields, {withCredentials: true}).then((res) => {
            console.log("address",res)
            if(res?.error !== true) {
                setIsLoading(false);
                console.log("success",res?.message)
                context.openAlertBox("success", res?.message);
                setIsOpenModel(false);

                // context?.setisOpenFullScreenPanel({
                //     open: false
                // })

                // fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                //     context?.setAddress(res.data);
                // })
                fetchDataFromApi(`/api/user/user-details?token=${token}`).then((res)=>{
                    setAddress(res.data?.address_details);
                    console.log("sewewe",res.data?.address_details )
                })
            } else {
                context.openAlertBox("error", res?.data?.message);
                setIsLoading(false);
            }
        })   
    }

  return (
    <>
        <section className="mt-40 mb-16 w-full ">
            <div className="container flex gap-5">
                <div className="col1 w-[20%]">
                    <AccountSidebar/>
                </div>

                <div className="col2 w-[50%]">
                    <div className="card bg-white p-5 shadow-md rounded-md">
                        <div className="flex items-center pb-3">
                            <h2 className="pb-0">Địa chỉ</h2>
                        </div>
                        <hr/>

                        <div className="flex items-center justify-center p-5 rounded-md border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer"
                            onClick={() => setIsOpenModel(true)}
                        >
                            <span className="text-[14px] font-[500px]">Thêm địa chỉ</span>
                        </div>

                        <div className="flex gap-2 flex-col mt-4">
                            {
                                address?.length > 0 && address?.map((address,index)=>{
                                    return (
                                        <>
                                            <label className="group border border-dashed border-[rgba(0,0,0,0.2)] addressBox w-full flex item-center
                                            justify-center bg-[#f1faff] p-3 rounded-md cursor-pointer">
                                                <div className="mr-auto">
                                                    <Radio {...label} name="address" 
                                                        checked={selectedValue === (address?._id)}
                                                        value={address?._id} 
                                                        onChange={handleChange}
                                                    />
                                                    <span className="text-[12px] ">
                                                        {
                                                            address?.street + " - "+
                                                            address?.ward + " - "+
                                                            address?.district + " - "+
                                                            address?.city
                                                        }
                                                    </span>
                                                </div>
                                                
                                                <span onClick={() => removeAddress(address?._id)} className="hidden group-hover:flex mt-[5px] items-center justify-center w-[30px] h-[30px] rounded-full bg-main-500 text-white ml-auto">
                                                    <FaRegTrashAlt/>
                                                </span>

                                            </label>
                                        </>
                                    )
                                })

                            }
                        </div>
                    </div>
                                
                </div>
            </div>
        </section>

        <Dialog open={isOpenModel}>
            <DialogTitle>Thêm địa chỉ</DialogTitle>
            <form className="p-8 py-3 pb-8" onSubmit={handleSubmit}>
                <div className="flex items-center gap-5 pb-5">
                    <div className='col w-[100%]'>
                        <TextField 
                            className="w-full" 
                            label="địa chỉ nhà" 
                            variant="outlined" 
                            size="small"
                            name="street" 
                            value={formFields.street || ''}
                            onChange={onChangeInput} 
                        />
                    </div>               
                </div>

                <div className="flex items-center gap-5 pb-5">
                    <div className='col w-[50%]'>
                        <TextField 
                            className="w-full" 
                            label="Phường/Xã" 
                            variant="outlined" 
                            size="small"
                            name="ward" 
                            onChange={onChangeInput} 
                            value={formFields.ward || ''}
                        />
                    </div>     
                    <div className='col w-[50%]'>
                        <TextField 
                            className="w-full" 
                            label="Quận/Huyện" 
                            variant="outlined" 
                            size="small"
                            name="district" 
                            onChange={onChangeInput} 
                            value={formFields.district || ''}
                        />
                    </div>                         
                </div>

                <div className="flex items-center gap-5 pb-5">
                    <div className='col w-[50%]'>
                        <TextField 
                            className="w-full" 
                            label="Thành phố/Tỉnh" 
                            variant="outlined" 
                            size="small"
                            name="city" 
                            onChange={onChangeInput} 
                            value={formFields.city || ''}
                        />
                    </div> 
                    <div className='col w-[50%]'>
                        <PhoneInput
                            defaultCountry='vn'
                            value={phone}
                            onChange={(phone) => {
                                setPhone(phone);
                                setFormFields({
                                    street:formFields.street,   
                                    ward:formFields.ward,
                                    district:formFields.district,
                                    city:formFields.city,
                                    mobile: phone,
                                    status:formFields.status,
                                    userId:context?.userData?._id ,
                                    selected: false
                                })
                            }}
                        />
                    </div>                      
                </div>

                <div className="flex items-center gap-5 pb-5">
                    <div className='col w-[50%]'>
                       <Select
                            value={status === true ? true : (status === false ? false : '')}
                            onChange={handleChangeStatus}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            size="small"
                            className="w-full"
                        >
                            <MenuItem value={true}>True</MenuItem>
                            <MenuItem value={false}>False</MenuItem>
                       </Select>
                    </div> 
                    <div className='col w-[50%]'>
                       
                    </div>                      
                </div>

                <div className="flex items-center gap-5">
                {
                    isLoading === true ?
                    <Button type="submit" disabled={true} className="btn-org btn-lg w-full flex gap-2 items-center">
                        <CircularProgress color="inherit"/>                                          
                    </Button>
                    :
                    <Button type="submit" disabled={false} className="btn-org btn-lg w-full flex gap-2 items-center">Lưu</Button>
                }
                   
                    <Button className="btn-org btn-border btn-lg w-full flex gap-2 items-center" onClick={handleClose}>Hủy</Button>
                </div>
            </form>
            
        </Dialog>                    
    </>
  )
}

export default Address;
