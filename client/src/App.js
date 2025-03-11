import React from 'react';
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

import toast, { Toaster } from 'react-hot-toast';
import ForgotPassword from './Pages/ForgotPassword';
import MyList from './Pages/MyList';
import Checkout from './Pages/Checkout';
import MyAccount from './Pages/MyAccount';

const MyContext = createContext();

function App() {
  
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('lg');
  const [isLogin, setIsLogin] = useState(true);


  // const handleClickOpenProductDetailsModal = () => {
  //   setOpenProductDetailsModal(true);
  // };

  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal(false);
  };

  const openAlertBox=(status, msg)=>{
    if(status==="success"){
      toast.success(msg)
    }
    if(status==="error"){
      toast.error(msg)
    }
  }

  const values = {
    setOpenProductDetailsModal,
    openAlertBox,
    isLogin,
    setIsLogin
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
              <Route path="/" exact={true} element={<Home/>} />
              <Route path="/productListing" exact={true} element={<ProductListing/>} />
              <Route path="/login" exact={true} element={<Login/>} />
              <Route path="/verify" exact={true} element={<Verify/>} />
              <Route path="/forgot-password" exact={true} element={<ForgotPassword/>} />
              <Route path="/myList" exact={true} element={<MyList/>} />
              <Route path="/register" exact={true} element={<Register/>} />
              <Route path="/product/:id" exact={true} element={<ProductDetailsV2/>} />
              <Route path="/checkout" exact={true} element={<Checkout/>} />
              <Route path="/my-account" exact={true} element={<MyAccount/>} />
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
          </MyContext.Provider>
        </BrowserRouter>
      </div>
      
      <Toaster/>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openProductDetailsModal}
        onClose={handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="productDetailsModal"
      >

        <DialogContent>         
          <div className="flex items-center w-full productDetailsModalContainer relative"> 
            <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]
            !absolute top-[15px] right-[15px] !bg-slate-200" onClick={handleCloseProductDetailsModal}
            ><IoCloseSharp className="text-[20px]"/></Button>
            <div className="col1 w-[40%] px-3">
              <ProductZoom/>
            </div>

            <div className="col2 w-[60%] py-8 px-16 pr-16 productContent">
              <ProductDetailsComponent/>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>          
  );
}

export default App;

export {MyContext}
