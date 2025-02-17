
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { MdCloseFullscreen } from "react-icons/md";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import SearchBox from './SearchBox';

import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';

// import Tooltip from '@mui/material/Tooltip';
// import IconButton from '@mui/material/IconButton';


const Header =()=>{
    const [open, setOpen] = useState(false);

    return (
        <> 
            <div className="bg-white fixed top-0 left-0 z-50 w-full">
                <div className="content-wrapper font-custom max-w-screen-2xl text-base mx-auto px-8">  
                    <header className="py-6">
                        <nav className="flex flex-row justify-between items-center relative">
                            <div className="logo basis-2/12  text-xl font-semibold cursor-pointer">
                            PedalPeak 
                            </div>

                            <ul className="nav basis-5/12 flex items-center justify-center gap-8 uppercase text-sm text-gray-500">
                                <li className="ct-top-menu-item">
                                    <Link to="/" className="">Trang chủ</Link>
                                </li>
                                <li className="ct-top-menu-item group">
                                    <Link to="/sanpham" className="">Sản phẩm</Link>

                                    <div className="submenu absolute top-[100%] left-[0%] min-w-[200px] bg-white shadow-lg">
                                        <ul className=" hidden group-hover:block font">
                                            <li className="block ">
                                                <Link className="" to="/">
                                                    <Button className="!text-gray-500 w-full !text-left !justify-start !rounded-none button-lv1">San pham 1</Button>
                                                </Link>
                                            </li>
                                            <li className="block relative">
                                                <Link to="/">
                                                    <Button className="!text-gray-500 w-full !text-left !justify-start !rounded-none button-lv1">San pham 2</Button>
                                                    <div className="submenu absolute top-[100%] left-[0%] min-w-[200px] bg-white shadow-lg transition-all">
                                                    <ul className="t">
                                                        <li className="">
                                                            <Link to="/">
                                                                <Button className="!text-gray-500 w-full !text-left !justify-start !rounded-none">San pham 1</Button>
                                                            </Link>
                                                        </li>
                                                        <li className="relative">
                                                            <Link to="/">
                                                                <Button className="!text-gray-500 w-full !text-left !justify-start !rounded-none">San pham 2</Button>
                                                                
                                                            </Link>
                                                        </li>
                                                        <li className="">
                                                            <Link to="/">
                                                                <Button className="!text-gray-500 w-full !text-left !justify-start !rounded-none">San pham 1</Button>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                </Link>
                                            </li>
                                            <li className="block">
                                                <Link to="/">
                                                    <Button className="!text-gray-500 w-full !text-left !justify-start !rounded-none button-lv1">San pham 1</Button>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="ct-top-menu-item">
                                    <Link to="" className="">Bài viết</Link>
                                </li>
                                <li className="ct-top-menu-item">
                                    <Link to="" className="">Về chúng tôi</Link>
                                </li>
                                <li className="ct-top-menu-item">
                                    <Link to="" className="">Liên hệ</Link>
                                </li>
                            </ul>      
                            <div className="basis-2/12 flex items-center space-x-4">
                                <SearchBox/>
                            </div>  

                            <ul className=" nav basis-3/12 flex justify-end gap-8 items-center ml-16 text-sm text-gray-500">
                                <li className="ct-top-menu-item relative group">  
                                    <div>
                                        <Badge badgeContent={4} color="primary">
                                            <FaUser className="ct-icon" />
                                        </Badge> 
                                        <span className="uppercase mx-2">
                                            Tài khoản
                                        </span>                  
                                        <ul className=" nav hidden group-hover:block">
                                            <div className="submenu absolute top-[100%] left-[0%] min-w-[150px] bg-white shadow-lg">
                                                <li className="block"><Link to="/register"><Button className="!text-gray-500 button-lv1 w-full !text-left !justify-start !rounded-none ">Đăng ký</Button></Link></li>
                                                <li className="block"><Link to="/login"><Button className="!text-gray-500 button-lv1 w-full !text-left !justify-start !rounded-none ">Đăng nhập</Button></Link></li>
                                            </div>
                                        </ul>

                                    </div>
                                {/* {user? (<div>
                                        <UserIcon className="ct-icon" />
                                            Xin chào, {user[Object.keys(user)[2]]}                       
                                        <ul className="absolute top-7 left-0 hidden w-40 bg-white shadow-lg group-hover:block">
                                            <li className="block p-2 text-gray-500 hover:text-white hover:bg-gray-400"><button type="submit" onClick={handleLogout}>Đăng xuất</button></li>
                                            <li className="block p-2 text-gray-500 hover:text-white hover:bg-gray-400"><Link to="/info">Thông tin tài khoản</Link></li>
                                        </ul>
                                    </div>) :
                                    
                                    (<div>
                                        <UserIcon className="ct-icon" />
                                        Tài khoản                        
                                        <ul className="absolute top-7 left-0 hidden w-48 bg-white shadow-lg group-hover:block">
                                            <li className="block p-2 text-gray-500 hover:text-white hover:bg-gray-400"><Link to="/dang-ky">Đăng ký</Link></li>
                                            <li className="block p-2 text-gray-500 hover:text-white hover:bg-gray-400"><Link to="/dang-nhap">Đăng nhập</Link></li>
                                        </ul>
                                    </div>)} */}
                                </li>
                                
                                <li className="ct-top-menu-item">
                                    <button type="button" onClick={() => { console.log("Button clicked, opening dialog...");setOpen(true)}} className="flex items-center justify-center">
                                    {/* <IconButton color="primary"> */}
                                        {/* <Tooltip title="GIỎ HÀNG" placement="bottom-start"> */}
                                            <Badge badgeContent={4} color="primary">
                                                {/* <MailIcon color="action" /> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ct-icon">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                </svg>
                                            </Badge> 
                                        {/* </Tooltip> */}
                                    {/* </IconButton> */}
                                        <span className="uppercase mx-2">
                                            Giỏ hàng
                                        </span>
                                        {/* <span className="ct-badge-circle bg-orange-400 text-white">
                                            2
                                        </span>     */}
                                    </button>
                                </li>
                            </ul>
                            {/* <div className="basis-1/6 lg:hidden flex items-center cursor-pointer px-2 sm:px-4">
                                <svg id="ct" onClick={MyComponent} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ct-icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </div> */}
                        </nav>

                        {/* Cart Start */}
                                    
                        <Dialog open={open} onClose={setOpen} className="relative z-50">
                                <DialogBackdrop
                                    transition
                                    className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
                                />

                                <div className="fixed inset-0 overflow-hidden">
                                    <div className="absolute inset-0 overflow-hidden">
                                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                            <DialogPanel
                                            transition
                                            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                                            >
                                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                                        <div className="flex items-start justify-between">
                                                            <DialogTitle className="text-lg font-medium text-gray-900">GIỎ HÀNG</DialogTitle>
                                                            <div className="ml-3 flex h-7 items-center">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setOpen(false)}
                                                                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                                    >
                                                                    <span className="absolute -inset-0.5" />
                                                                    <span className="sr-only">Đóng bảng điều khiển</span>
                                                                    <MdCloseFullscreen aria-hidden="true" className="size-6" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="mt-8">
                                                            <div className="flow-root">
                                                                <ul className="-my-6 divide-y divide-gray-200">
                                                                        <li className="flex py-6">
                                                                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                                <div  style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[96px] bg-contain bg-no-repeat" ></div>
                                                                            </div>

                                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                                <div>
                                                                                    <div className="flex justify-between text-base font-medium text-gray-700">
                                                                                        <h3>
                                                                                            Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C
                                                                                        </h3>
                                                                                        <p className="ml-4">6.990.000đ</p>
                                                                                    </div>
                                                                                    <br></br>
                                                                                    {/* <p className="mt-1 text-sm text-gray-500">Đen</p> */}
                                                                                </div>
                                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                                    {/* <span className="text-gray-500">Số lượng: </span><input type="number" min={1} defaultValue={item.quantity}  className='max-w-14 border p-2 rounded mt-4' 
                                                                                    onChange={(e:any) => dispatch(updateQuantity({ item: item, quantity:Number(e.target.defaultValue)}))}
                                                                        
                                                                                    />  */}
                                                                                <div className="flex items-center space-x-2">
                                                                                    <button
                                                                                        className="px-2 py-1 bg-gray-300 rounded"
                                                                                    >
                                                                                        -
                                                                                    </button>
                                                                                    <span>1</span>
                                                                                    <button                                                                          
                                                                                        className="px-2 py-1 bg-gray-300 rounded"
                                                                                    >
                                                                                        +
                                                                                    </button>
                                                                                </div>
                                                                                
                                                                                    <div className="flex">
                                                                                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                                            Xóa
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>                                                            
                                                                        </li>
                                                                        <li className="flex py-6">
                                                                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                                <div  style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[96px] bg-contain bg-no-repeat" ></div>
                                                                            </div>

                                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                                <div>
                                                                                    <div className="flex justify-between text-base font-medium text-gray-700">
                                                                                        <h3>
                                                                                            Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C
                                                                                        </h3>
                                                                                        <p className="ml-4">6.990.000đ</p>
                                                                                    </div>
                                                                                    <br></br>
                                                                                    {/* <p className="mt-1 text-sm text-gray-500">Đen</p> */}
                                                                                </div>
                                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                                    {/* <span className="text-gray-500">Số lượng: </span><input type="number" min={1} defaultValue={item.quantity}  className='max-w-14 border p-2 rounded mt-4' 
                                                                                    onChange={(e:any) => dispatch(updateQuantity({ item: item, quantity:Number(e.target.defaultValue)}))}
                                                                        
                                                                                    />  */}
                                                                                <div className="flex items-center space-x-2">
                                                                                    <button
                                                                                        className="px-2 py-1 bg-gray-300 rounded"
                                                                                    >
                                                                                        -
                                                                                    </button>
                                                                                    <span>1</span>
                                                                                    <button                                                                          
                                                                                        className="px-2 py-1 bg-gray-300 rounded"
                                                                                    >
                                                                                        +
                                                                                    </button>
                                                                                </div>
                                                                                
                                                                                    <div className="flex">
                                                                                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                                            Xóa
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>                                                            
                                                                        </li>
                                                                    <div className="flex">
                                                                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                            Xóa tất cả
                                                                        </button>
                                                                    </div>
                                                                </ul>                                                                                        
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <p>Tổng tiền</p>
                                                            <p>13.980.000đ</p>
                                                        </div>
                                                        <p className="mt-0.5 text-sm text-gray-500">Vận chuyển và thuế được tính khi thanh toán.</p>
                                                        <div>
                                                            <div className="mt-6">
                                                                <Link to="#"
                                                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                                >
                                                                    Thanh toán
                                                                </Link>
                                                            </div>
                                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                                <p>
                                                                hoặc{' '}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setOpen(false)}
                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                >
                                                                Tiếp tục mua hàng
                                                                    <span aria-hidden="true"> &rarr;</span>
                                                                </button>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </DialogPanel>
                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                        {/* Cart End */}
                    </header>
                </div> 
            </div>                                                                             
        </>
    )
}

export default Header;