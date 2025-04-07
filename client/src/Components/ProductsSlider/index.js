
// import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import React, {useEffect, useState} from "react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { FreeMode,  Navigation } from 'swiper/modules';

import ProductItem from '../../Components/ProductItem';

const ProductsSlider = (props) =>{

        const [proHotData, setProHotData] = useState([]);
    
        useEffect(()=>{
            setProHotData(props.data)
        },[props.data])

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

                    {
                        proHotData?.length!==0 && proHotData?.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <ProductItem item={item}/>
                                </SwiperSlide> 
                            )
                        })
                    }

                    {/* <SwiperSlide>
                        <ProductItem/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductItem/>
                    </SwiperSlide> */}
                    
                </Swiper>
            </div>
        </div>
    )
}

export default ProductsSlider;