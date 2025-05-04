import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './globals.css';
import Home from './Pages/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Verify from './Pages/Verify';
// import ProductDetails from './Pages/ProductDetails';
import Register from './Pages/Register';
import ProductListing from './Pages/ProductListing';
import { ProductDetailsV2 } from './Pages/ProductDetailsV2';
// import axios from 'axios';
import { createContext, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { ProductZoom } from './Components/ProductZoom';
import {IoCloseSharp} from "react-icons/io5"
import { ProductDetailsComponent } from './Components/ProductDetails';

// import toast, { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';
import ForgotPassword from './Pages/ForgotPassword';
import MyList from './Pages/MyList';
import Checkout from './Pages/Checkout';
import MyAccount from './Pages/MyAccount';
import Orders from './Pages/Orders';
import { TestApi } from './Pages/testAPI';
import { fetchDataFromApi, postData } from './utils/api';
import { useNavigate } from 'react-router-dom';
import Address from './Pages/MyAccount/address';
import { OrderSuccess } from './Pages/Orders/success';
import { OrderFailed } from './Pages/Orders/failed';
import SearchPage from './Pages/Search';

const alertBox = (msg, type)=>{
  if(type==="success"){
    toast.success(msg)
  }
  if(type==="error"){
    toast.error(msg)
  }
}

const MyContext = createContext();

function App() {

  const token = localStorage.getItem('accessToken');
  
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
    open: false,
    item:{}
  });
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('lg');
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState([]);

  const [searchData, setSearchData] = useState([]);
  // const apiUrl = import.meta.env.VITE_API_URL;

  const [catData, setCatData] = useState([]);
  const [productsData, setProductsData] = useState([]);

  const [productColorsData, setProductColorsData] = useState([]);

  const [cartData, setCartData] = useState([]);
  const [myListData, setMyListData] = useState([]);


  // const handleClickOpenProductDetailsModal = () => {
  //   setOpenProductDetailsModal(true);
  // };

  const handleOpenProductDetailsModal = (status, item) => {
    setOpenProductDetailsModal({
      open: status,
      item: item
    });
    console.log(" setOpenProductDetailsModal",item)
  };


  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal({
      open: false,
      item: {}
    });
  };

  useEffect(()=>{
    
    const token = localStorage.getItem('accessToken');

    if(token!==undefined && token!==null && token !==""){
      setIsLogin(true);

      fetchDataFromApi(`/api/user/user-details?token=${token}`).then((res)=>{

        if(res.expired?.name==="TokenExpiredError"){
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken"); 

          // openAlertBox("error", "Bạn đã kết thúc phiên, xin đăng nhập lại");

          setIsLogin(false);
        }
        console.log("userData",res);

        setUserData(res.data);
      })

      getCartItems();
      getMyListData();

    }else{
      setIsLogin(false);
    }
  },[isLogin])

  const openAlertBox=(status, msg)=>{
    if(status==="success"){
      toast.success(msg)
    }
    if(status==="error"){
      toast.error(msg)
    }
  }

  const getCartItems=()=>{
    fetchDataFromApi(`/api/cart/get?token=${token}`).then((res)=>{
      if(res?.error===false){
     
        setCartData(res?.data)
        console.log("cartData1",res?.data)
        setProductColorsData(res?.data.map(item => ({ _id: item._id, color: item.color })));
        
      }
    })
  }

  useEffect(()=>{
    fetchDataFromApi("/api/category").then((res)=>{
      setCatData(res?.data.filter(category => category.status === true));
    });
    fetchDataFromApi("/api/product/getAllProducts").then((res)=>{
      console.log("po::",res.data)
      setProductsData(res?.data.filter(product => product.status === true));
    })

  },[])

  const addToCart=(product, userId, quantity)=>{

    if(userId === undefined){
      openAlertBox("error", "Bạn cần đăng nhập");
      return false;
    }

    const data={
      productTitle: product?.name !== undefined ? product?.name : product?.productTitle, 
      image: product?.images !== undefined ? product?.images[0] : product?.image,
      price:product?.price !==0 ? product?.price : product?.oldPrice,
      color: product?.color,
      quantity: quantity,
      subTotal:parseInt(product?.price !==0 ? product?.price*quantity : product?.oldPrice*quantity),
      productId: product?._id,
      userId:userId,
      reviews: product?.reviews
    };


    postData(`/api/cart/add?token=${token}`, data).then((res)=>{
      if(res?.error===false){
       
        openAlertBox("success", res?.message)

        getCartItems();

      }else{
        openAlertBox("error", res?.message)
      }
    })
    // console.log("addToCart:::",data,userId)
  }
  
  // console.log("set:::",productColorsData)

  

  const getMyListData=()=>{
    fetchDataFromApi(`/api/myList?token=${token}`).then((res)=>{
      if(res?.error===false){
        setMyListData(res?.data)
        // console.log("myListData",res?.data)
      }
    })
  }    

  const values = {
    setOpenProductDetailsModal,
    handleOpenProductDetailsModal,
    openAlertBox,
    isLogin,
    setIsLogin,
    alertBox,
    setUserData,
    userData,
    address,
    setAddress,
    setCatData,
    catData,
    setProductsData,
    productsData,
    addToCart,
    cartData,
    setCartData,
    productColorsData,
    myListData,
    setMyListData,
    getMyListData,
    getCartItems,
    setSearchData,
    searchData
  }

  return (
    <>
      <div id="root" className="content-wrapper font-Karla max-w-screen-2xl text-base mx-auto px-8">
        <BrowserRouter>
          <MyContext.Provider value={values}>
            {/* <ReduxProviders> */}
            {/* biến toàn cục ảnh hưởng header, children, footer */}
            {/* <SearchProvider>  */}
            <Header />
            <Routes>
              <Route path="/test-api" exact={true} element={<TestApi/>} />
              <Route path="/" exact={true} element={<Home/>} />
              <Route path="/products" exact={true} element={<ProductListing/>} />
              <Route path="/login" exact={true} element={<Login/>} />
              <Route path="/verify" exact={true} element={<Verify/>} />
              <Route path="/forgot-password" exact={true} element={<ForgotPassword/>} />
              <Route path="/my-list" exact={true} element={<MyList/>} />
              <Route path="/register" exact={true} element={<Register/>} />
              <Route path="/product/:id" exact={true} element={<ProductDetailsV2/>} />
              <Route path="/checkout" exact={true} element={<Checkout/>} />
              <Route path="/my-account" exact={true} element={<MyAccount/>} />
              <Route path="/my-orders" exact={true} element={<Orders/>} />
              <Route path="/order/success" exact={true} element={<OrderSuccess/>} />
              <Route path="/order/failed" exact={true} element={<OrderFailed/>} />
              <Route path="/address" exact={true} element={<Address/>} />
              <Route path="/search" exact={true} element={<SearchPage/>} />
            </Routes>
            <Footer />
              {/* {children} */}

              {/* <div className="bg-white pt-8 pb-1">
                <div className="content-wrapper font-Karla max-w-screen-2xl text-base mx-auto px-8">
                  <Footer />
                </div> 
              </div>   */}
              {/* </SearchProvider> */}
              {/* </ReduxProviders> */}
        
            <ToastContainer theme="colored"/>
            {/* <Toaster position="top-right"/> */}

            <Dialog
              fullWidth={fullWidth}
              maxWidth={maxWidth}
              open={openProductDetailsModal.open}
              onClose={handleCloseProductDetailsModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className="productDetailsModal"
            >

              <DialogContent>         
                <div className="flex items-center w-full productDetailsModalContainer relative"> 
                  <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]
                  !absolute top-[15px] right-[15px] !bg-slate-200" onClick={handleCloseProductDetailsModal}
                  >
                    <IoCloseSharp className="text-[20px]"/>
                  </Button>

                  {
                    openProductDetailsModal?.item?.length!==0 && 
                    <>
                      <div className="col1 w-[40%] px-3">
                        <ProductZoom images={openProductDetailsModal?.item?.images}/>
                      </div>

                      <div className="col2 w-[60%] py-8 px-16 pr-16 productContent">
                        <ProductDetailsComponent item={openProductDetailsModal?.item}/>
                      </div>
                    </>
                  }
                
                </div>
              </DialogContent>
            </Dialog>
          </MyContext.Provider>
        </BrowserRouter>
      </div>
    </>          
  );
}

export default App;

export {MyContext}
