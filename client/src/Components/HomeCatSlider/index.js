import React from "react";
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { FreeMode, Pagination, Navigation } from 'swiper/modules';

const HomeCatSlider =()=>{
    return (
        <div className="homeCatSlider mb-24">
            <div className="container">
                <Swiper
                    slidesPerView={5}
                    spaceBetween={20}
                    freeMode={true}
                    navigation={true}
                    // pagination={{
                    // clickable: true,
                    // }}
                    modules={[FreeMode, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img className="transition-all" alt="xe đạp trẻ em" src="https://xedapgiakho.com/wp-content/uploads/2024/06/Xe-Dap-Tre-Em-Be-Trai-Hector-Polo.jpg" />
                                <h3 className="text-[16px] font-normal mt-3">Xe đạp trẻ em</h3>
                            </div>
                        </Link>
                    </SwiperSlide> 
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img className="transition-all" alt="xe đạp trẻ em" src="https://xedapgiakho.com/wp-content/uploads/2024/06/Xe-Dap-Tre-Em-Be-Trai-Hector-Polo.jpg" />
                                <h3 className="text-[16px] font-normal mt-3">Xe đạp trẻ em</h3>
                            </div>
                        </Link>
                    </SwiperSlide> 
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img className="transition-all" alt="xe đạp trẻ em" src="https://xedapgiakho.com/wp-content/uploads/2024/06/Xe-Dap-Tre-Em-Be-Trai-Hector-Polo.jpg" />
                                <h3 className="text-[16px] font-normal mt-3">Xe đạp trẻ em</h3>
                            </div>
                        </Link>
                    </SwiperSlide> 
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img className="transition-all" alt="xe đạp trẻ em" src="https://xedapgiakho.com/wp-content/uploads/2024/06/Xe-Dap-Tre-Em-Be-Trai-Hector-Polo.jpg" />
                                <h3 className="text-[16px] font-normal mt-3">Xe đạp trẻ em</h3>
                            </div>
                        </Link>
                    </SwiperSlide> 
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img className="transition-all" alt="xe đạp trẻ em" src="https://xedapgiakho.com/wp-content/uploads/2024/06/Xe-Dap-Tre-Em-Be-Trai-Hector-Polo.jpg" />
                                <h3 className="text-[16px] font-normal mt-3">Xe đạp trẻ em</h3>
                            </div>
                        </Link>
                    </SwiperSlide> 
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img className="transition-all" alt="xe đạp trẻ em" src="https://xedapgiakho.com/wp-content/uploads/2024/06/Xe-Dap-Tre-Em-Be-Trai-Hector-Polo.jpg" />
                                <h3 className="text-[16px] font-normal mt-3">Xe đạp trẻ em</h3>
                            </div>
                        </Link>
                    </SwiperSlide> 
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img className="transition-all" alt="xe đạp trẻ em" src="https://xedapgiakho.com/wp-content/uploads/2024/06/Xe-Dap-Tre-Em-Be-Trai-Hector-Polo.jpg" />
                                <h3 className="text-[16px] font-normal mt-3">Xe đạp trẻ em</h3>
                            </div>
                        </Link>
                    </SwiperSlide> 
                </Swiper>
            </div>
        </div>
    )
}

export default HomeCatSlider ;