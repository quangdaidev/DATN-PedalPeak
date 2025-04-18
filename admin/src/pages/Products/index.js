// import { HiDotsVertical } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdShoppingBag } from "react-icons/md";
// import { GiStarsStack } from "react-icons/gi";
// import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
// import { IoIosTimer } from "react-icons/io";
import Button from "@mui/material/Button";
// import { Chart } from "react-google-charts";

// import InputLabel from "@mui/material/InputLabel";
// import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
// import { MyContext } from "../../App";

import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import {IoMdEye} from "react-icons/io";
import {IoMdEyeOff} from "react-icons/io";

import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardBox from "../Dashboard/components/dashboardBox";

import Checkbox from "@mui/material/Checkbox";
import { fetchDataFromApi } from "../../utils/api";

import { IoInformationCircle } from "react-icons/io5";
import SearchBox from "../../components/SearchBox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

//breadcrumb code
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});




const Products = () => {

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  // const [anchorEl, setAnchorEl] = useState(null);
  const [showBy, setshowBy] = useState("");
  const [showBysetCatBy, setCatBy] = useState("");
  // const open = Boolean(anchorEl);

  // const [productList, setProductList] = useState([]);
  const [proData, setProData] = useState([]);

  const [isShow, setIsShow] = useState(true);

  const [page,setPage] = useState();

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    
    setCurrentPage(value);  // Cập nhật trang hiện tại khi người dùng chọn trang khác
    // setPage(value);
    fetchDataFromApi(`/api/product/getAllProducts?page=${value}&perPage=8`).then((res)=>{
      setProData(res.data);
      window.scrollTo({
        top: 200,
        behavior: 'smooth',
      })
    })
  };


  useEffect(() => {
    window.scrollTo(0, 0); //cuộn trang đến vị trí góc trên bên trái của trang

    fetchDataFromApi('/api/product/getAllProducts?page=1&perPage=8').then((res)=>{
      setProData(res.data)
      setPage(res.totalPages)
      console.log(res.data)
    })
  }, []);


  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Danh sách sản phẩm</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Tổng quan"
              icon={<HomeIcon fontSize="small" />}
            />

            <StyledBreadcrumb
              label="Sản phẩm"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Danh sách sản phẩm</h3>
          <div className="row cardFilters mt-3">
            <div className="col-md-3">
              <h4>HIỂN THỊ THEO</h4>
              <FormControl size="small" className="w-100">
                <Select
                  value={showBy}
                  onChange={(e) => setshowBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  labelId="demo-select-small-label"
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>Chọn </em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3">
              <h4>NHẬP TỪ KHÓA </h4>
              <SearchBox />
            </div>
          </div>

          <div className="table-responsive mt-3">
            <table className="table table-bordered table-striped v-align">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th>ẢNH SẢN PHẨM</th>
                  <th style={{ width: "300px" }}>TÊN SẢN PHẨM</th>
                  <th>DANH MỤC</th>
                  <th>THƯƠNG HIỆU</th>
                  <th>GIÁ</th>
                  <th>TỒN KHO</th>
                  <th>XẾP HẠNG</th>
                  <th>NỔI BẬT</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                 {
                    proData?.length!==0 && proData?.map((item,index)=>{
                      return(
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <Checkbox {...label} /> <span>#{index+1}</span>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex justify-content-center align-items-center ">
                              <div>
                                <img
                                  src={item.images[0]} 
                                  alt="" 
                                  width="110" 
                                  height="100" 
                                  style={{ borderRadius: '10px' }}  /* Bo góc ảnh */
                                />
                              </div>
                            </div>
                          </td>
                          <td>{item.name} </td>
                          <td>{item.catName} </td>
                          <td>{item.brand} </td>
                          <td>
                            {
                              item.price !== 0 ?
                              <div  style={{ width: "90px" }}>
                                <del className="old"> {VND.format(item.oldPrice)} </del>
                                <span className="new text-danger"> {VND.format(item.price)}</span>
                              </div>
                              :
                              <div  style={{ width: "90px" }}>
                                <span className="new text-danger"> {VND.format(item.oldPrice)}</span>
                              </div>
                            }
                           
                          
                          </td>
                          <td>{item.countInStock} </td>
                          <td>
                            <Rating
                              name="read-only"
                              defaultValue={item.rating}
                              precision={0.5}
                              size="small"
                              readOnly
                            />
                          </td>
                          <td>{item.isFeatured? "Có" : "Không"} </td>
                          <td>
                            <div className="actions d-flex align-items-center">

                              <Link to={`/product/details/${item._id}`}>
                                <Button className="primary" color="primary">
                                  <IoInformationCircle />
                                </Button>  
                              </Link>                 
                            
                              <Link to={`/product/${item._id}`}>
                                <Button className="success" color="success">
                                  <FaPencilAlt />
                                </Button>
                              </Link>

                              <Link to="#">                              
                                <Button className="secondary" color="secondary"
                                  onClick={()=>setIsShow(!isShow)}
                                  >
                                  {
                                      isShow===true ?  <IoMdEye/> :  <IoMdEyeOff/>
                                  }                          
                                </Button>                             
                              </Link>
{/* 
                              <Button className="error" color="error">
                                <MdDelete />
                              </Button> */}

                             
                    
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  }
              </tbody>
            </table>

            <div className="d-flex tableFooter">
              {/* <p>
                hiển thị <b>{page}</b> trong <b>{proData?.length}</b> kết quả
              </p> */}
              <Pagination
                count={page}
                page={currentPage} // Trang hiện tại
                onChange={handlePageChange} // Hàm gọi khi thay đổi trang
                color="primary"
                className="pagination"
                showFirstButton
                showLastButton
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
