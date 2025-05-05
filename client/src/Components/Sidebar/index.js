import {React, useContext, useEffect, useState} from 'react'
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
import { MyContext } from '../../App';
import { useLocation } from 'react-router-dom';
import { postData } from '../../utils/api';
// import { CategoryCollapse } from '../CategoryCollapse'

export const Sidebar = (props) => {

  const context = useContext(MyContext);

  const location = useLocation();

  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
  const [isOpenAvailFilter, setIsOpenAvailFilter] = useState(true);

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const [filters, setFilters] = useState({
    catId: [],
    subCatId: [],
    thirdSubCatId: [],
    minPrice: '',
    maxPrice: '',
    rating: '',
    page: 1,
    limit: 4,
  })

  const filterData =()=>{
    // console.log("Filters being applied:", filters);
    props.setIsLoading(true);
   
    if(context?.searchData?.data?.length>0){
      props.setProductsData(context?.searchData?.data);
      props.setTotalPro(context?.searchData?.total);
      props.setIsLoading(false);
      props.setTotalPages(context?.searchData?.totalPages);
      window.scrollTo(0,0);
    } else {
      postData(`/api/product/filters`, filters).then((res)=>{
        console.log("apiFilters::",res)

        // const filteredProducts = res?.data.filter((product) => {
        //   const isActive = product.status === true;
      
        //   // Kiểm tra nếu có ít nhất một color còn hàng 
        //   const hasStock = product.color?.some(color => Number(color.countInStock) > 0); //Hàm some() trả về ít nhất một phần tử trong mảng thỏa điều kiện countInStock > 0
        
        //   return isActive && hasStock;
        // });
  
        // props.setProductsData(filteredProducts);

        props.setProductsData(res.data);
        props.setTotalPro(res.total);
        props.setIsLoading(false);
        props.setTotalPages(res?.totalPages);
        window.scrollTo(0,0);
      })
    }
  }

  const [price, setPrice] = useState([0, 30000000]);

  const handleCheckboxChange = (field, value) => {

    context?.setSearchData([]);
    
    const currentValues = filters[field] || []
    const updatedValues = currentValues?.includes(value) ? currentValues.filter((item) => item !== value) : [...currentValues, value];

    setFilters((prev) => ({
      ...prev,
      [field]: updatedValues
    }))

    if(field === "catId"){
      setFilters((prev) => ({
        ...prev,
        subCatId:[],
        thirdSubCatId:[]
      }))
    }
  }

  useEffect(()=>{

    const url = window.location.href;
    const queryParameters = new URLSearchParams(location.search);

    if(url.includes("catId")){
      const categoryId = queryParameters.get("catId");
      const catArr = [];
      catArr.push(categoryId);
      filters.catId = catArr;
      filters.subCatId = [];
      filters.thirdSubCatId = [];
      filters.rating = [];
    }

    // if(url.includes("subCatId")){
    //   const subcategoryId = queryParameters.get("subCatId");
    //   const subcatArr = [];
    //   subcatArr.push(subcategoryId);
    //   filters.subCatId = subcatArr;
    //   filters.subCatId = [];
    //   filters.thirdSubCatId = [];
    //   filters.rating = [];
    // }

    filters.page = 1;

    setTimeout(() => {
      filterData();
    }, 200);

    // context?.setSearchData([]);

  },[location])

  useEffect(()=>{
    filters.page = props.page;
    filterData();
  },[filters, props.page])

  useEffect(()=>{
    setFilters((prev)=>({
      ...prev,
      minPrice: price[0],
      maxPrice: price[1]
    }))
  },[price]);

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
                
              {
                context?.catData?.length!==0 && context?.catData?.map((item, index)=>{
                  return(
                    <FormControlLabel 
                      key={index}
                      value={item?._id}
                      control={<Checkbox />}
                      checked={filters?.catId?.includes(item?._id)}
                      label={item?.name} 
                      onChange={()=>handleCheckboxChange('catId', item?._id)}
                    className="w-full"
                    />
                  )
                })
              }
                
            </div>   
          </Collapse>
          {/* <CategoryCollapse/> */}
      </div>

      {/* <div className='box mt-3'>
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
              <FormControlLabel control={<Checkbox />} label="Sản phẩm khuyến mãi (17)" className="w-full"/>
              <FormControlLabel control={<Checkbox />} label="Sản phẩm mới ra (12)" className="w-full"/>
              <FormControlLabel control={<Checkbox />} label="Sản phẩm bán chạy (18)" className="w-full"/>
          </div>   
        </Collapse>
      </div> */}

      <div className="box mt-4">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Lọc theo giá
        </h3>
        <RangeSlider 
          value={price}
          onInput={setPrice}
          min={300000}
          max={30000000}
          step={100000}
        />
        <div className="flex pt-4 pb-2 priceRange">
          <span className="text-[13px]">
            Từ: <strong className="text-dark">{VND.format(price[0])}</strong> </span>
          <span className="ml-auto text-[13px]">
            Đến: <strong className="text-dark">{VND.format(price[1])}</strong>
          </span>
        </div>
      </div>

      <div className="box mt-4">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Lọc theo xếp hạng
        </h3>
        
        <div className="flex items-center">
          <FormControlLabel 
            value={5}
            control={<Checkbox />}
            checked={filters?.rating?.includes(5)}
            onChange={()=>handleCheckboxChange('rating',5)}
          />
          <Rating name="size-mall" defaultValue={5} readOnly/>
        </div>

        <div className="flex items-center">
          <FormControlLabel 
            value={4}
            control={<Checkbox />}
            checked={filters?.rating?.includes(4)}
            onChange={()=>handleCheckboxChange('rating',4)}
          />
          <Rating name="size-mall" defaultValue={4} readOnly/>
        </div>

        <div className="flex items-center">
          <FormControlLabel 
            value={3}
            control={<Checkbox />}
            checked={filters?.rating?.includes(3)}
            onChange={()=>handleCheckboxChange('rating',3)}
          />
          <Rating name="size-mall" defaultValue={3} readOnly/>
        </div>

        <div className="flex items-center">
          <FormControlLabel 
            value={2}
            control={<Checkbox />}
            checked={filters?.rating?.includes(2)}
            onChange={()=>handleCheckboxChange('rating',2)}
          />
          <Rating name="size-mall" defaultValue={2} readOnly/>
        </div>

        <div className="flex items-center">
          <FormControlLabel 
            value={1}
            control={<Checkbox />}
            checked={filters?.rating?.includes(1)}
            onChange={()=>handleCheckboxChange('rating',1)}
          />
          <Rating name="size-mall" defaultValue={1} readOnly/>
        </div>

      </div>
    </div>
  )
}
