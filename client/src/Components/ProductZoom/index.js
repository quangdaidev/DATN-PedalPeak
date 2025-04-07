import React, {useState, useRef} from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import { Navigation } from 'swiper/modules';

export const ProductZoom = (props) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const zoomSliderBig = useRef();
    const zoomSliderSml = useRef();
    const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index); zoomSliderBig.current.swiper.slideTo(index);
    }


  return (
    <>
        <div className="flex gap-3">
            <div className="slider w-[15%] pl-2">
                <Swiper
                    ref={zoomSliderSml}
                    direction={'vertical'}
                    slidesPerView={5}
                    spaceBetween={0}
                    navigation={false}
                    // pagination={{
                    // clickable: true,
                    // }}
                    modules={[Navigation]}
                    className={`zoomProductSliderThumbs h-[500px] overflow-hidden ${props?.images?.length > 5 && 'space'}`}
                >
                {
                    props?.images?.map((item,index)=>{
                        return (
                            <SwiperSlide key={index}>
                                <div className={`item rounded-md overflow-hidden cursor-pointer group shadow-[0_4px_6px_rgba(0,0,0,0.1)] ${slideIndex===index ? 'opacity-100' : 'opacity-30'}`} onClick={()=>goto(index)}>
                                    <img alt="" src={item}/>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
                    
                    {/* <SwiperSlide>
                        <div className={`item rounded-md overflow-hidden cursor-pointer group shadow-[0_4px_6px_rgba(0,0,0,0.1)] ${slideIndex===1 ? 'opacity-1' : 'opacity-30'}`} onClick={()=>goto(1)}>
                            <img alt="" src="https://api.xedap.vn/products/Max%20bike/hunter-24-green-3.jpg" className="w-full transition-all group-hover:scale-105"/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`item rounded-md overflow-hidden cursor-pointer group shadow-[0_4px_6px_rgba(0,0,0,0.1)] ${slideIndex===2 ? 'opacity-1' : 'opacity-30'}`} onClick={()=>goto(2)}>
                            <img alt="" src="https://api.xedap.vn/products/Max%20bike/hunter-24-green-5.jpg" className="w-full transition-all group-hover:scale-105"/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`item rounded-md overflow-hidden cursor-pointer group shadow-[0_4px_6px_rgba(0,0,0,0.1)] ${slideIndex===3 ? 'opacity-1' : 'opacity-30'}`} onClick={()=>goto(3)}>
                            <img alt="" src="https://api.xedap.vn/products/Max%20bike/hunter-24-green-1.jpg" className="w-full transition-all group-hover:scale-105"/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`item rounded-md overflow-hidden cursor-pointer group shadow-[0_4px_6px_rgba(0,0,0,0.1)] ${slideIndex===4 ? 'opacity-1' : 'opacity-30'}`} onClick={()=>goto(4)}>
                            <img alt="" src="https://api.xedap.vn/products/Max%20bike/hunter-24-green-2.jpg" className="w-full transition-all group-hover:scale-105"/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`item rounded-md overflow-hidden cursor-pointer group shadow-[0_4px_6px_rgba(0,0,0,0.1)] ${slideIndex===5 ? 'opacity-1' : 'opacity-30'}`} onClick={()=>goto(5)}>
                            <img alt="" src="https://api.xedap.vn/products/Max%20bike/hunter-24-green-1.jpg" className="w-full transition-all group-hover:scale-105"/>
                        </div>
                    </SwiperSlide> */}
                    <SwiperSlide></SwiperSlide>
                </Swiper>
            </div>

            <div className="zoomContainer w-[85%] overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.1)] flex items-center">
                <Swiper
                    ref={zoomSliderBig}
                    slidesPerView={1}
                    spaceBetween={0}
                    navigation={false}
                    // pagination={{
                    // clickable: true,
                    // }}
                    className=""
                >
                {
                    props?.images?.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <InnerImageZoom 
                                zoomType="hover" 
                                zoomScale={1} 
                                src={item}
                                />
                            </SwiperSlide>
                        )

                    })
                }
                    
                    <SwiperSlide>
                        <InnerImageZoom 
                        zoomType="hover" 
                        zoomScale={1} 
                        src=
                            "https://api.xedap.vn/products/Max%20bike/hunter-24-green-3.jpg"                     
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <InnerImageZoom 
                        zoomType="hover" 
                        zoomScale={1} 
                        src=
                            "https://api.xedap.vn/products/Max%20bike/hunter-24-green-5.jpg"                     
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <InnerImageZoom 
                        zoomType="hover" 
                        zoomScale={1} 
                        src=
                            "https://api.xedap.vn/products/Max%20bike/hunter-24-green-1.jpg"                     
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <InnerImageZoom 
                        zoomType="hover" 
                        zoomScale={1} 
                        src=
                            "https://api.xedap.vn/products/Max%20bike/hunter-24-green-2.jpg"                     
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <InnerImageZoom 
                        zoomType="hover" 
                        zoomScale={1} 
                        src=
                            "https://api.xedap.vn/products/Max%20bike/hunter-24-green-1.jpg"                     
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </>
  )
}
