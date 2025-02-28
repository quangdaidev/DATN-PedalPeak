import React from "react";
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';

// Import Swiper styles
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


// import required modules
import { FreeMode,  Navigation } from 'swiper/modules';

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
                                <img className="transition-all" alt="xe đạp trẻ em" src="https://xedapgiakho.com/wp-content/uploads/2024/07/Xe-Dap-Dua-Giant-Propel-ADV-Pro-0-2024-2-1-286x200.jpg" />
                                <h3 className="text-[16px] font-normal mt-3">Xe đạp thể thao</h3>
                            </div>
                        </Link>
                    </SwiperSlide> 
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img className="transition-all" alt="xe đạp trẻ em" src="https://xedapgiakho.com/wp-content/uploads/2024/09/xe-dap-dia-hinh-life-286x200.jpg" />
                                <h3 className="text-[16px] font-normal mt-3">Xe đạp địa hình</h3>
                            </div>
                        </Link>
                    </SwiperSlide> 
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img className="transition-all" alt="xe đạp trẻ em" src="https://xedapgiakho.com/wp-content/uploads/2024/03/Xe-Dap-Nu-Xaming-Mini-24-Inch-286x200.jpg" />
                                <h3 className="text-[16px] font-normal mt-3">Xe đạp nữ</h3>
                            </div>
                        </Link>
                    </SwiperSlide> 
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img className="transition-all" alt="xe đạp trẻ em" src="https://xedapgiakho.com/wp-content/uploads/2024/09/xe-dap-gap-fascino-286x200.jpg" />
                                <h3 className="text-[16px] font-normal mt-3">Xe đạp gấp</h3>
                            </div>
                        </Link>
                    </SwiperSlide> 
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img className="transition-all" alt="xe đạp trẻ em" src="https://xedapgiakho.com/wp-content/uploads/2023/12/Xe-Dap-Touring-Papylus-Pt700s-7-286x200.jpg" />
                                <h3 className="text-[16px] font-normal mt-3">Xe đạp Touring</h3>
                            </div>
                        </Link>
                    </SwiperSlide> 
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img className="transition-all" alt="xe đạp trẻ em" src="https://xedapgiakho.com/wp-content/uploads/2024/01/Xe-Dap-Dua-Sava-X9.5-4700-286x200.jpg" />
                                <h3 className="text-[16px] font-normal mt-3">Xe đạp đua</h3>
                            </div>
                        </Link>
                    </SwiperSlide> 
                </Swiper>
            </div>
        </div>
    )
}

export default HomeCatSlider ;