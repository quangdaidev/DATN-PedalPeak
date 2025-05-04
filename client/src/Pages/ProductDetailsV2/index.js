import React, {useEffect, useRef, useState} from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { ProductZoom } from '../../Components/ProductZoom';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import {Pagination, Mousewheel, Keyboard  } from 'swiper/modules';
import ProductItem from '../../Components/ProductItem';
import { ProductDetailsComponent } from '../../Components/ProductDetails';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import { Reviews } from './reviews';

export const ProductDetailsV2 = () => {

    const {id} = useParams();

    const [activeTab, setActiveTab] = useState(0);
    const [productData, setProductData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const [reviewsCount, setReviewsCount] = useState(0);

    const [relatedProductData, setRelatedProductData] = useState([]);

    const reviewSec = useRef();

    useEffect(()=>{
    
        fetchDataFromApi(`/api/user/getReviews?productId=${id}`).then((res) => {
            if (res?.error === false){
                // console.log("getReviews::",res.data)
                setReviewsCount(res?.data.length)
            }
        })
    },[reviewsCount])

    useEffect(()=>{
        window.scrollTo(0,0);
        setIsLoading(true);
        fetchDataFromApi(`/api/product/${id}`).then((res)=>{
            if(res?.error===false){
                setProductData(res?.data)

                console.log("gggg",res.data)
                
                fetchDataFromApi(`/api/product/getAllProductsByCatId/${res?.data?.catId}`).then((res)=>{
                    if(res?.error === false){
                        const filteredData = res?.data?.filter((item)=>item.id !== id);
                        setRelatedProductData(filteredData)
                    }
                })
                setTimeout(() => {
                    setIsLoading(false);                
                }, 1000);
            }
        })

    },[id])

    const gotoReviews = ()=>{
        window.scrollTo({
            top:reviewSec?.current.offsetTop-130,
            behavior: 'smooth',
        })
        // alert(reviewSec?.current.offsetTop)
        setActiveTab(2)
    }

    return (
        <>
            <div className="py-5 mt-[120px]">
                <div className="container">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/" className="link transition !text-[14px]">
                        Trang chủ
                        </Link>
                        <Link
                        underline="hover"
                        color="inherit"
                        href="/"
                        className="link transition !text-[14px]"
                        >
                        {productData?.catName}
                        </Link>
                        <Link
                        underline="hover"
                        color="inherit"
                        href="/"
                        className="link transition !text-[14px]"
                        >
                        {productData?.name}
                        </Link>
                        {/* <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography> */}
                    </Breadcrumbs>          
                </div>
            </div>

            <section className="bg-white py-5 mb-10">
            {
                isLoading === true ?
                <div className="flex items-center justify-center min-h-[300px]">
                    <CircularProgress/>
                </div>
                :
                <>
                    <div className="container flex gap-8 items-center mt-5">
                        <div className="productZoomContainer w-[40%]">
                            <ProductZoom images={productData?.images}/>
                        </div>

                        <div className="productContent w-[60%] pr-10 pl-10 ">
                            <ProductDetailsComponent item={productData} reviewsCount={reviewsCount}
                                gotoReviews={gotoReviews}/>        
                        </div>
                    </div>

                    <div className="container pt-10">
                        <div className="flex items-center gap-8 mb-5 px-8">
                            <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab===0 && 'text-primary-600'}`}
                            onClick={()=>setActiveTab(0)}>Mô tả sản phẩm</span>
                            <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab===1 && 'text-primary-600'}`}
                            onClick={()=>setActiveTab(1)}>Thông số kỹ thuật</span>
                            <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab===2 && 'text-primary-600'}`}
                            onClick={()=>setActiveTab(2)} ref={reviewSec}>Bình luận ({reviewsCount})</span>
                        </div>
                        
                        {
                            activeTab===0 && (
                                <div className="shadow-md w-full py-5 px-8 rounded-md">
                                    
                                    <h2>{productData?.name}</h2>
                                    <p>{productData?.description}</p>
                                    
                                    {/* <h2>Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C</h2>
                                    <p>Xe Đạp Đường Phố Fixed Gear là lựa chọn hoàn hảo cho những tín đồ đam mê khám phá địa hình. 
                                    Được trang bị hệ thống phanh đĩa cơ an toàn và bộ truyền động Shimano chính xác mang đến khả năng vận hành êm ái và ổn định trong những cuộc hành trình, từ những con dốc hiểm trở đến những địa hình gồ ghề đầy thách thức..</p>
                                    <h2>1. Khung Xe Chắc Chắn, Vững Mãi Trên Mọi Địa Hình</h2>
                                    <p>1. Khung Xe Chắc Chắn, Vững Mãi Trên Mọi Địa Hình
                                    Với khung Max Bike STL 24, chiếc xe đảm bảo tính bền bỉ và khả năng chịu lực tuyệt vời, giúp người lái tự tin vượt qua các địa hình hiểm trở. Khung xe được thiết kế vững chắc nhưng vẫn đủ nhẹ để bạn
                                    dễ dàng kiểm soát trong những chuyến đi dài.</p> */}
                                </div>
                        )}

                        {
                            activeTab===1 && (     
                                <div className="shadow-md w-full py-5 px-8 rounded-md">                   
                                    <div className="relative overflow-x-auto">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                    Kích cỡ/Sizes
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                    Màu sắc/Colors
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                    Chất liệu khung/Frame	
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Price
                                                    </th>
                                                </tr>
                                            </thead> */}
                                            <tbody>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    Kích cỡ/Sizes
                                                    </th>
                                                    <td className="px-6 py-4">
                                                    One Size
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    Màu sắc/Colors</th>
                                                    <td className="px-6 py-4">
                                                    {productData?.color?.map(c => c.name).join(", ")}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    Chất liệu khung/Frame</th>
                                                    <td className="px-6 py-4">
                                                    Max Bike STL 24
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    Phuộc/Fork</th>
                                                    <td className="px-6 py-4">
                                                    Max Bike STL 24
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    Vành xe/Rims</th>
                                                    <td className="px-6 py-4">
                                                    ALU, Double Wall, 36H, Schrader valve
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    Đùm/Hubs</th>
                                                    <td className="px-6 py-4">
                                                    N/A
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    Lốp xe/Tires</th>
                                                    <td className="px-6 py-4">
                                                    24x2.125
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        }


                        {
                            activeTab===2 && (
                                <div className="shadow-md w-[80%] py-5 px-8 rounded-md">
                                    {
                                        productData?.length!==0 && <Reviews productId={productData?._id}
                                        setReviewsCount={setReviewsCount}/>
                                    }
                                </div>
                            )
                        }                                 
                    </div>

                    {
                        relatedProductData?.length !== 0 &&
                        <div className="container mt-5">
                            <div className="flex items-center justify-between pl-3">
                                <div className="leftSec py-8 w-[60%]">
                                    <div className="ct-sub-headline-label !text-slate-700">Có thể bạn muốn xem</div>
                                </div>
                                <div className=" rightSec pr-6">
                                    <Button variant="contained" className="!bg-slate-700" disableElevation>
                                        Xem thêm
                                    </Button>
                                </div>
                            </div>
                             <Swiper
                                slidesPerView={4}
                                spaceBetween={30}
                                pagination={{
                                clickable: true,
                                }}
                                mousewheel={true}
                                keyboard={true}
                                modules={[Pagination, Mousewheel, Keyboard]}
                                className="mySwiper !px-6"
                            >
                                {
                                    relatedProductData.map((item, index) => {
                                        return (
                                            <SwiperSlide key={index}>
                                                <ProductItem item={item}/>
                                            </SwiperSlide> 
                                        )
                                    })
                                }

                            </Swiper>   
                        </div>
                    }

                   
                </>
            }           
           </section>
        </>
    )
}
