import React, { useContext, useState } from "react";
// import Button from "@mui/material/Button";
// import { BsFillBagCheckFill } from "react-icons/bs"; 
import MyListItems from "./MyListItems";
import AccountSidebar from "../../Components/AccountSidebar";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";


const MyList = () => {

    const context = useContext(MyContext);

    return (
        <>
            <section className="py-10 w-full mt-28">
                <div className="container flex gap-5">
                    <div className="col1 w-[20%]">
                        <AccountSidebar/>
                    </div>

                    <div className="col2 w-[80%]">
                        <div className="shadow-md rounded-md  bg-white">
                            <div className="py-5 px-3 border-b border-[rgba(0,0,0,0.1)]">
                                <h2>Sản phẩm yêu thích</h2>
                                <p className="mt-> mb-0">
                                    Bạn có <span className="font-bold text-primary-600">{context?.myListData?.length}</span>{" "} 
                                    sản phẩm yêu thích
                                </p>
                            </div>

                            {
                                context?.myListData?.length !== 0 ? context?.myListData?.map((item, index) => {
                                    return (
                                        <MyListItems item={item}/>
                                    )
                                })

                                :

                                <div className="flex items-center justify-center flex-col py-6 px-3">
                                    <img src="https://img.freepik.com/premium-vector/vector-cartoon-notepad-edit-document-with-pencil-icon-comic-style_508290-2793.jpg" alt="" className="w-[240px]"/>
                                    <h3 className="mb-3">Danh sách trống</h3>
                                    <Link to="/"><Button className="btn-org btn-sm">Xem các sản phẩm khác</Button></Link>
                                </div>
                            }

                           
                            {/* <MyListItems/>
                            <MyListItems/> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MyList;

