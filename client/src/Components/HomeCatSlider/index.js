import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';

// Import Swiper styles
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


// import required modules
import { FreeMode,  Navigation } from 'swiper/modules';

const HomeCatSlider =(props)=>{

    const [catData, setCatData] = useState([]);

    useEffect(()=>{
        setCatData(props.catData)
    },[props.catData])

    return (
        <div className="homeCatSlider mb-12">
            <div className="container">
                <Swiper
                    slidesPerView={6}
                    spaceBetween={20}
                    freeMode={true}
                    navigation={true}
                    // pagination={{
                    // clickable: true,
                    // }}
                    modules={[FreeMode, Navigation]}
                    className="mySwiper"
                >

                    {/* {console.log("kkkkkkkkk",props.catData)} */}

                    {
                        props.catData?.length!==0 && props.catData?.map((cat, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Link to="/">
                                        <div className="item px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                            <img className="transition-all" alt="xe đạp trẻ em" src={cat.images[0]} />
                                            <h3 className="text-[16px] font-normal mt-3">{cat.name}</h3>
                                        </div>
                                    </Link>
                                </SwiperSlide> 
                            )
                        })
                    }

                    {/* <SwiperSlide>
                        <Link to="/">
                            <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img className="transition-all" alt="xe đạp trẻ em" src="https://xedapgiakho.com/wp-content/uploads/2024/06/Xe-Dap-Tre-Em-Be-Trai-Hector-Polo.jpg" />
                                <h3 className="text-[16px] font-normal mt-3">Xe đạp trẻ em</h3>
                            </div>
                        </Link>
                    </SwiperSlide>  */}
                   
                </Swiper>
            </div>
        </div>
    )
}

export default HomeCatSlider ;