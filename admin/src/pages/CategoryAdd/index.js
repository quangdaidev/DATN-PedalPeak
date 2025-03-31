import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState, useContext, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from '@mui/material/Button';
import axios from 'axios';
import { IoCloseSharp } from "react-icons/io5";
import OutlinedInput from '@mui/material/OutlinedInput';


import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FaRegImages } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';
import { deleteImages, postData } from '../../utils/api';

import CircularProgress from '@mui/material/CircularProgress';

import { MyContext } from "../../App";



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

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

const CategoryAdd = () => {

    const history = useNavigate();
    
    const context = useContext(MyContext);

    const [previews, setPreviews] = useState([]);
    const [imgFiles, setImgFiles] = useState();
    const formdata = new FormData();
    const [statusValue, setStatusValue] = useState('');

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



    const handleChangeCategory = (event) => {
        setStatusValue(event.target.value);
    };

    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        name:"",
        images: [],
        status: null,
    });


    const changeInput = (e)=>{
        setFormFields(()=>(
            {
                ...formFields, //sao chép tất cả các giá trị hiện tại trong đối tượng formFields
                [e.target.name]:e.target.value //cập nhật một trường dữ liệu trong đối tượng formFields
            }
        ))
    }


    const removeImg = async (image, index) => {
        var imageArr = [];
        imageArr = previews;
        await deleteImages(`/api/category/deleteImage?img=${image}`).then((res) => {
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

    const onChangeFile = async(e, apiEndPoint) => {
        try {
            const imgArr = [];
            const files = e.target.files;
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

    const handleChangeStatusValue = (event) => {
        setStatusValue(event.target.value);
        formFields.status=event.target.value
    };

    const addCategory = (e) => {

        e.preventDefault();

        if(formFields.name===""){
            context.openAlertBox(
                "error",
                "Bạn chưa nhập tên danh mục"
            )
            setIsLoading(false);
            return false;
        }

        if(statusValue==null ||statusValue===""){
            context.openAlertBox(
                "error",
                "Bạn chưa chọn trạng thái danh mục"
            )
            setIsLoading(false);
            return false;
        }

        if(formFields.images.length===0){
            context.openAlertBox(
                "error",
                "Bạn chưa chọn ảnh danh mục"
            )
            setIsLoading(false);
            return false;
        }

        console.log("add::::",formFields)
        setIsLoading(true);

        setTimeout(()=>{
            postData('/api/category/create',formFields).then((res)=>{   
                console.log("post::::",res)
                context.openAlertBox("success", res?.message);
            // history("/product")

            setIsLoading(false);

            setImgFiles(true);

            setFormFields({
                name:"",
                images: [],
                status: null,
            })
            
            })
        },3000)
    }
    

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 res-col">
                    <h5 className="mb-0">Tạo mới</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Tổng quan"
                            icon={<HomeIcon fontSize="small" />}
                        />

                        <StyledBreadcrumb
                            component="a"
                            label="Danh mục"
                            href="#"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                        <StyledBreadcrumb
                            label="Tạo mới"
                            deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>
                <form className='form' onSubmit={addCategory}>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='card p-4 mt-0'>

                                <div className='form-group'>
                                    <h6>Tên danh mục</h6>
                                    <input type='text' name="name" value={formFields.name} onChange={changeInput}/>
                                </div>


                                <div className='row'>                           

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6 className='text-uppercase'>Trạng thái</h6>
                                            <Select
                                                value={statusValue}
                                                onChange={handleChangeStatusValue}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='w-100'
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>Chọn</em>
                                                </MenuItem>      
                                                <MenuItem value={true}>Hiện</MenuItem>                                       
                                                <MenuItem value={false}>Ẩn</MenuItem>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className='col'>
                                    </div>
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
                                    <input type="file" name="images" onChange={(e) => onChangeFile(e, '/api/category/uploadImages')} />
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

export default CategoryAdd;