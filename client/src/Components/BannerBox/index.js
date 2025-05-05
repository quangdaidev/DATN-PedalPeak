import React from "react";
import { Link } from 'react-router-dom';

const BannerBox = (props) =>{
    return ( 
        // <div className="box bannerBox overflow-hidden rounded-lg group">
        //     <Link to="/">
        //         <img src={props.img} className="w-full transition-all group-hover:scale-105 group-hover:rotate-2" alt="banner" />
        //     </Link>
        // </div>

        <div className="box bannerBox overflow-hidden rounded-lg group h-32 w-full">
            <Link to="/">
                <img
                src={props.img}
                alt="banner"
                className="w-full h-full object-cover transition-all group-hover:scale-105 group-hover:rotate-2"
                />
            </Link>
        </div>
    )
}

export default BannerBox;