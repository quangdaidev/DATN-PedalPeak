import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';


import { useState } from 'react';

import { FaCloudUploadAlt } from "react-icons/fa";
import Button from '@mui/material/Button';
import { postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';


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

const ProductUpload = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        name:"",
        images: [],
    });

    const history = useNavigate();

    const changeInput = (e)=>{
        setFormFields(()=>(
            {
                ...formFields, //sao chép tất cả các giá trị hiện tại trong đối tượng formFields
                [e.target.name]:e.target.value //cập nhật một trường dữ liệu trong đối tượng formFields
            }
        ))
    }

    const addImgUrl = (e)=>{
        const arr =[];
        arr.push(e.target.value);
        setFormFields(()=>(
            {
                ...formFields, //sao chép tất cả các giá trị hiện tại trong đối tượng formFields
                [e.target.name]:arr //cập nhật một trường dữ liệu trong đối tượng formFields
            }
        ))
    }

    const addCategory = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(()=>{
            postData('/api/category/create',formFields).then(res=>{
                // console.log(res);
                setIsLoading(false);
                history('/category');
            })
        },3000)
    }
   
    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Tạo mới danh mục</h5>
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
                        <div className='col-sm-9'>
                            <div className='card p-4'>

                                <div className='form-group'>
                                    <h6>Tên danh mục</h6>
                                    <input type='text' name="name" onChange={changeInput}/>
                                </div>

                                <div className='form-group'>
                                    <h6>Hình ảnh</h6>
                                    <input type='text' name="images" onChange={addImgUrl}/>
                                </div>

                                <br/>

                                <Button type="submit" className="btn-blue btn-lg btn-big"><FaCloudUploadAlt/> &nbsp; 
                                 {
                                    isLoading===true 
                                    ? <CircularProgress color="inherit" className="ml-2 loader"/>
                                    : 'TẠO MỚI'
                                }
                                </Button>

                            </div>
                        </div>
                      
                    </div>
                </form>

            </div>
        </>
    )
}

export default ProductUpload;