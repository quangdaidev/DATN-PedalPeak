import { Button } from '@mui/material';
import React from 'react';
import TextField from '@mui/material/TextField';
import AccountSidebar from '../../Components/AccountSidebar';

const MyAccount = () => {
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

                    <form className="mt-5">
                        <div className="flex items-center gap-5">
                            <div className="w-[50%]">
                                <TextField                                 
                                    label="Họ tên" 
                                    variant="outlined" 
                                    size="small"
                                    className="w-full"
                                />
                            </div>
                            <div className="w-[50%]">
                                <TextField                                 
                                    label="Email" 
                                    variant="outlined" 
                                    size="small"
                                    className="w-full"
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
                                />
                            </div>
                           
                        </div>

                        <br/>

                        <div className="flex item-center gap-4">
                            <Button className="btn-org w-[100px]">Lưu</Button>
                            <Button className="btn-org btn-border w-[100px]">Hủy</Button>
                        </div>
                    </form>
                </div>
               
            </div>
        </div>
    </section>
  )
}

export default MyAccount;