import React, { useState } from "react";
import Button from "@mui/material/Button";
import { BsFillBagCheckFill } from "react-icons/bs"; 
import MyListItems from "./MyListItems";
import AccountSidebar from "../../Components/AccountSidebar";


const MyList = () => {

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
                                    Bạn ccó <span className="font-bold text-primary-600">2</span>{" "} 
                                    sản phẩm yêu thích
                                </p>
                            </div>

                            <MyListItems/>
                            <MyListItems/>
                            <MyListItems/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MyList;

