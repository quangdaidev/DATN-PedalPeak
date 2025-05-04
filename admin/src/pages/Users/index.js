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
import { editData, fetchDataFromApi, postData } from "../../utils/api";

import { IoInformationCircle } from "react-icons/io5";
import SearchBox from "../../components/SearchBox";
import { useContext } from "react";
import { MyContext } from "../../App";

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




const Users = () => {

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  // const [anchorEl, setAnchorEl] = useState(null);
  const [showBy, setshowBy] = useState("");
  // const open = Boolean(anchorEl);

  // const [productList, setProductList] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const context = useContext(MyContext);

  const [isShow, setIsShow] = useState(true);

  const [page,setPage] = useState();

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    
    setCurrentPage(value);  // Cập nhật trang hiện tại khi người dùng chọn trang khác
    // setPage(value);
    fetchDataFromApi(`/api/user/getAllUsersData?page=${value}&perPage=8`).then((res)=>{
      setUsersData(res.data);
      window.scrollTo({
        top: 200,
        behavior: 'smooth',
      })
    })
  };


  useEffect(() => {
    window.scrollTo(0, 0); //cuộn trang đến vị trí góc trên bên trái của trang

    fetchDataFromApi('/api/user/getAllUsersData?page=1&perPage=8').then((res)=>{
      setUsersData(res.data)
      setPage(res.totalPages)
      console.log(res.data)
    })
  }, []);

  const handleSortBy = (name,order,users,value)=>{
    
    postData(`/api/user/sortBy`,{
        users: users,
        sortBy: name,
        order: order,
    }).then((res)=>{
      setUsersData(res.data);
    })
  }

  const getAll=()=>{
    fetchDataFromApi('/api/user/getAllUsersData?page=1&perPage=8').then((res)=>{
      setUsersData(res.data)
      setPage(res.totalPages)
    })
  }

const userStatus=(status,id)=>{
    fetchDataFromApi(`/api/user/${id}`).then((res)=>{
      const user ={
          // userId: res.data._id,
          // products: res.data.products, 
          // paymentId: res.data.paymentId,
          // payment_status:res.data.payment_status, 
          // delivery_address: res.data.delivery_address,
          // totalAmt: res.data.totalAmt,
          // date: res.data.createAt,
          status: status
      }
      context.openAlertBox("success", "Cập nhật trạng thái thành công");
      editData(`/api/user/updateStatus/${id}`,user).then((res)=>{
        fetchDataFromApi('/api/user/getAllUsersData?page=1&perPage=8').then((res)=>{
          setUsersData(res.data)
          setPage(res.totalPages)
        })
      })
    })
  }

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Danh sách tài khoản người dùng</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Tổng quan"
              icon={<HomeIcon fontSize="small" />}
            />

            <StyledBreadcrumb
              label="Người dùng"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Danh sách người dùng</h3>
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
                    onClick={()=>handleSortBy('name','asc', usersData, 'Tên, từ A đến Z')}
                    className="!text-[13px] !text-black !capitalize"
                  >
                    Tên, từ A đến Z
                  </MenuItem>
              
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3">
              <h4>NHẬP TỪ KHÓA </h4>
              <SearchBox setData={setUsersData} api="user" setPage={setPage}/>
            </div>
          </div>

          <div className="table-responsive mt-3">
            <table className="table table-bordered table-striped v-align">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th>ẢNH ĐẠI DIỆN</th>
                  <th >TÊN NGƯỜI DÙNG</th>
                  <th>EMAIL</th>
                  <th>SĐT</th>
                  <th>TRẠNG THÁI</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                 {
                    usersData?.length!==0 && usersData?.map((item,index)=>{
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
                                  src={item.avatar !== "" ? item.avatar : "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/477713Dpz/anh-mo-ta.png"} 
                                  alt="" 
                                  width="110" 
                                  height="100" 
                                  style={{ borderRadius: '10px' }}  /* Bo góc ảnh */
                                />
                              </div>
                            </div>
                          </td>
                          <td>{item.name} </td>
                          <td>{item.email} </td>
                          <td>{item.mobile != null ? item.mobile : "Trống"} </td>                 
                          
                          <td>{item.status? "Hoạt động" : "Khóa"} </td>
                          <td>
                            <div className="actions d-flex align-items-center">
                              <Link to="#">                              
                                <Button className="secondary" color="secondary"
                                  onClick={()=>setIsShow(!isShow)}
                                  >
                                  {                                    
                                    item.status===true ?  <IoMdEye onClick={()=>userStatus("false",item._id)}/> :  <IoMdEyeOff onClick={()=>userStatus("true",item._id)}/>                                     
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

export default Users;
