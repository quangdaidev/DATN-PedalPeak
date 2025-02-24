import React from 'react';
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


import ProductsSlider from '../../Components/ProductsSlider';
import AdsBannerSlider from '../../Components/AdsBannerSlider';


const Home =()=>{

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

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
        <main>
            <div className="slider mb-24 mt-20">
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

            <HomeCatSlider/>

            <section className="bg-white pt-4">
                <div className="container">
                    <div className="flex items-center justify-between">
                         <div className="leftSec w-[60%]">
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="Item One" {...a11yProps(0)} />
                                        <Tab label="Item Two" {...a11yProps(1)} />
                                        <Tab label="Item Three" {...a11yProps(2)} />
                                    </Tabs>
                                </Box>
                            </Box>
                            {/* <Box sx={{ width: '100%' }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    textColor="secondary"
                                    indicatorColor="secondary"
                                    aria-label="secondary tabs example"
                                >
                                    <Tab value="one" label="Item One" />
                                    <Tab value="two" label="Item Two" />
                                    <Tab value="three" label="Item Three" />
                                </Tabs>
                            </Box> */}
                        </div>
                        <div className=" rightSec pr-10">
                            <h2 className="text-[20px] font-[600]">Popular Products</h2>
                            <p className="text-[14px] font-[400]">Do not miss the current offers until the
                            end of March.</p>
                        </div>
                    </div>
                    <CustomTabPanel value={value} index={0}>
                        <ProductsSlider items={5}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        Item Two
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        Item Three
                    </CustomTabPanel>       
                   

                </div>
            </section>


<section className="py-16 ¦bg-white">
	<div className="container">
		<div className="freeShipping w-[80%] m-auto py-4 p-4 border-2 border-[#ff5252] flex items-center justify-between rounded-md">
			<div className="col1 flex items-center gap-4 mb-5">
				<LiaShippingFastSolid className="text-[50px]" /> 
				<span className="text-[20px] font-[600] uppercase">Free Shipping </span> 
			</div>
			<div className="col2">
				<p className="mb-0 font-[500]">Free Delivery Now On Your First Order and over
				$200</p>
			</div>

			<p> - Only $200*</p>
		</div>

		<AdsBannerSlider items={4} />
	</div>
</section>


            <div className="ct-sub-headline">
                <div className="ct-sub-headline-deco-line "></div>
                <div className="ct-sub-headline-label ">Câu chuyện thương hiệu</div>
                <div className="ct-sub-headline-deco-line "></div>
            </div>
            <div className="story flex justify-between items-center gap-4 w-[100%] mx-auto mb-24">
                <div className="basis-1/2">
                    <video autoPlay loop muted className="w-full h-full object-cover">
                    <source src="/video/1793482-hd_1920_1080_30fps.mp4" type="video/mp4"/>
                    Trình duyệt của bạn không hỗ trợ thẻ video.
                    </video>
                </div>
            
                <div className="bassic-1/2 text-left">
                    <div className="text-3xl leading-10 mb-6">Hệ thống cửa hàng PedalPeak</div>
                    <div className="text-gray-500 leading-7 mb-6">Hệ thống cửa hàng PedalPeak được thành lập vào năm 2019, 
                    với sứ mệnh mang đến <br></br> những sản phẩm xe đạp chất lượng cao và dịch vụ tốt nhất cho người tiêu dùng Việt Nam. <br></br>
                    Kể từ khi ra mắt, PedalPeak đã nhanh chóng phát triển và trở thành một trong những  <br></br> nhà phân phối 
                    xe đạp hàng đầu tại Việt Nam. Với cam kết không ngừng nâng cao chất lượng <br></br>sản phẩm và dịch vụ, PedalPeak
                    đã xây dựng được lòng tin từ khách hàng và cộng đồng <br></br> yêu xe đạp khắp cả nước.
                    </div>
                    <div className="">
                    <Link className="text-xl text-blue-800 hover:text-main-600 relative after:absolute after:-bottom-2 after:left-0
                        after:bg-main-50 hover:after:bg-main-200 after:h-0.5 after:w-full after:transition-all after:ease-in-out after:duration-500" href="">Đọc toàn bộ câu chuyện</Link>
                    </div>
                </div>
            
            </div>
            {/* End story */}

            <div className="ct-sub-headline">
                <div className="ct-sub-headline-deco-line "></div>
                <div className="ct-sub-headline-label ">Sản phẩm mới</div>
                <div className="ct-sub-headline-deco-line "></div>
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
                className="mySwiper"
            >
                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>
            </Swiper>
        
            {/* End products */}

            <div className="ct-sub-headline mt-16">
                <div className="ct-sub-headline-deco-line "></div>
                <div className="ct-sub-headline-label ">Xe đạp đường phố</div>
                <div className="ct-sub-headline-deco-line "></div>
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
                className="mySwiper"
            >
                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>
            </Swiper>
            {/* End products */}

            <div className="ct-sub-headline mt-16">
                <div className="ct-sub-headline-deco-line "></div>
                <div className="ct-sub-headline-label ">Xe đạp nữ</div>
                <div className="ct-sub-headline-deco-line "></div>
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
                className="mySwiper"
            >
                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>
            </Swiper>
            {/* End products */}

            <div className="ct-sub-headline mt-16">
                <div className="ct-sub-headline-deco-line "></div>
                <div className="ct-sub-headline-label ">Xe đạp trẻ em</div>
                <div className="ct-sub-headline-deco-line "></div>
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
                className="mySwiper"
            >
                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>
            </Swiper>
            {/* End products */}

            <div className="ct-sub-headline mt-16">
                <div className="ct-sub-headline-deco-line "></div>
                <div className="ct-sub-headline-label ">Xe đạp gấp</div>
                <div className="ct-sub-headline-deco-line "></div>
            </div>
            <div className="new-products w-[100%] mx-auto mb-24">
                <div className="grid grid-cols-4 gap-6">
                    <div className="ct-product-card">
                        <div style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[350px] bg-contain bg-no-repeat ">
                            <div>
                                <div className=" h-[350px] hover:bg-gray-900 hover:bg-opacity-10 hover:transition-all hover:ease-in-out hover:duration-500 relative group">              
                                    <div className="absolute w-[100px] bg-slate-300 py-2 px-4 top-3 right-3 text-center font-semibold text-blue-800">giá sale</div>       
                                    <button className="absolute bg-white text-gray-900 w-11/12 bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn ct-button">Đặt hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="text-center my-8">
                            <Link href={`/chitiet/1`}>
                                <div className="text-xl  mb-3 hover:text-blue-900 overflow-hidden line-clamp-2"> Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C</div>
                            </Link>
                            <div className="">
                                <span className="text-xl text-blue-900">6.990.000đ VND</span>
                                <span className="ml-2 text-gray-400 line-through">7.200.000000 VND</span>
                            </div>
                        </div>
                    </div>
                    <div className="ct-product-card">
                        <div style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[350px] bg-contain bg-no-repeat ">
                            <div>
                                <div className=" h-[350px] hover:bg-gray-900 hover:bg-opacity-10 hover:transition-all hover:ease-in-out hover:duration-500 relative group">              
                                    <div className="absolute w-[100px] bg-slate-300 py-2 px-4 top-3 right-3 text-center font-semibold text-blue-800">giá sale</div>       
                                    <button className="absolute bg-white text-gray-900 w-11/12 bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn ct-button">Đặt hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="text-center my-8">
                            <Link href={`/chitiet/1`}>
                                <div className="text-xl  mb-3 hover:text-blue-900 overflow-hidden line-clamp-2"> Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C</div>
                            </Link>
                            <div className="">
                                <span className="text-xl text-blue-900">6.990.000đ VND</span>
                                <span className="ml-2 text-gray-400 line-through">7.200.000000 VND</span>
                            </div>
                        </div>
                    </div>
                    <div className="ct-product-card">
                        <div style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[350px] bg-contain bg-no-repeat ">
                            <div>
                                <div className=" h-[350px] hover:bg-gray-900 hover:bg-opacity-10 hover:transition-all hover:ease-in-out hover:duration-500 relative group">              
                                    <div className="absolute w-[100px] bg-slate-300 py-2 px-4 top-3 right-3 text-center font-semibold text-blue-800">giá sale</div>       
                                    <button className="absolute bg-white text-gray-900 w-11/12 bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn ct-button">Đặt hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="text-center my-8">
                            <Link href={`/chitiet/1`}>
                                <div className="text-xl  mb-3 hover:text-blue-900 overflow-hidden line-clamp-2"> Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C</div>
                            </Link>
                            <div className="">
                                <span className="text-xl text-blue-900">6.990.000đ VND</span>
                                <span className="ml-2 text-gray-400 line-through">7.200.000000 VND</span>
                            </div>
                        </div>
                    </div>
                    <div className="ct-product-card">
                        <div style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[350px] bg-contain bg-no-repeat ">
                            <div>
                                <div className=" h-[350px] hover:bg-gray-900 hover:bg-opacity-10 hover:transition-all hover:ease-in-out hover:duration-500 relative group">              
                                    <div className="absolute w-[100px] bg-slate-300 py-2 px-4 top-3 right-3 text-center font-semibold text-blue-800">giá sale</div>       
                                    <button className="absolute bg-white text-gray-900 w-11/12 bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn ct-button">Đặt hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="text-center my-8">
                            <Link href={`/chitiet/1`}>
                                <div className="text-xl  mb-3 hover:text-blue-900 overflow-hidden line-clamp-2"> Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C</div>
                            </Link>
                            <div className="">
                                <span className="text-xl text-blue-900">6.990.000đ VND</span>
                                <span className="ml-2 text-gray-400 line-through">7.200.000000 VND</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-6">
                    <div className="ct-product-card">
                        <div style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[350px] bg-contain bg-no-repeat ">
                            <div>
                                <div className=" h-[350px] hover:bg-gray-900 hover:bg-opacity-10 hover:transition-all hover:ease-in-out hover:duration-500 relative group">              
                                    <div className="absolute w-[100px] bg-slate-300 py-2 px-4 top-3 right-3 text-center font-semibold text-blue-800">giá sale</div>       
                                    <button className="absolute bg-white text-gray-900 w-11/12 bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn ct-button">Đặt hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="text-center my-8">
                            <Link href={`/chitiet/1`}>
                                <div className="text-xl  mb-3 hover:text-blue-900 overflow-hidden line-clamp-2"> Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C</div>
                            </Link>
                            <div className="">
                                <span className="text-xl text-blue-900">6.990.000đ VND</span>
                                <span className="ml-2 text-gray-400 line-through">7.200.000000 VND</span>
                            </div>
                        </div>
                    </div>
                    <div className="ct-product-card">
                        <div style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[350px] bg-contain bg-no-repeat ">
                            <div>
                                <div className=" h-[350px] hover:bg-gray-900 hover:bg-opacity-10 hover:transition-all hover:ease-in-out hover:duration-500 relative group">              
                                    <div className="absolute w-[100px] bg-slate-300 py-2 px-4 top-3 right-3 text-center font-semibold text-blue-800">giá sale</div>       
                                    <button className="absolute bg-white text-gray-900 w-11/12 bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn ct-button">Đặt hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="text-center my-8">
                            <Link href={`/chitiet/1`}>
                                <div className="text-xl  mb-3 hover:text-blue-900 overflow-hidden line-clamp-2"> Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C</div>
                            </Link>
                            <div className="">
                                <span className="text-xl text-blue-900">6.990.000đ VND</span>
                                <span className="ml-2 text-gray-400 line-through">7.200.000000 VND</span>
                            </div>
                        </div>
                    </div>
                    <div className="ct-product-card">
                        <div style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[350px] bg-contain bg-no-repeat ">
                            <div>
                                <div className=" h-[350px] hover:bg-gray-900 hover:bg-opacity-10 hover:transition-all hover:ease-in-out hover:duration-500 relative group">              
                                    <div className="absolute w-[100px] bg-slate-300 py-2 px-4 top-3 right-3 text-center font-semibold text-blue-800">giá sale</div>       
                                    <button className="absolute bg-white text-gray-900 w-11/12 bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn ct-button">Đặt hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="text-center my-8">
                            <Link href={`/chitiet/1`}>
                                <div className="text-xl  mb-3 hover:text-blue-900 overflow-hidden line-clamp-2"> Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C</div>
                            </Link>
                            <div className="">
                                <span className="text-xl text-blue-900">6.990.000đ VND</span>
                                <span className="ml-2 text-gray-400 line-through">7.200.000000 VND</span>
                            </div>
                        </div>
                    </div>
                    <div className="ct-product-card">
                        <div style={{backgroundImage: `url('/img/products/2022_Escape1_MattingGalaxyGray-600x600.jpg')`,}} className="h-[350px] bg-contain bg-no-repeat ">
                            <div>
                                <div className=" h-[350px] hover:bg-gray-900 hover:bg-opacity-10 hover:transition-all hover:ease-in-out hover:duration-500 relative group">              
                                    <div className="absolute w-[100px] bg-slate-300 py-2 px-4 top-3 right-3 text-center font-semibold text-blue-800">giá sale</div>       
                                    <button className="absolute bg-white text-gray-900 w-11/12 bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:block group-hover:animate-fadeIn ct-button">Đặt hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="text-center my-8">
                            <Link href={`/chitiet/1`}>
                                <div className="text-xl  mb-3 hover:text-blue-900 overflow-hidden line-clamp-2"> Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C</div>
                            </Link>
                            <div className="">
                                <span className="text-xl text-blue-900">6.990.000đ VND</span>
                                <span className="ml-2 text-gray-400 line-through">7.200.000000 VND</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End products */}

            <div className="ct-sub-headline">
                <div className="ct-sub-headline-deco-line "></div>
                <div className="ct-sub-headline-label ">Tạp chí PedalPeak</div>
                <div className="ct-sub-headline-deco-line "></div>
            </div>
            <div className="bike-magazine w-[95%] mx-auto mb-24">
                <div className="flex flex-row justify-center items-center gap-5">
                    <div className="ct-magazine-img basis-1/2 flex flex-row gap-5">
                        <div className="ct-magazine-big-img h-[280px] basis-2/3 bg-[url('../public/img/products/banner6.jpeg')] bg-cover bg-no-repeat bg-center"></div>
                        <div className="ct-magazine-small-img basis-1/3 flex flex-col gap-5">
                            <div className="h-[130px] bg-[url('../public/img/products/banner7.jpeg')] bg-cover bg-no-repeat bg-center"></div>
                            <div className="h-[130px] bg-[url('../public/img/products/banner8.jpeg')] bg-cover bg-no-repeat bg-center"></div>
                        </div>
                    </div>
                    <div className="ct-magazine-post basis-1/2 pl-14 ">
                        <div className="uppercase tracking-widest text-gray-500 font-medium text-xs mb-4">Ưu đãi cao cấp</div>
                        <div className="text-4xl mb-4">Nhận tạp chí của chúng tôi</div>
                        <div className="text-gray-500 mb-4 leading-7">Hệ thống cửa hàng của PedalPeak được thiết kế hiện đại, với không gian trưng bày rộng rãi, giúp bạn dễ dàng lựa chọn và so sánh các mẫu xe đạp. Đặc biệt, khi mua hàng trực tiếp, bạn còn có thể tham gia vào các sự kiện khuyến mãi và nhận được nhiều ưu đãi hấp dẫn.</div>
                        <div className="ct-button bg-gray-900 text-white w-max">Bắt đầu mua hàng</div>
                    </div>
                </div>
            </div>
            {/* End bike-magazine */}

            <div className="ct-parallax-section h-[500px] bg-[url('../public/img/products/banner5.jpeg')] bg-cover bg-no-repeat bg-center mb-24 bg-fixed w-[99vw] relative left-[calc(-49.5vw+50%)]"></div>
            {/* End parallax */}

            <div className="ct-sub-headline">
                <div className="ct-sub-headline-deco-line "></div>
                <div className="ct-sub-headline-label ">Bài viết hay</div>
                <div className="ct-sub-headline-deco-line "></div>
            </div>
            <div className="bike-news w-[100%] mx-auto mb-24">
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
            {/* End bike-news */}

            <div className="ct-sub-headline">
                <div className="ct-sub-headline-deco-line "></div>
                <div className="ct-sub-headline-label ">Đăng ký nhận ưu đãi</div>
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
            {/* End subcribe */}
        </main>          
    )
}

export default Home;