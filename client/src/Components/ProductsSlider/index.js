import React from "react";


// import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { FreeMode,  Navigation } from 'swiper/modules';

import ProductItem from '../../Components/ProductItem';

const ProductsSlider = (props) =>{


    return (
        <div className="productsSlider">
            <div className="container">
                <Swiper 
                    slidesPerView={props.items}
                    spaceBetween={10}
                    navigation={true}
                    modules={[FreeMode, Navigation]}
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
        </div>
    )
}

export default ProductsSlider;