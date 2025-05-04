import React, {useEffect, useState} from 'react'

import Button from "@mui/material/Button"; 
import { FaAngleUp } from "react-icons/fa6"; 
import { FaAngleDown} from "react-icons/fa6"; 
import { fetchDataFromApi } from '../../utils/api';

export const QtyBox = (props) => {

    const [proColor, setProColor] = useState("");

    useEffect(()=>{
        if(props?.selectedColor!==undefined){
            fetchDataFromApi(`/api/productColor/${props?.selectedColor}`).then((res)=>{
                if(res?.error===false){
                    console.log("sl:::",res.data)
                    setProColor(res.data)
                }
            })
        }
      
    },[props?.selectedColor])


    const [qtyVal, setQtyVal] = useState(1);

    const plusQty=()=>{
        if (qtyVal < proColor.countInStock) {
            setQtyVal(qtyVal+1)
            props.setQty(qtyVal+1)
        }
    }

    const minusQty=()=>{
        if(qtyVal===1){
            setQtyVal(1);
            props.setQty(1)
        }else{
            setQtyVal(qtyVal-1);
            props.setQty(qtyVal-1)
        }
    }

    return (
        <div className="qtyBox flex items-center relative">
            <input
                type="number"
                className="w-full h-[40px] p-2 p1-5 text-[15px] focus:outline-none border border-black rounded-md"
                value={qtyVal}
                max={12}
                readOnly
            />
        
            <div className="flex items-center flex-col justify-between h-[40px] absolute top-0 right-0 z-50">
                <Button className="!min-w-[30px] !w-[30px] !h-[20px] !text-[#000] !rounded-none hover:!bg-[#f1f1f1]"
                onClick={plusQty}
                >
                    <FaAngleUp className="text-[12px] opacity-55"/>
                </Button>
                <Button className="!min-w-[30px] !w-[30px] !h-[20px] !text-[#000] !rounded-none hover:!bg-[#f1f1f1]"
                onClick={minusQty}
                >
                    <FaAngleDown className="text-[12px] opacity-55"/>
                </Button>
            </div>
        </div>
    )
    }
