import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useState, useContext } from 'react';
import { MyContext } from "../../App";
import Rating from '@mui/material/Rating';
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from '@mui/material/Button';
// import axios from 'axios';
import { IoCloseSharp } from "react-icons/io5";
// import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';


import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FaRegImages } from "react-icons/fa";
import { deleteImages, fetchDataFromApi, postData } from '../../utils/api';
// import { useNavigate } from 'react-router-dom';

//breadcrumb code
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const ProductUpload = () => {

    const context = useContext(MyContext);

    const [categoryVal, setcategoryVal] = useState('');
    // const [subCatVal, setSubCatVal] = useState('');
    const [ratingsValue, setRatingValue] = useState(1);
    const [productColor, setProductColor] = useState([]);
    const [isFeaturedValue, setIsFeaturedValue] = useState('');

    const [catData, setCatData] = useState([]);

    // const history = useNavigate(MyContext);

    const [imgFiles, setImgFiles] = useState();
    const [previews, setPreviews] = useState([]);

    const [formFields, setFormFields] = useState({
        name:"",
        description:"",
        images:[],
        brand:"",
        price:"",
        oldPrice:"",
        catName:"",
        catId:"",
        subCatId:"",
        subCatName:"",
        thirdsubCat:"",
        thirdsubCatId:"",
        // countInStock:"",
        // rating:0,
        isFeatured: null,
        discount: "",
        // color:[],
        productWeight:"",
    })

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0); //cuộn trang đến vị trí góc trên bên trái của trang
    
        fetchDataFromApi('/api/category').then((res)=>{
          setCatData(res.data)
          console.log(res.data)
        })
    },[]);

    const handleChangeCategory = (event) => {
        setcategoryVal(event.target.value);
        formFields.catId=event.target.value
        // alert(event.target.value)
    };

    const selectCatByName=(name)=>{
        formFields.catName=name
    }

    // const handleChangeSubCategory = (event) => {
    //     setSubCatVal(event.target.value);
    // };

    const formdata = new FormData();

    useEffect(()=>{

        if(!imgFiles) return;

        let tmp = [];
        for(let i=0; i<imgFiles.length; i++){
            tmp.push(URL.createObjectURL(imgFiles[i]));
        }

        const objectUrls = tmp;
        setPreviews(objectUrls);

        for(let i=0; i<objectUrls.length; i++){
            return()=>{
                URL.revokeObjectURL(objectUrls[i])
            }
        }
    },[imgFiles])

    // useEffect(()=>{
    //     console.log("effect::::",formFields.images)
    //     setFormFields(formFields);
       
    // },[formFields])

    const handleChangeProductColor = (event) => {
        const {
            target: { value },
        } = event;
        setProductColor(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        formFields.color = value;
    };

    const handleChangeIsFeaturedValue = (event) => {
        setIsFeaturedValue(event.target.value);
        formFields.isFeatured=event.target.value
    };

    const onChangeFile = async(e, apiEndPoint) => {
        try {
            const imgArr = [];
            let files= [];
            files = e.target.files;
            setImgFiles(e.target.files);

            for (var i = 0; i < files.length; i++) { 
                const file = files[i];
                imgArr.push(file);
                formdata.append(`images`, file);
        }
        
        // setFiles(imgArr);

        await postData(apiEndPoint, formdata).then((res) => {
            console.log("res::::",res)
            formFields.images = res.images
            setPreviews(res.images);
            console.log("formFields",formFields)
        });
        } catch (error) {
            console.log(error)
        }
    }

    const onChangeInput= (e) => {
        const {name, value} = e.target;
        setFormFields(()=>{
            return{
                ...formFields,
                [name]:value
            }
        })
    }

    const removeImg = async (image, index) => {
        var imageArr = [];
        imageArr = previews;
        await deleteImages(`/api/product/deleteImage?img=${image}`).then((res) => {
            imageArr.splice (index, 1);
            console.log("delete res::::",res)
            
            console.log("remove::::::", imageArr)
            setPreviews ([]);

            setTimeout(()=>{
                setPreviews(imageArr);
                setFormFields(()=>{
                    return{
                        ...formFields,
                        images: previews
                    }
                })
            },100)
           
         })

    }
        

    const addProduct = async (e) => {
        e.preventDefault();
        // console.log("add",formFields)

        if(formFields.name===""){
            context.openAlertBox(
                "error",
                "Bạn chưa nhập tên sản phẩm"
            )
            setIsLoading(false);
            return false;
        }

        if(formFields.description===""){
            context.openAlertBox(
                "error",
                "Bạn chưa nhập mô tả sản phẩm"
            )
            setIsLoading(false);
            return false;
        }

        if(categoryVal==null ||categoryVal==="" ){
            context.openAlertBox(
                "error",
                "Bạn chưa nhập danh mục sản phẩm"
            )
            setIsLoading(false);
            return false;
        }

        if(formFields.oldPrice===""){
            context.openAlertBox(
                "error",
                "Bạn chưa nhập giá sản phẩm"
            )
            setIsLoading(false);
            return false;
        }

        if(formFields.price===""){
            context.openAlertBox(
                "error",
                "Bạn chưa nhập giá khuyến mãi sản phẩm"
            )
            setIsLoading(false);
            return false;
        }

   

        if(formFields.brand===""){
            context.openAlertBox(
                "error",
                "Bạn chưa nhập thương hiệu sản phẩm"
            )
            setIsLoading(false);
            return false;
        }

        if(isFeaturedValue==null ||isFeaturedValue===""){
            context.openAlertBox(
                "error",
                "Bạn chưa chọn sản phẩm nổi bật"
            )
            setIsLoading(false);
            return false;
        }
      
        // if(formFields.countInStock===""){
        //     context.openAlertBox(
        //         "error",
        //         "Bạn chưa nhập số lượng sản phẩm"
        //     )
        //     setIsLoading(false);
        //     return false;
        // }

        // if(productColor.length === 0){
        //     context.openAlertBox(
        //         "error",
        //         "Bạn chưa chọn màu sản phẩm"
        //     )
        //     setIsLoading(false);
        //     return false;
        // }

        // if(formFields.rating===0){
        //     context.openAlertBox(
        //         "error",
        //         "Bạn chưa xếp hạng sản phẩm"
        //     )
        //     setIsLoading(false);
        //     return false;
        // }

   

        if(formFields.images.length===0){
            context.openAlertBox(
                "error",
                "Bạn chưa chọn ảnh sản phẩm"
            )
            setIsLoading(false);
            return false;
        }

        setIsLoading(true);

        setTimeout(()=>{
            postData('/api/product/create',formFields).then((res)=>{   
                console.log("post::::",res)
                context.openAlertBox("success", res?.message);
            // history("/product")

            setIsLoading(false);

            setImgFiles(true);

            setFormFields({
                name:'',
                description:'',
                images:[],
                brand:'',
                price:'',
                oldPrice:'',
                category:'',
                // countInStock:'',
                // color:'',
                // rating:'',
                isFeatured: null,
            })
            setProductColor([]);
            
            })
        },3000)
    }

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 res-col">
                    <h5 className="mb-0">Tạo mới sản phẩm</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Tổng quan"
                            icon={<HomeIcon fontSize="small" />}
                        />

                        <StyledBreadcrumb
                            component="a"
                            label="Sản phẩm"
                            href="#"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                        <StyledBreadcrumb
                            label="Tạo mới"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>
                <form className='form'  onSubmit={addProduct}>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='card p-4 mt-0'>
                                <h5 className='mb-4'>Thông tin sản phẩm</h5>

                                <div className='form-group'>
                                    <h6>TÊN SẢN PHẨM</h6>
                                    <input type='text' name="name" value={formFields.name} onChange={onChangeInput}/>
                                </div>

                                <div className='form-group'>
                                    <h6>MÔ TẢ</h6>
                                    <textarea rows={5} cols={10} name="description" value={formFields.description} onChange={onChangeInput}/>
                                </div>


                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>DANH MỤC</h6>
                                            <Select
                                                value={categoryVal}
                                                onChange={handleChangeCategory}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='w-100'
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>Chọn</em>
                                                </MenuItem>
                                                {
                                                    catData?.length!==0 && catData?.map((cat,index)=>{
                                                        return(
                                                            <MenuItem 
                                                                className="text-capitalize" 
                                                                value={cat._id} key={index} 
                                                                onClick={()=>selectCatByName(cat.name)} >{cat.name}
                                                            </MenuItem>
                                                        )
                                                    })
                                                }                                       
                                            </Select>
                                        </div>
                                    </div>



                                    {/* <div className='col'>
                                        <div className='form-group'>
                                            <h6>SUB CATEGORY</h6>
                                            <Select
                                                value={subCatVal}
                                                onChange={handleChangeSubCategory}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='w-100'
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>None</em>
                                                </MenuItem>

                                                <MenuItem className="text-capitalize" value="Jeans">Jeans</MenuItem>

                                                <MenuItem className="text-capitalize" value="Shirts">Shirts</MenuItem>

                                            </Select>
                                        </div>
                                    </div> */}

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>GIÁ GỐC</h6>
                                            <input type='number' name="oldPrice" value={formFields.oldPrice} onChange={onChangeInput}/>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>GIÁ KHUYẾN MÃI </h6>
                                            <input type='number' name="price" value={formFields.price} onChange={onChangeInput}/>
                                        </div>
                                    </div>

                                </div>


                                <div className='row'>

                                    <div className='col-md-4'>                                     
                                        <div className='form-group'>
                                            <h6>THƯƠNG HIỆU</h6>
                                            <input type='text' name="brand" value={formFields.brand} onChange={onChangeInput}/>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6 className='text-uppercase'>SẢN PHẨM NỔI BẬT? </h6>
                                            <Select
                                                value={isFeaturedValue}
                                                onChange={handleChangeIsFeaturedValue}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='w-100'
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>Chọn</em>
                                                </MenuItem>
                                                <MenuItem value={true}>Có</MenuItem>
                                                <MenuItem value={false}>Không</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className='col'>
                                       
                                    </div>


                                    {/* <div className='col'>
                                        <div className='form-group'>
                                            <h6>TỒN KHO </h6>
                                            <input type='number' name="countInStock" value={formFields.countInStock} onChange={onChangeInput}/>
                                        </div>
                                    </div>

                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <h6>DISCOUNT</h6>
                                            <input type='text' name="discount" />
                                        </div>
                                    </div> */}

                                </div>

                                {/* <div className='row'>                   
                                   

                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <h6>MÀU SẮC</h6>
                                            <Select
                                                multiple
                                                value={productColor}
                                                onChange={handleChangeProductColor}
                                                displayEmpty
                                                className='w-100'

                                                MenuProps={MenuProps}
                                            >                                        
                                                <MenuItem value="Xanh">Xanh</MenuItem>
                                                <MenuItem value="Đen" >Đen</MenuItem>
                                                <MenuItem value="Trắng" >Trắng</MenuItem>
                                                <MenuItem value="Xám" >Xám</MenuItem>
                                                <MenuItem value="Hồng" >Hồng</MenuItem>
                                                <MenuItem value="Đen Xanh">Đen Xanh</MenuItem>
                                                <MenuItem value="Đen Đỏ" >Đen Đỏ</MenuItem>
                                                <MenuItem value="Trắng Tím" >Trắng Tím</MenuItem>
                                                <MenuItem value="Trắng Đỏ" >Trắng Đỏ</MenuItem>
                                                <MenuItem value="Xanh Đen" >Xanh Đen</MenuItem>
                                                <MenuItem value="Gi Vàng" >Gi Vàng</MenuItem>
                                                <MenuItem value="Cam" >Cam</MenuItem>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <h6>XẾP HẠNG</h6>                                        
                                            <Rating
                                                name="rating"
                                                precision={0.5}
                                                value={ratingsValue}
                                                onChange={(event, newValue) => {
                                                    setRatingValue(newValue);
                                                    setFormFields(()=>({
                                                        ...formFields,
                                                        rating:newValue
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </div>

                                </div> */}


                                <div className='row'>


                                </div>

                            </div>

                        </div>

                    </div>

                    <div className='card p-4 mt-0'>
                        <div className="imagesUploadSec">
                            <h5 class="mb-4">ẢNH SẢN PHẨM</h5>

                            <div className='imgUploadBox d-flex align-items-center'>

                                {
                                    previews?.length !== 0 && previews?.map((item, index) => {
                                        return (
                                            <div className='uploadBox' key={index}>
                                                <span className="remove" onClick={() => removeImg(item, index)}><IoCloseSharp /></span>
                                                <div className='box'>
                                                    <LazyLoadImage
                                                        alt={"image"}
                                                        effect="blur"
                                                        className="w-100"
                                                        src={item} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                                <div className='uploadBox'>
                                    <input type="file" multiple name="images" onChange={(e) => onChangeFile(e, '/api/product/uploadImages')} />
                                    <div className='info'>
                                        <FaRegImages />
                                        <h5>chọn ảnh</h5>
                                    </div>
                                </div>
                            </div>

                            <br />

                            <Button type="submit" className="btn-blue btn-lg btn-big w-100"><FaCloudUploadAlt /> &nbsp;  
                                {
                                    isLoading===true 
                                    ? <CircularProgress color="inherit" className="ml-2 loader"/>
                                    : 'TẠO MỚI'
                                } 
                            </Button>
                        </div>
                    </div>
                </form>

            </div>
        </>
    )
}

export default ProductUpload;