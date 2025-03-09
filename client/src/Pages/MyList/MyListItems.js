import React, { useState } from "react"; 
import { Link } from "react-router-dom"; 
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem"; 
import { GoTriangleDown } from "react-icons/go"; 
import Rating from "@mui/material/Rating"; 
import { IoCloseSharp } from "react-icons/io5";

const MyListItems = (props) => {
    const [sizeanchorEl, setSizeAnchorEl] = useState(null); 
    const [selectedSize, setCartItems]   = useState(props.size);
    const openSize = Boolean(sizeanchorEl);
  
    const [qtyanchorEl, setQtyAnchorEl] = useState(null); 
    const [selectedQty, setSelectedQty] = useState(props.qty); 
    const openQty = Boolean (qtyanchorEl);
   
    const handleClickSize = (event) => { 
        setSizeAnchorEl(event.currentTarget);
    };

    const handleCloseSize = (value) => {
        setSizeAnchorEl(null);
        if(value !== null) {
            setCartItems(value);
        }
    };

    return (
        <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-black" >
            <div className="img w-[15%] rounded-md overflow-hidden">
                <Link to="/product/7845" className="group">
                    <img
                        alt="" src="https://res.cloudinary.com/dkgonwhvj/image/upload/v1731424620/1731424618079_fytc"
                        className="w-full group-hover:scale-105 transition-all"
                    />
                </Link> 
            </div>

            <div className="info w-[85%] relative">
                <IoCloseSharp className="cursor-pointer absolute top-[0px] right-[0px] text-[22px] link"/>
                <span className="text-[13px]">Sangria</span>
                <h3 className="text-[15px]">
                    <Link className="link">A-line Kurti With Sharara & Dupatta</Link>
                </h3>
                <Rating name="size-small" defaultValue={4} size="small" readOnly/>

                <div className="flex items-center gap-4 mt-2">
                    <div className="relative">
                        <span
                            className="flex items-center justify-center bg-slate-200 text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer" 
                            onClick={handleClickSize}
                        >
                            Size: {selectedSize} <GoTriangleDown />
                        </span>

                        <Menu
                            id="size-menu"
                            anchorEl={sizeanchorEl}
                            open={openSize}
                            onClose={() => handleCloseSize(null)} 
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem onClick={() => handleClickSize("S")}>S</MenuItem>
                            <MenuItem onClick={() => handleClickSize("M")}>M</MenuItem>
                            <MenuItem onClick={() => handleClickSize("L")}>L</MenuItem>
                            <MenuItem onClick={() => handleClickSize("S")}>S</MenuItem>
                        </Menu>
                    </div>

                    {/* <div className="relative">
                        <span className="flex items-center justify-center bg-slate-200 text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer"
                            onClick={handleClickQty}
                        >
                            Qty: {selectedQty} <GoTriangleDown/>
                        </span>

                        <Menu
                            id="size-menu"
                            anchorEl={sizeanchorEl}
                            open={openQty}
                            onClose={() => handleCloseQty(null)} 
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem onClick={() => handleCloseQty("1")}>1</MenuItem>
                            <MenuItem onClick={() => handleCloseQty("1")}>1</MenuItem>
                            <MenuItem onClick={() => handleCloseQty("1")}>1</MenuItem>
                        </Menu>
                    </div> */}
                </div>
                <div className="flex items-center gap-4 mt-2">
                    <span className="price text-[14px] font-[600]">$58.00</span>

                    <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                    $58.00 
                    </span>

                    <span className="price text-primary-600 text-[14px] font-[600]">
                    55% OFF
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MyListItems;



        
    
