import {React, useState} from 'react'
// import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import "../Sidebar/style.css";
import {Collapse} from 'react-collapse';
import {FaAngleDown, FaAngleUp} from "react-icons/fa6";
import Button from "@mui/material/Button";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Rating from '@mui/material/Rating';
// import { CategoryCollapse } from '../CategoryCollapse'

export const Sidebar = () => {
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
  const [isOpenAvailFilter, setIsOpenAvailFilter] = useState(true);

  return (
    <div className="sidebar py-5">
      <div className='box'>
          <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Sản phẩm theo danh mục
            <Button className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-black"
            onClick={()=>setIsOpenCategoryFilter(!isOpenCategoryFilter)}>
              {
                isOpenCategoryFilter===true ? <FaAngleUp/> : <FaAngleDown/>
              }
            </Button>
          </h3>
          <Collapse isOpened={isOpenCategoryFilter}>
            <div className="scroll px-3 relative -left-[10px] text-[14px] flex items-start flex-col">
                <FormControlLabel control={<Checkbox size="small"/>} label="Xe đạp trẻ em" className="w-full"/>
                <FormControlLabel control={<Checkbox size="small"/>} label="Xe đạp thể thao" className="w-full"/>
                <FormControlLabel control={<Checkbox size="small"/>} label="Xe đạp đường phố" className="w-full"/>   
                <FormControlLabel control={<Checkbox size="small"/>} label="Xe đạp gấp" className="w-full"/>
                <FormControlLabel control={<Checkbox size="small"/>} label="Xe đạp địa hình" className="w-full"/>
                <FormControlLabel control={<Checkbox size="small"/>} label="Xe đạp nữ" className="w-full"/>
                <FormControlLabel control={<Checkbox size="small"/>} label="Xe đạp Tour" className="w-full"/>
            </div>   
          </Collapse>
          {/* <CategoryCollapse/> */}
      </div>

      <div className='box mt-3'>
          <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Có thể bạn đang tìm
            <Button className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-black"
            onClick={()=>setIsOpenAvailFilter(!isOpenAvailFilter)}>
              {
                isOpenCategoryFilter===true ? <FaAngleUp/> : <FaAngleDown/>
              }
            </Button>
          </h3>
          <Collapse isOpened={isOpenAvailFilter}>
            <div className="scroll px-3 relative -left-[10px] text-[14px] flex items-start flex-col">
                <FormControlLabel control={<Checkbox size="small"/>} label="Sản phẩm khuyến mãi (17)" className="w-full"/>
                <FormControlLabel control={<Checkbox size="small"/>} label="Sản phẩm mới ra (12)" className="w-full"/>
                <FormControlLabel control={<Checkbox size="small"/>} label="Sản phẩm bán chạy (18)" className="w-full"/>
            </div>   
          </Collapse>
          {/* <CategoryCollapse/> */}
      </div>

      <div className="box mt-4">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Lọc theo giá
        </h3>
        <RangeSlider />
        <div className="flex pt-4 pb-2 priceRange">
          <span className="text-[13px]">
            Từ: <strong className="text-dark">{1} triệu</strong> </span>
          <span className="ml-auto text-[13px]">
            Đến: <strong className="text-dark">{5} triệu</strong>
          </span>
        </div>
      </div>

      <div className="box mt-4">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Lọc theo đánh giá
        </h3>
        
        <div className="w-full">
          <Rating name="size-mall" defaultValue={5} size="small" readOnly/>
        </div>
        <div className="w-full">
          <Rating name="size-mall" defaultValue={4} size="small" readOnly/>
        </div>
        <div className="w-full">
          <Rating name="size-mall" defaultValue={3} size="small" readOnly/>
        </div>
        <div className="w-full">
          <Rating name="size-mall" defaultValue={2} size="small" readOnly/>
        </div>
        <div className="w-full">
          <Rating name="size-mall" defaultValue={1} size="small" readOnly/>
        </div>   
      </div>
    </div>
  )
}
