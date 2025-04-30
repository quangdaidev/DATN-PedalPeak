import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import HomeBanner from '../../Components/HomeBanner';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import {Pagination, Mousewheel, Keyboard  } from 'swiper/modules';
import ProductItem from '../../Components/ProductItem';
import HomeCatSlider from '../../Components/HomeCatSlider';

import {LiaShippingFastSolid} from "react-icons/lia";


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';


import ProductsSlider from '../../Components/ProductsSlider';
import AdsBannerSlider from '../../Components/AdsBannerSlider';

import {fetchDataFromApi} from "../../utils/api";
import { MyContext } from "../../App";
import ProductLoading from '../../Components/ProductLoading';

const Home =()=>{

    const [loading, setLoading] = useState(true);

    const context = useContext(MyContext);

    const [catData, setCatData] = useState([]);
    
    const [catOneProductsData, setCatOneProductsData] = useState([]);


    useEffect(()=>{
        fetchDataFromApi("/api/category").then((res)=>{
            setCatData(res?.data);
        })
        
        // const filterKey="67c5c8c5d0e2d348c2f5b13f";
        // fetchDataFromApi(`/api/products/?category=${filterKey}`).then((item)=>{
            
            // })
    },[])

    const getProductsByCategory = (category) => {
        return context?.productsData.filter((product) => product.catName === category);
      };

    const filterByCatId = (id) => {
        fetchDataFromApi(`/api/product/getAllProductsByCatId/${id}`).then((res)=>{
            if(res?.error === false) {
                setCatOneProductsData(res?.data);
            }
        })
    }

    // useEffect(()=>{
    //     fetchDataFromApi(`/api/product/getAllProductsByCatId/${context?.catData[0]?._id}`).then((res)=>{
    //         if(res?.error === false) {
    //             setCatOneProductsData(res?.data);
    //         }
    //     })
    // },[context?.catData])

    // console.log("lll",catData)
      
    // console.log("pi::",context?.productsData)
 
    const productsDataHot = context?.productsData?.filter(product => product.rating === 5).slice(0, 8);
    const productsDataSale = context?.productsData?.filter(product => product.price !== 0).slice(0, 8);
    const productsDataInStock  = [...context?.productsData].sort((a, b) => b.countInStock - a.countInStock).slice(0, 8);
    const productsDataNew = context?.productsData?.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)).slice(0, 8);
    
    // console.log("hhhhh",productsDataInStock)
    // console.log("ppppppppppp", productsDataHot);
   
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // cuộn trang lên trên
  

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        
        setValue(newValue);
    };

    useEffect(() => {
        // Khi tab có index = 0 được chọn thì mới xử lý loading
        if (value === 0 || value === 1 || value === 2) {
            setLoading(true);
            const timer = setTimeout(() => {
                setLoading(false);
            }, 1000);

            return () => clearTimeout(timer); // clear nếu chuyển tab nhanh
        }
    }, [value]); 


    function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    
    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
    }
      
    function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
    }
      

    return ( 
        <main ClassName="scrollbar">
            <div className="slider mb-14 mt-20">
                <HomeBanner/>
                {/* <img className="bg-cover bg-center " src="/img/products/banner1.jpg"></img>
                <div className="flex space-x-4 pt-4">
                    <div className="w-4/12 drop-shadow-xl">
                    <img className="bg-cover h-full " src="/img/products/banner2.jpg"></img>
                    </div>
                    <div  className="w-4/12 drop-shadow-xl">
                    <img className="bg-cover h-full" src="/img/products/banner3.jpg"></img>
                    </div>
                    <div  className="w-4/12 drop-shadow-xl">
                    <img className="bg-cover h-full" src="/img/products/banner4.jpg"></img>
                    </div>
                </div> */}
            </div>
            {/* End slider */}

            
            { context?.catData?.length!==0 &&  <HomeCatSlider catData={context?.catData}/>}


            <section className="bg-white pt-4">
                <div className="container">
                    <div className="flex items-center justify-between">
                         <div className="leftSec w-[60%]">
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs  value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab className="!text-[16px]" label="Sản phẩm bán chạy" {...a11yProps(0)} />
                                        <Tab className="!text-[16px]" label="Sản phẩm khuyến mãi" {...a11yProps(1)} />
                                        <Tab className="!text-[16px]" label="Sản phẩm đề xuất" {...a11yProps(2)} />
                                        {/* {
                                            context?.catData?.length !==0 && context?.catData?.map((cat, index) => {
                                                return (                                                     
                                                    <Tab className="!text-[16px]" label={cat?.name} onClick={()=>filterByCatId(cat?._id)} {...a11yProps(index+1)} />
                                                )
                                            })
                                        } */}
                                    </Tabs>
                                </Box>
                            </Box>
                        </div>
                        <div className=" rightSec pr-10">
                            <h2 className="text-[20px] font-[600]">Sản phẩm phổ biến</h2>
                            <p className="text-[14px] font-[400]">Đừng bỏ lỡ các ưu đãi hiện tại dành cho tháng 4</p>
                        </div>
                    </div>
                    <CustomTabPanel value={value} index={0}>

                        {
                            loading && <ProductLoading/>
                        }
                       
                        {
                            !loading && productsDataHot?.length !== 0 && <ProductsSlider items={4} data={productsDataHot}/>
                        }

                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>

                        {
                            loading && <ProductLoading/>
                        }
                       
                        
                        {
                            !loading && productsDataSale?.length !== 0 && <ProductsSlider items={4} data={productsDataSale}/>
                        }
                        
                    </CustomTabPanel>
                   
                    <CustomTabPanel value={value} index={2}>

                        {
                            loading && <ProductLoading/>
                        }
                       

                        {
                            !loading && productsDataInStock?.length !== 0 && <ProductsSlider items={4} data={productsDataInStock}/>
                        }

                    </CustomTabPanel>       
                </div>
            </section>


            <section className="my-20 py-14 bg-white">
                <div className="container">
                    <div className="freeShipping w-[80%] m-auto py-4 p-4 border-2 border-[#ff5252] flex items-center justify-between rounded-md">
                        <div className="col1 flex items-center gap-4 mb-5 pt-5">
                            <LiaShippingFastSolid className="text-[50px]" /> 
                            <span className="text-[20px] font-[600] uppercase">Giao hàng miễn phí </span> 
                        </div>
                        <div className="col2">
                            <p className="mb-0 text-[30px] font-[500]">Cho đơn hàng đầu tiên</p>
                        </div>

                        <p> - Hóa đơn trên 2.000.000đ*</p>
                    </div>
                    <AdsBannerSlider items={4} />
                </div>
            </section>

            <section className="bg-white pt-4 mb-20">
                <div className="container">
                    <div className="flex items-center justify-between pl-3">
                        <div className="leftSec py-8 w-[60%]">
                            <div className="ct-sub-headline-label !text-slate-700">Sản phẩm mới</div>
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
                            productsDataNew?.length!==0 && productsDataNew?.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <ProductItem item={item}/>
                                    </SwiperSlide> 
                                )
                            })
                        }
                    </Swiper>
            
                </div>
            </section>
            {/* End products */}

            {
                context?.catData?.length !==0 && context?.catData?.map((cat, index) => {
                    const filteredProducts = getProductsByCategory(cat.name);
                    return (                                                     
                        <section className="bg-white pt-4 mb-20">
                            <div className="container">
                                <div className="flex items-center justify-between pl-3">
                                    <div className="leftSec py-8 w-[60%]">
                                        <div className="ct-sub-headline-label !text-slate-700">{cat.name}</div>
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
                                        filteredProducts?.length!==0 && filteredProducts?.map((item, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <ProductItem item={item}/>
                                                </SwiperSlide> 
                                            )
                                        })
                                    }

                                </Swiper>
                        
                            </div>
                        </section>
                    )
                })
            }


        
          
{/*            
           <section className="bg-white pt-10 mb-20 pb-1">
                <div className="ct-sub-headline">
                    <div className="ct-sub-headline-deco-line "></div>
                    <div className="ct-sub-headline-label !text-slate-700">Câu chuyện thương hiệu</div>
                    <div className="ct-sub-headline-deco-line "></div>
                </div>
                <div className="story flex justify-between items-center gap-4 w-[100%] mx-auto mb-24">
                    <div className="basis-1/2 pl-6">
                        <video autoPlay loop muted className="w-full h-full object-cover">
                        <source src="/video/1793482-hd_1920_1080_30fps.mp4" type="video/mp4"/>
                        Trình duyệt của bạn không hỗ trợ thẻ video.
                        </video>
                    </div>
                
                    <div className="basis-1/2 text-left pr-6">
                        <div className="text-3xl leading-10 mb-6">Hệ thống cửa hàng PedalPeak</div>
                        <div className="text-gray-500 leading-7 mb-6">Hệ thống cửa hàng PedalPeak được thành lập vào năm 2019, 
                        với sứ mệnh mang đến những sản phẩm xe đạp chất lượng cao và dịch vụ tốt nhất cho người tiêu dùng Việt Nam.
                        Kể từ khi ra mắt, PedalPeak đã nhanh chóng phát triển và trở thành một trong những nhà phân phối 
                        xe đạp hàng đầu tại Việt Nam. Với cam kết không ngừng nâng cao chất lượng sản phẩm và dịch vụ, PedalPeak
                        đã xây dựng được lòng tin từ khách hàng và cộng đồng yêu xe đạp khắp cả nước.
                        </div>
                        <div className="">
                        <Link className="text-xl text-blue-800 hover:text-main-600 relative after:absolute after:-bottom-2 after:left-0
                            after:bg-main-50 hover:after:bg-main-200 after:h-0.5 after:w-full after:transition-all after:ease-in-out after:duration-500" href="">Đọc toàn bộ câu chuyện</Link>
                        </div>
                    </div>
                
                </div>
            </section> */}
            {/* End story */}

            <section className="bg-white pt-10 mb-20 ">
                <div className="ct-sub-headline">
                    <div className="ct-sub-headline-deco-line "></div>
                    <div className="ct-sub-headline-label !text-slate-700">Tạp chí PedalPeak</div>
                    <div className="ct-sub-headline-deco-line "></div>
                </div>
                <div className="bike-magazine w-[95%] mx-6 mb-24  pb-10">
                    <div className="flex flex-row justify-center items-center gap-5">
                        <div className="ct-magazine-img basis-1/2 flex flex-row gap-5">
                            <div className="ct-magazine-big-img h-[280px] basis-2/3 bg-[url('../public/img/products/banner6.jpeg')] bg-cover bg-no-repeat bg-center"></div>
                            <div className="ct-magazine-small-img basis-1/3 flex flex-col gap-5">
                                <div className="h-[130px] bg-[url('../public/img/products/banner7.jpeg')] bg-cover bg-no-repeat bg-center"></div>
                                <div className="h-[130px] bg-[url('../public/img/products/banner8.jpeg')] bg-cover bg-no-repeat bg-center"></div>
                            </div>
                        </div>
                        <div className="ct-magazine-post basis-1/2 pl-14">
                            <div className="uppercase tracking-widest text-gray-500 font-medium text-xs mb-4">Ưu đãi cao cấp</div>
                            <div className="text-4xl mb-4">Nhận tạp chí của chúng tôi</div>
                            <div className="text-gray-500 mb-4 leading-7">Hệ thống cửa hàng của PedalPeak được thiết kế hiện đại, với không gian trưng bày rộng rãi, giúp bạn dễ dàng lựa chọn và so sánh các mẫu xe đạp. Đặc biệt, khi mua hàng trực tiếp, bạn còn có thể tham gia vào các sự kiện khuyến mãi và nhận được nhiều ưu đãi hấp dẫn.</div>
                            <div className="ct-button bg-gray-900 text-white w-max">Bắt đầu mua hàng</div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End bike-magazine */}

            <div className="ct-parallax-section h-[500px] bg-[url('../public/img/products/banner5.jpeg')] bg-cover bg-no-repeat bg-center mb-24 bg-fixed w-[99vw] relative left-[calc(-49.5vw+50%)]"></div>
            {/* End parallax */}

            <section className="bg-white pt-10 mb-20 ">
                <div className="ct-sub-headline">
                    <div className="ct-sub-headline-deco-line "></div>
                    <div className="ct-sub-headline-label !text-slate-700">Bài viết hay</div>
                    <div className="ct-sub-headline-deco-line "></div>
                </div>
                <div className="bike-news w-[100%] px-6 mb-24">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="ct-bike-story-card">
                            <div className="h-[300px] bg-[url('../public/img/products/banner9.jpeg')] bg-cover bg-no-repeat bg-center">
                                <Link href="">
                                <div className=" h-full hover:bg-gray-900 hover:bg-opacity-10 hover:transition-all hover:ease-in-out hover:duration-500 relative group">
                                    <div className="absolute bg-white text-gray-900 w-11/12 bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn ct-button">Đọc bài viết</div>
                                </div>
                                </Link>
                            </div>
                            <div className="text-left my-6">
                                <Link href="">
                                <div className="text-xl mb-3 hover:text-blue-900">Top 5 xe đạp thể thao HOT nhất 2025</div>
                                </Link>
                                <div className="text-gray-500 leading-7 mb-3">
                                Cùng PedalPeak điểm qua 5 mẫu xe thể thao phổ biết nhất năm 2025.
                                </div>
                                <div className="text-gray-500 leading-7 uppercase text-[13px] font-semibold tracking-widest">
                                tháng 2, 2025
                                </div>
                            </div>
                        </div>

                        <div className="ct-bike-story-card">
                            <div className="h-[300px] bg-[url('../public/img/products/banner10.jpeg')] bg-cover bg-no-repeat bg-center">
                                <Link href="">
                                <div className=" h-full hover:bg-gray-900 hover:bg-opacity-10 hover:transition-all hover:ease-in-out hover:duration-500 relative group">
                                    <div className="absolute bg-white text-gray-900 w-11/12 bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn ct-button">Đọc bài viết</div>
                                </div>
                                </Link>
                            </div>
                            <div className="text-left my-6">
                                <Link href="">
                                <div className="text-xl mb-3 hover:text-blue-900">Top 5 xe đạp thể thao HOT nhất 2025</div>
                                </Link>
                                <div className="text-gray-500 leading-7 mb-3">
                                Cùng PedalPeak điểm qua 5 mẫu xe thể thao phổ biết nhất năm 2025.
                                </div>
                                <div className="text-gray-500 leading-7 uppercase text-[13px] font-semibold tracking-widest">
                                tháng 2, 2025
                                </div>
                            </div>
                        </div>

                        <div className="ct-bike-story-card">
                            <div className="h-[300px] bg-[url('../public/img/products/banner11.jpeg')] bg-cover bg-no-repeat bg-center">
                                <Link href="">
                                <div className=" h-full hover:bg-gray-900 hover:bg-opacity-10 hover:transition-all hover:ease-in-out hover:duration-500 relative group">
                                    <div className="absolute bg-white text-gray-900 w-11/12 bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn ct-button">Đọc bài viết</div>
                                </div>
                                </Link>
                            </div>
                            <div className="text-left my-6">
                                <Link href="">
                                <div className="text-xl mb-3 hover:text-blue-900">Top 5 xe đạp thể thao HOT nhất 2025</div>
                                </Link>
                                <div className="text-gray-500 leading-7 mb-3">
                                Cùng PedalPeak điểm qua 5 mẫu xe thể thao phổ biết nhất năm 2025.
                                </div>
                                <div className="text-gray-500 leading-7 uppercase text-[13px] font-semibold tracking-widest">
                                tháng 2, 2025
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </section>
            {/* End bike-news */}

            <section className="bg-white pt-10 mb-20 ">
                <div className="ct-sub-headline">
                    <div className="ct-sub-headline-deco-line "></div>
                    <div className="ct-sub-headline-label !text-slate-700">Đăng ký nhận ưu đãi</div>
                    <div className="ct-sub-headline-deco-line "></div>
                </div>
                <div className="subscribe h-[350px] bg-[#1d1f2e] flex flex-col justify-center items-center mb-24">
                    <div className="flex justify-center items-center mb-6">
                        <div className="w-8 h-px bg-gray-500"></div>
                        <div className="uppercase mx-4 tracking-widest text-gray-400 font-bold text-xs text-center">Đăng ký để nhận ưu đãi hấp dẫn</div>
                        <div className="w-8 h-px bg-gray-500"></div>
                    </div>
                    <div className="text-4xl text-white mb-6">Cập nhật PedalPeak</div>
                    <div className="ct-form">
                        <div className="flex justify-center items-center gap-3">
                            <div className="ct-form-item">
                                <input type="email" placeholder="tranquangdai@gmail.com" className="px-6 py-4 w-[350px] bg-inherit border-[1px] border-gray-700 outline-one text-white leading-5 hover:border-gray-300 duration-500 focus:hover:border-gray-300 placeholder:uppercase placeholder:text-xs placeholder:tracking-widest placeholder:font-semibold"/>
                            </div>
                            <div className="ct-form-item">
                                <button type="submit" className="ct-button bg-white text-gray-900 w-max w-max-h-[54px]">Đăng ký</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End subcribe */}
        </main>          
    )
}

export default Home;