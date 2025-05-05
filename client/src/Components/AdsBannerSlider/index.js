import React from "react";

// import { Swiper, SwiperSlide } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import BannerBox from "../BannerBox";


const AdsBannerSlider = (props) =>{
    return (
        <div className="pt-5 px-6 w-full">
            <Swiper 
                slidesPerView={props.items}
                spaceBetween={10}
                navigation={[Navigation]}
                className="smlBtn"
            >
                <SwiperSlide>
                    <BannerBox img={'/img/products/banner2.jpg'} link={`/`}/>
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img={'/img/products/banner1.jpg'} link={'/'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img={'/img/products/banner3.jpg'} link={'/'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img={'/img/products/banner4.jpg'} link={'/'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img={'/img/products/banner5.jpeg'} link={'/'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img={'/img/products/banner6.jpeg'} link={'/'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img={'/img/products/banner7.jpeg'} link={'/'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img={'/img/products/banner8.jpeg'} link={'/'}/>
                </SwiperSlide>
            </Swiper>
        </div>

    )
}

export default AdsBannerSlider;