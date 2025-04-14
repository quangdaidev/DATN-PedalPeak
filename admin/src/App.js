import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./responsive.css";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { createContext, useEffect, useState } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import ProductUpload from "./pages/ProductUpload";
import CategoryAdd from "./pages/CategoryAdd";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import { fetchDataFromApi } from "./utils/api";
import { ToastContainer, toast } from 'react-toastify';
import ProductEdit from "./pages/ProductEdit";

const MyContext = createContext();

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isHideSidebarAndHeader, setisHideSidebarAndHeader] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const [alertBox, setAlertBox] = useState({
    msg:'',
    error:false,
    open:false
  })

  // Lắng nghe sự kiện storage khi có thay đổi localStorage
  window.addEventListener("storage", (event) => {
    if (event.origin === "http://localhost:3000") {
      console.log("Received data from localStorage:", event.newValue);
    }
  });

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openNav = () => {
    setIsOpenNav(true);
  };
  
  const openAlertBox=(status, msg)=>{
    if(status==="success"){
      toast.success(msg)
    }
    if(status==="error"){
      toast.error(msg)
    }
  }

  const [userData, setUserData] = useState(null);

  useEffect(()=>{
      
    const token = localStorage.getItem('accessToken');
  
    if(token!==undefined || token!==null || token !==""){
      setIsLogin(true);

      fetchDataFromApi(`/api/user/user-details?token=${token}`).then((res)=>{

        if(res.expired?.name==="TokenExpiredError"){
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken"); 

          openAlertBox("error", "Bạn đã kết thúc phiên, xin đăng nhập lại");

          setIsLogin(false);
        }
        console.log("app.js",res);

        setUserData(res.data);
        // console.log("userData::",res.data)
      })
    }else{
      setIsLogin(false);
    }
  },[isLogin])

  useEffect(()=>{
    const token = localStorage.getItem('accessToken');
  
    if(token!==undefined || token!==null || token !==""){
      setIsLogin(true);
    }else{
        window.location.href = "/login"
    }
  },[])

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setisHideSidebarAndHeader,
    theme,
    setTheme,
    windowWidth,
    openNav,
    isOpenNav,
    setIsOpenNav,
    alertBox,
    setAlertBox,
    openAlertBox,
    userData,
    setUserData
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {isHideSidebarAndHeader !== true && <Header />}

        <div className="main d-flex">
          {isHideSidebarAndHeader !== true && (
            <>
            <div className={`sidebarOverlay d-none ${isOpenNav===true && 'show'}`} onClick={()=>setIsOpenNav(false)}></div>
              <div
                className={`sidebarWrapper ${
                  isToggleSidebar === true ? "toggle" : ""
                } ${isOpenNav === true ? "open" : ""}`}
              >
                <Sidebar />
              </div>
            </>
          )}

          <div
            className={`content ${isHideSidebarAndHeader === true && "full"} ${
              isToggleSidebar === true ? "toggle" : ""
            }`}
          >
            <Routes>
              <Route path="/" exact={true} element={<Login />} />
              <Route path="/dashboard" exact={true} element={<Dashboard />} />
              <Route path="/login" exact={true} element={<Login />} />
              <Route path="/signUp" exact={true} element={<SignUp />} />
              <Route path="/products" exact={true} element={<Products />} />
              <Route path="/product/details/:id" exact={true} element={<ProductDetails />}/>
              <Route path="/product/upload" exact={true} element={<ProductUpload />} />
              <Route path="/product/:id" exact={true} element={<ProductEdit />} />
              <Route path="/category/add" exact={true} element={<CategoryAdd />} />
              <Route path="/category" exact={true} element={<Categories />} />
              <Route path="/orders" exact={true} element={<Orders />} />
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
      <ToastContainer theme="colored"/>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
