import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from '@mui/material/Button';
import axios from 'axios';
import { IoCloseSharp } from "react-icons/io5";
import OutlinedInput from '@mui/material/OutlinedInput';


import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FaRegImages } from "react-icons/fa";

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

    const [categoryVal, setcategoryVal] = useState('');

    const addCategory = (e) => {
        e.preventDefault();
        alert();
    }

    const handleChangeCategory = (event) => {
        setcategoryVal(event.target.value);
    };


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
                                    <input type='text' name="name" />
                                </div>


                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>Danh mục cấp 1</h6>
                                            <Select
                                                value={categoryVal}
                                                onChange={handleChangeCategory}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='w-100'
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>Không</em>
                                                </MenuItem>
                                                <MenuItem className="text-capitalize" value="Men"
                                                >AAAAAAA</MenuItem>


                                                <MenuItem className="text-capitalize"
                                                    value="Women"
                                                >BBBBBBB</MenuItem>

                                                <MenuItem className="text-capitalize"
                                                    value="Kids"
                                                >CCCCCCC</MenuItem>

                                            </Select>
                                        </div>
                                    </div>


                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6 className='text-uppercase'>Trạng thái</h6>
                                            <Select
                                                value={categoryVal}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='w-100'
                                            >
                                                <MenuItem value="">
                                                    <em value={null}>Hiện</em>
                                                </MenuItem>                                             
                                                <MenuItem value={false}>Ẩn</MenuItem>
                                            </Select>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>


                    <div className='card p-4 mt-0'>
                        <div className="imagesUploadSec">
                            <h5 class="mb-4">Hình ảnh</h5>

                            <div className='imgUploadBox d-flex align-items-center'>

                                <div className='uploadBox'>
                                    <span className="remove"><IoCloseSharp /></span>
                                    <div className='box'>
                                        <LazyLoadImage
                                            alt={"image"}
                                            effect="blur"
                                            className="w-100"
                                            src={'https://xedapgiakho.com/wp-content/uploads/2024/06/Xe-Dap-Dia-Hinh-MTB-Califa-CS500-26-Inch-11-600x398.jpg'} />
                                    </div>
                                </div>




                                <div className='uploadBox'>
                                    <input type="file" multiple name="images" />
                                    <div className='info'>
                                        <FaRegImages />
                                        <h5>tải ảnh</h5>
                                    </div>

                                </div>


                            </div>

                        </div>
                        <br />

                    </div>
                    <Button type="submit" className="btn-blue btn-lg btn-big w-100">
                        <FaCloudUploadAlt /> &nbsp; TẠO MỚI 
                    </Button>
                </form>

            </div>
        </>
    )
}

export default CategoryAdd;