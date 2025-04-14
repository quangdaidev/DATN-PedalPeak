import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { FreeMode,  Navigation } from 'swiper/modules';

const ProductLoading = () => {
  return (
    // <div className="flex items-center gap-5 animate-pulse py-1">
    //     <div className="col w-[20%] h-[580px]">
    //         <div className="flex items-center mb-3 justify-center w-full h-[346px] bg-gray-300 rounded-sm  dark:bg-gray-700">
    //             <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
    //                 <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
    //             </svg>
    //         </div>

    //         <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4 mt-8"></div>
    //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
    //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[280px] mb-2"></div>
    //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mt-8"></div>
    //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4"></div>
    //     </div>

    //     <div className="col w-[20%] h-[580px]">
    //         <div className="flex items-center mb-3 justify-center w-full h-[346px] bg-gray-300 rounded-sm  dark:bg-gray-700">
    //             <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
    //                 <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
    //             </svg>
    //         </div>

    //         <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4 mt-8"></div>
    //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
    //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[280px] mb-2"></div>
    //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mt-8"></div>
    //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4"></div>
    //     </div>

    //     <div className="col w-[20%] h-[580px]">
    //         <div className="flex items-center mb-3 justify-center w-full h-[346px] bg-gray-300 rounded-sm  dark:bg-gray-700">
    //             <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
    //                 <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
    //             </svg>
    //         </div>

    //         <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4 mt-8"></div>
    //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
    //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[280px] mb-2"></div>
    //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mt-8"></div>
    //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4"></div>
    //     </div>

    //     <div className="col w-[20%] h-[580px]">
    //         <div className="flex items-center mb-3 justify-center w-full h-[346px] bg-gray-300 rounded-sm  dark:bg-gray-700">
    //             <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
    //                 <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
    //             </svg>
    //         </div>

    //         <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4 mt-8"></div>
    //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
    //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[280px] mb-2"></div>
    //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mt-8"></div>
    //         <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4"></div>
    //     </div>
    
    // </div>

     <div className="productsSlider">
        <div className="container">
            <Swiper 
                slidesPerView={4}
                spaceBetween={10}
                navigation={true}
                modules={[FreeMode, Navigation]}
                className="mySwiper"
            >

                <SwiperSlide>
                    <div className="flex items-center animate-pulse mb-20">
                        <div className="">
                            <div className="flex items-center mb-3 justify-center w-[346px] h-[346px] bg-gray-300 rounded-sm  dark:bg-gray-700">
                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                            </div>

                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4 mt-8"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[280px] mb-2"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mt-8"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4"></div>
                        </div>
                    </div>
                </SwiperSlide>
    
                <SwiperSlide>
                    <div className="flex items-center animate-pulse mb-20">
                        <div className="">
                            <div className="flex items-center mb-3 justify-center w-[346px] h-[346px] bg-gray-300 rounded-sm  dark:bg-gray-700">
                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                            </div>

                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4 mt-8"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[280px] mb-2"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mt-8"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4"></div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="flex items-center animate-pulse mb-20">
                        <div className="">
                            <div className="flex items-center mb-3 justify-center w-[346px] h-[346px] bg-gray-300 rounded-sm  dark:bg-gray-700">
                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                            </div>

                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4 mt-8"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[280px] mb-2"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mt-8"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4"></div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="flex items-center animate-pulse mb-20">
                        <div className="">
                            <div className="flex items-center mb-3 justify-center w-[346px] h-[346px] bg-gray-300 rounded-sm  dark:bg-gray-700">
                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                            </div>

                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4 mt-8"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-3"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[280px] mb-2"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mt-8"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4"></div>
                        </div>
                    </div>
                </SwiperSlide>
                
            </Swiper>
        </div>
    </div>
  )
}

export default ProductLoading;
