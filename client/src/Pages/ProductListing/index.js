import React, { useState } from "react";
import { Sidebar } from "../../Components/Sidebar";

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ProductItem from "../../Components/ProductItem";
import ProductItemListView from "../../Components/ProductItemListView";
import Button from "@mui/material/Button"; 
import { IoGridSharp } from "react-icons/io5"; 
import { LuMenu } from "react-icons/lu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem"; 
import Pagination from '@mui/material/Pagination';

// import { Link } from 'react-router-dom';

const ProductListing = () =>{
    const [itemView, setItemView] = useState('grid');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return ( 
        <section className="py-8 mt-[120px]">
            <div className="container">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/" className="link transition">
                    Trang chủ
                    </Link>
                    <Link
                    underline="hover"
                    color="inherit"
                    href="/"
                    className="link transition"
                    >
                    Sản phẩm
                    </Link>
                    {/* <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography> */}
                </Breadcrumbs>          
            </div>

            <div className="bg-white p-2 mt-4">
                <div className="container flex gap-3">
                    <div className="sidebarWrapper w-[20%] h-full bg-white">
                        <Sidebar/>
                    </div>

                    <div className="rightContent w-[80%] py-3">
                        <div className="bg-slate-400 p-2 w-full mb-4 rounded-md flex items-center justify-between">
                            <div className="coll flex items-center itemViewActions">
                                <Button
                                className={`!w-[40px] !h-[40px] !min-w-[40px] ! rounded-full text-[#000] ${itemView === "list" && 'active'}`}
                                onClick={()=>setItemView('list')}
                                >
                                    <LuMenu className="text-[rgba(0,0,0,0.7)]" /> </Button>
                                <Button
                                className={`!w-[40px] !h-[40px] !min-w-[40px] ! rounded-full text-[#000] ${itemView === "grid" && 'active'}`}
                                onClick={()=>setItemView('grid')}
                                >
                                    <IoGridSharp className="text-[rgba(0,0,0,0.7)]" />
                                </Button>

                                <span className="text-[14px] font-[500] pl-3 text-black">Tìm thấy 27 sản phẩm.</span>

                            </div>

                            <div className="col2 ml-auto flex items-center justify-end">
                                <span className="text-[14px] font-[500] pl-3 text-black">Sắp xếp theo</span>
                                
                                <Button
                                    id="demo-positioned-button"
                                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    className="!bg-white !text-[12px] !text-black !capitalize !border-2 !border-black"
                                >
                                    Giá cao tới thấp
                                </Button>

                                <Menu
                                    id="demo-positioned-menu"
                                    aria-labelledby="demo-positioned-button"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                    }}
                                >
                                    <MenuItem onClick={handleClose} className="!text-[13px] !text-black !capitalize">Khuyến mãi cao tới thấp</MenuItem>
                                    <MenuItem onClick={handleClose} className="!text-[13px] !text-black !capitalize">Sắp xếp theo tên</MenuItem>
                                    <MenuItem onClick={handleClose} className="!text-[13px] !text-black !capitalize">Giá từ cao tới thấp</MenuItem>
                                    <MenuItem onClick={handleClose} className="!text-[13px] !text-black !capitalize">Giá từ thấp tới cao</MenuItem>
                                </Menu>
                            </div>


                        </div>

                        <div className={`grid ${itemView==='grid' ? 'grid-cols-4 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-1'}  gap-4`}>
                        {
                            itemView === 'grid' ? 
                            <>
                                <ProductItem />
                                <ProductItem />
                                <ProductItem />
                                <ProductItem />
                                <ProductItem />
                                <ProductItem />
                                <ProductItem />
                            </>
                            : 
                            <>
                                <ProductItemListView />
                                <ProductItemListView />
                                <ProductItemListView />
                                <ProductItemListView />
                                <ProductItemListView />
                                <ProductItemListView />
                                <ProductItemListView />
                            </>
                        }
                        </div>

                        <div className="flex items-center justify-center mt-5">
                            <Pagination count={10} showFirstButton showLastButton/>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ProductListing;