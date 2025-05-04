// import { HiDotsVertical } from "react-icons/hi";
import {  FaCloud } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdShoppingBag } from "react-icons/md";
// import { GiStarsStack } from "react-icons/gi";
// import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useEffect, useState } from "react";
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
import { deleteData, editData, fetchDataFromApi, postData } from "../../utils/api";

import { IoInformationCircle } from "react-icons/io5";
import SearchBox from "../../components/SearchBox";
import { MyContext } from "../../App";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';

import { TiDeleteOutline } from "react-icons/ti";

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

  const context = useContext(MyContext);

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
      console.log("proData",res.data)
    })
  }, []);

  const handleSortBy = (name,order,products,value)=>{
    
    postData(`/api/product/sortBy`,{
        products: products,
        sortBy: name,
        order: order,
    }).then((res)=>{
      setProData(res.data);
    })
  }

  const getAll=()=>{
    fetchDataFromApi('/api/product/getAllProducts?page=1&perPage=8').then((res)=>{
      setProData(res.data)
      setPage(res.totalPages)
    })
  }

  const productStatus=(status,id,color)=>{
      fetchDataFromApi(`/api/product/${id}`).then((res)=>{
        const product ={
            // userId: res.data._id,
            // products: res.data.products, 
            // paymentId: res.data.paymentId,
            // payment_status:res.data.payment_status, 
            // delivery_address: res.data.delivery_address,
            // totalAmt: res.data.totalAmt,
            // date: res.data.createAt,
            status: status
        }

        if(color>0){
          context.openAlertBox("success", "Cập nhật trạng thái thành công");
          editData(`/api/product/${id}`,product).then((res)=>{
            fetchDataFromApi(`/api/product/getAllProducts?page=${currentPage}&perPage=8`).then((res)=>{
              setProData(res.data);
              window.scrollTo({
                top: 200,
                behavior: 'smooth',
              })
            })
          })
        } else {
          context.openAlertBox("error", "Bạn chưa cập nhật màu");
        }
        
      })
  }

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

 

  const [formFields, setFormFields] = useState({
    name:"",
    countInStock:"",
    productId:""
  });

  const addColor=(id)=>{
    // setFormFields({
    //   name:"",
    //   images:"",
    // });
    setOpen(true)
    formFields.productId = id
    // setEditId(id);
    // // console.log("jjjjj",id)

    // fetchDataFromApi(`/api/category/${id}`).then((res)=>{
    //   // console.log("dfdfdf",res.data)
    //   setFormFields({
    //     name:res.data.name,
    //     images:res.data.images,
    //   });
    // })
  }

  const onChangeInput = (e) => {
    const {name, value} = e.target;
    setFormFields(()=>{
      return {
          ...formFields,
          [name]: value
      }
    })
  }

  const addColorEditFun=(e)=>{
    e.preventDefault();
    setIsLoading(true);

    console.log("color",formFields)

    if (formFields.color === "") {
      context.openAlertBox("error", "Vui lòng điền tên màu");
      return false
    }

    if (formFields.countInStock === "") {
      context.openAlertBox("error", "Vui nhập số lượng" );
      return false
    }


    postData(`/api/productColor/add`, formFields).then((res) => {
        console.log("proColor::",res)
        if(res?.error !== true) {
          setTimeout(()=>{
            setIsLoading(false);
            setOpen(false);
          },500)
          // console.log("success",res?.message)
          context.openAlertBox("success", res?.message);
          

          fetchDataFromApi('/api/product/getAllProducts?page=1&perPage=8').then((res)=>{
            setProData(res.data)
            setPage(res.totalPages)
            setFormFields({
              name:"",
              countInStock:"",
              productId:""
            })
            ;
          })
        } else {
          context.openAlertBox("error", res?.data?.message);
          setIsLoading(false);
        }
    })   
          
  };

  const deleteColor=(id)=>{
    
    deleteData(`/api/productColor/${id}`).then(res=>{
      if(res?.error !== true) {
        context.openAlertBox("success", res?.message);
        fetchDataFromApi('/api/product/getAllProducts?page=1&perPage=8').then((res)=>{
          setProData(res.data)
          setPage(res.totalPages)
        })
      }else {
        context.openAlertBox("error", res?.data?.message);
      }
    })
  }

  

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
                  <MenuItem value="" onClick={()=>getAll()}>
                    <em>Tất cả </em>
                  </MenuItem>
                  <MenuItem 
                    value="Tên, từ A đến Z"
                    onClick={()=>handleSortBy('name','asc', proData, 'Tên, từ A đến Z')}
                    className="!text-[13px] !text-black !capitalize"
                  >
                    Tên, từ A đến Z
                  </MenuItem>
                  <MenuItem 
                    value="Giá, từ thấp đến cao"
                    onClick={()=>handleSortBy('price','asc',proData, 'Giá, từ thấp đến cao')}
                    className="!text-[13px] !text-black !capitalize"
                  >
                    Giá, từ thấp đến cao
                  </MenuItem>
                  <MenuItem 
                    value="Giá, từ cao đến thấp"
                    onClick={()=>handleSortBy('price','desc',proData, 'Giá, từ cao đến thấp')}
                    className="!text-[13px] !text-black !capitalize"
                  >
                    Giá, từ cao đến thấp
                  </MenuItem>
                  <MenuItem 
                    value="Sản phẩm nổi bật"
                    onClick={()=>handleSortBy('isFeatured','asc',proData, 'Sản phẩm nổi bật')}
                    className="!text-[13px] !text-black !capitalize"
                  >
                    Sản phẩm nổi bật
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3">
              <h4>NHẬP TỪ KHÓA </h4>
              <SearchBox setData={setProData} api="product" setPage={setPage}/>
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
                  <th>BIẾN THỂ MÀU</th>
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

                          <td>
                            {item.color.length >0 ?
                              <div style={{ width: "120px" }}>
                                {item.color?.map((c, index) => (
                                  <div key={index} class="d-flex align-items-center ">
                                    <div>
                                      <TiDeleteOutline onClick={()=>deleteColor(item.color[index]._id)} style={{cursor: 'pointer', color: "red", fontSize: "18px" }}/>
                                    </div>
                                    <div style={{ marginLeft: '4px' }}>
                                      {c.name} - SL: {c.countInStock}
                                    </div>
                                  </div>
                                ))}
                              </div>
                          
                              :
                              <div>Chưa nhập màu</div>
                            }
                            
                          </td>
                          <td>
                            <Rating
                              name="read-only"
                              defaultValue={(item.reviews.reduce((sum, review) => sum + Number(review.rating), 0))/ item.reviews.length}
                              // precision={0.5}
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
                                     item?.status===true ?  <IoMdEye onClick={()=>productStatus("false",item._id,item.color.length)}/> :  <IoMdEyeOff onClick={()=>productStatus("true",item._id,item.color.length)}/>
                                  }                          
                                </Button>                             
                              </Link>

                              <Link to={""}>
                                <Button className="error" color="error"  onClick={()=>addColor(item._id)}>
                                  <FaCloud/>
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

      
      <Dialog
      className="editModal"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>Cập nhật màu</DialogTitle>
        <form>
          <DialogContent>
            
          <TextField
              // value={formFields.name}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Tên màu"
              type="text"
              fullWidth
              onChange={onChangeInput}
            />
             <TextField
              // value={formFields.name}
              autoFocus
              required
              margin="dense"
              id="countInStock"
              name="countInStock"
              label="Số lượng"
              type="text"
              fullWidth
              onChange={onChangeInput}
            />
          </DialogContent>

        </form>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Hủy</Button>
          <Button type="button" onClick={addColorEditFun} variant="contained">
            {
              isLoading===true 
              ? <CircularProgress color="inherit" className="loader"/>
              : ' Cập nhật'
            }
          </Button>
        </DialogActions>

        <br/>
      </Dialog>
    </>
  );
};

export default Products;
