import React, {useState} from 'react';
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

export const ProductDetailsV2 = () => {

    const [activeTab, setActiveTab] = useState(0);

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
                    Xe đạp thể thao
                    </Link>
                    <Link
                    underline="hover"
                    color="inherit"
                    href="/"
                    className="link transition !text-[14px]"
                    >
                    Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C
                    </Link>
                    {/* <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography> */}
                </Breadcrumbs>          
            </div>
        </div>

        <section className="bg-white py-5 mb-10">
            <div className="container flex gap-8 items-center mt-5">
                <div className="productZoomContainer w-[40%]">
                    <ProductZoom/>
                </div>

                <div className="productContent w-[60%] pr-10 pl-10 ">
                    <ProductDetailsComponent/>        
                </div>
            </div>

            <div className="container pt-10">
                <div className="flex items-center gap-8 mb-5 px-8">
                    <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab===0 && 'text-primary-600'}`}
                    onClick={()=>setActiveTab(0)}>Mô tả sản phẩm</span>
                    <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab===1 && 'text-primary-600'}`}
                     onClick={()=>setActiveTab(1)}>Thông số kỹ thuật</span>
                    <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab===2 && 'text-primary-600'}`}
                     onClick={()=>setActiveTab(2)}>Bình luận (5)</span>
                </div>
                
                {
                    activeTab===0 && (
                        <div className="shadow-md w-full py-5 px-8 rounded-md">
                            <h2>Xe Đạp Đường Phố Fixed Gear VINBIKE Megatron – Bánh 700C</h2>
                            <p>Xe Đạp Đường Phố Fixed Gear là lựa chọn hoàn hảo cho những tín đồ đam mê khám phá địa hình. 
                            Được trang bị hệ thống phanh đĩa cơ an toàn và bộ truyền động Shimano chính xác mang đến khả năng vận hành êm ái và ổn định trong những cuộc hành trình, từ những con dốc hiểm trở đến những địa hình gồ ghề đầy thách thức..</p>
                            <h2>1. Khung Xe Chắc Chắn, Vững Mãi Trên Mọi Địa Hình</h2>
                            <p>1. Khung Xe Chắc Chắn, Vững Mãi Trên Mọi Địa Hình
                            Với khung Max Bike STL 24, chiếc xe đảm bảo tính bền bỉ và khả năng chịu lực tuyệt vời, giúp người lái tự tin vượt qua các địa hình hiểm trở. Khung xe được thiết kế vững chắc nhưng vẫn đủ nhẹ để bạn
                            dễ dàng kiểm soát trong những chuyến đi dài.</p>
                        </div>
                )}

                {
                    activeTab===1 && (     
                        <div className="shadow-md w-full py-5 px-8 rounded-md">                   
                            <div class="relative overflow-x-auto">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    {/* <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                            Kích cỡ/Sizes
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                            Màu sắc/Colors
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                            Chất liệu khung/Frame	
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Price
                                            </th>
                                        </tr>
                                    </thead> */}
                                    <tbody>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Kích cỡ/Sizes
                                            </th>
                                            <td class="px-6 py-4">
                                            One Size
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Màu sắc/Colors	                                        </th>
                                            <td class="px-6 py-4">
                                            Green, White, Yellow
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Chất liệu khung/Frame	                                        </th>
                                            <td class="px-6 py-4">
                                            Max Bike STL 24
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Phuộc/Fork	                                        </th>
                                            <td class="px-6 py-4">
                                            Max Bike STL 24
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Vành xe/Rims	                                        </th>
                                            <td class="px-6 py-4">
                                            ALU, Double Wall, 36H, Schrader valve
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Đùm/Hubs	                                        </th>
                                            <td class="px-6 py-4">
                                            N/A
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Lốp xe/Tires	                                        </th>
                                            <td class="px-6 py-4">
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
                            <div className="w-full productReviewsContainer">
                                {/* <h2 className="text-[18px]">Thảo luận khách hàng</h2> */}

                                <div className="reviewScroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden pr-5">
                                    <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between"> 
                                        <div className="info w-[60%] flex items-center gap-3">
                                            <div className="img w-[80px] h-[80px] overflow-hidden rounded-full"> 
                                            <img
                                            alt=""
                                            src="https://lirp.cdn-website.com/6f140169/dms3rep/multi/opt/Parikshit+Gokhale-640w.jpg" 
                                            className="w-full"
                                            />
                                            </div>

                                            <div className="w-[80%]">
                                                <h4 className="text-[16px]">Rinku Verma</h4>
                                                <h5 className="text-[13px] mb-0">2024-12-01</h5>
                                                <p className="mt-0 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                            </div>                                  
                                        </div>
                                        <Rating name="size-small" defaultValue={4} s readOnly/>
                                    </div>
                                    <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between"> 
                                        <div className="info w-[60%] flex items-center gap-3">
                                            <div className="img w-[80px] h-[80px] overflow-hidden rounded-full"> 
                                            <img
                                            alt=""
                                            src="https://lirp.cdn-website.com/6f140169/dms3rep/multi/opt/Parikshit+Gokhale-640w.jpg" 
                                            className="w-full"
                                            />
                                            </div>

                                            <div className="w-[80%]">
                                                <h4 className="text-[16px]">Rinku Verma</h4>
                                                <h5 className="text-[13px] mb-0">2024-12-01</h5>
                                                <p className="mt-0 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                            </div>                                  
                                        </div>
                                        <Rating name="size-small" defaultValue={4} s readOnly/>
                                    </div>
                                    <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between"> 
                                        <div className="info w-[60%] flex items-center gap-3">
                                            <div className="img w-[80px] h-[80px] overflow-hidden rounded-full"> 
                                            <img
                                            alt=""
                                            src="https://lirp.cdn-website.com/6f140169/dms3rep/multi/opt/Parikshit+Gokhale-640w.jpg" 
                                            className="w-full"
                                            />
                                            </div>

                                            <div className="w-[80%]">
                                                <h4 className="text-[16px]">Rinku Verma</h4>
                                                <h5 className="text-[13px] mb-0">2024-12-01</h5>
                                                <p className="mt-0 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                            </div>                                  
                                        </div>
                                        <Rating name="size-small" defaultValue={4} s readOnly/>
                                    </div>
                                    <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between"> 
                                        <div className="info w-[60%] flex items-center gap-3">
                                            <div className="img w-[80px] h-[80px] overflow-hidden rounded-full"> 
                                            <img
                                            alt=""
                                            src="https://lirp.cdn-website.com/6f140169/dms3rep/multi/opt/Parikshit+Gokhale-640w.jpg" 
                                            className="w-full"
                                            />
                                            </div>

                                            <div className="w-[80%]">
                                                <h4 className="text-[16px]">Rinku Verma</h4>
                                                <h5 className="text-[13px] mb-0">2024-12-01</h5>
                                                <p className="mt-0 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                            </div>                                  
                                        </div>
                                        <Rating name="size-small" defaultValue={4} s readOnly/>
                                    </div>
                                </div>

                                <br/>

                                <div className="reviewForm bg-[#fafafa] p-4 rounded-md">
                                    <h2 className="text-[18px]">Thêm bình luận</h2>
                                    <form className="w-full mt-5">
                                        <TextField
                                            id="outlined-multiline-flexible" label="Viết bình luận..."
                                            className="w-full"
                                            multiline
                                            rows={5}
                                        />
                                        <br/><br/>
                                        <Rating name="size-small" defaultValue={4} />

                                        <div className="flex items-center mt-5">
                                            <Button className="btn-org">Gửi bình luận</Button>
                                        </div>
                                    </form>
                                </div>


                            </div>
                        </div>
                    )
                }                                 
            </div>

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
                </div>

        </section>
    </>
  )
}
