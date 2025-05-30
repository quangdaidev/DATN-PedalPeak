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

    const [categoryVal, setcategoryVal] = useState('');
    const [ratingsValue,setRatingValue] = useState(1);
    const [isFeaturedValue, setIsFeaturedValue] = useState(false);

    const handleChangeCategory = (event) => {
        setcategoryVal(event.target.value);
    };

    const handleChangeIsFeaturedValue = (event) => {
        setIsFeaturedValue(event.target.value);
    };

    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Tạo sản phẩm</h5>
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

                <form className='form'>
                    <div className='row'>
                        <div className='col-sm-9'>
                            <div className='card p-4'>
                                <h5 className='mb-4'>Thông tin sản phẩm</h5>

                                <div className='form-group'>
                                    <h6>TÊN SẢN PHẨM</h6>
                                    <input type='text' />
                                </div>

                                <div className='form-group'>
                                    <h6>MÔ TẢ</h6>
                                    <textarea rows={5} cols={10} />
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
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </div>
                                    </div>


                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>THƯƠNG HIỆU</h6>
                                            <Select
                                                value={categoryVal}
                                                onChange={handleChangeCategory}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='w-100'
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                </div>


                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>GIÁ GỐC</h6>
                                            <input type='text' />
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>GIÁ KHUYẾN MÃI </h6>
                                            <input type='text' />
                                        </div>
                                    </div>
                                </div>



                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>SẢN PHẨM NỔI BẬT </h6>
                                            <Select
                                                value={isFeaturedValue}
                                                onChange={handleChangeIsFeaturedValue}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='w-100'
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={true}>True</MenuItem>
                                                <MenuItem value={false}>False</MenuItem>
                                            </Select>
                                        </div>                                     

                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>SẢN PHẨM TỒN KHO </h6>
                                            <input type='text' />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>XẾP HẠNG</h6>
                                            <Rating
                                                name="simple-controlled"
                                                value={ratingsValue}
                                                onChange={(event, newValue) => {
                                                    setRatingValue(newValue);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>ẢNH SẢN PHẨM </h6>
                                            <input type='text' />
                                        </div>
                                    </div>
                                </div>

                                <br/>

                                <Button className="btn-blue btn-lg btn-big"><FaCloudUploadAlt/> &nbsp; TẠO MỚI</Button>

                            </div>
                        </div>


                      
                    </div>

                    
                </form>

            </div>
        </>
    )
}

export default ProductUpload;