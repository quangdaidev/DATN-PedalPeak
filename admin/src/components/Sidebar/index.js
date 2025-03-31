import Button from '@mui/material/Button';
import { MdDashboard } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import { FaProductHunt } from "react-icons/fa";
// import { FaCartArrowDown } from "react-icons/fa6";
// import { MdMessage } from "react-icons/md";
// import { FaBell } from "react-icons/fa6";
// import { IoIosSettings } from "react-icons/io";
import { Link, useNavigate  } from 'react-router-dom';
import { useContext, useState } from 'react';
import { IoMdLogOut } from "react-icons/io";
import { MyContext } from '../../App';
// import { FaUser } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { fetchDataFromApi } from '../../utils/api';



const Sidebar = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

    const context = useContext(MyContext);

    const isOpenSubmenu = (index) => {
        setActiveTab(index);
        setIsToggleSubmenu(!isToggleSubmenu)
    }

    const [acAnchorEl, setAcAnchorEl] = useState(null);
    const history = useNavigate();

    const logout=()=>{
        setAcAnchorEl(null);

        fetchDataFromApi(`/api/user/logout?token=${localStorage.getItem('accessToken')}`,{withCredentials: true}).then((res)=>{
            console.log("logout",res);
            if(res?.error === false){
                context.setIsLogin(false);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken"); 
                history("/")
            }
        })
    }


    return (
        <>
            <div className="sidebar">
                <ul>
                    <li>
                        <Link to="/">
                            <Button className={`w-100 ${activeTab === 0 ? 'active' : ''}`} onClick={() => isOpenSubmenu(0)}>
                                <span className='icon'><MdDashboard /></span>
                                Tổng quan
                              
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 1 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(1)}>
                            <span className='icon'><FaProductHunt /></span>
                            Sản phẩm
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 1 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li><Link to="/products">Danh sách</Link></li>
                                <li><Link to="/product/upload">Tạo mới</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab === 2 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(2)}>
                            <span className='icon'> <BiSolidCategoryAlt /></span>
                            Danh mục
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab === 2 && isToggleSubmenu === true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li><Link to="/category">Danh sách</Link></li>
                                <li><Link to="/category/add">Tạo mới</Link></li>
                            </ul>
                        </div>
                    </li>
                </ul>


                <br />

                <div className='logoutWrapper'>
                    <div className='logoutBox'>
                        <Button onClick={logout} variant="contained"><IoMdLogOut /> Đăng xuất</Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Sidebar;