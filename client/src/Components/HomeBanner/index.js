import React from "react";
import Slider from "react-slick";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { IoIosArrowRoundForward } from "react-icons/io";


const HomeBanner =()=>{
    
    var settings = {
        arrows: true,
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        // nextArrow: <IoIosArrowRoundBack />,
        // prevArrow: <IoIosArrowRoundForward />,  
    };

    return (
        <>
            <div className="homeBannerSection mt-[120px]">
                <Slider {...settings}>
                        <img className="h-[520px]" alt="" src="/img/products/banner1.jpg"></img>
                        <img className="h-[520px]" alt="" src="/img/products/banner2.jpg"></img>
                        <img className="h-[520px]" alt="" src="/img/products/banner3.jpg"></img>
                </Slider>
            </div>
           
        </>
    )
}

export default HomeBanner;