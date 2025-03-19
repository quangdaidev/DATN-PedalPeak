
import MenuItem from "@mui/material/MenuItem";
import React, {  useEffect, useState } from "react";

import Button from "@mui/material/Button";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from '@mui/material/CircularProgress';
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from "@mui/material/Pagination";



import { Link } from "react-router-dom";

import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Checkbox from "@mui/material/Checkbox";
import { deleteData, editData, fetchDataFromApi } from "../../utils/api";

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

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

const Categories = () => {

  const [showBy, setshowBy] = useState("");
  const [showBysetCatBy, setCatBy] = useState("");


  const [catData, setCatData] = useState([]);
  const [open, setOpen] = useState(false);

  const [editId, setEditId] = useState(null);

  const [page,setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    name:"",
    images: [],
  });

  useEffect(() => {
    window.scrollTo(0, 0); //cuộn trang đến vị trí góc trên bên trái của trang

    fetchDataFromApi('/api/category').then((res)=>{
      setCatData(res.data)
      console.log(res.data)
    })
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

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

  const editCategory=(id)=>{
    setFormFields({
      name:"",
      images:"",
    });
    setOpen(true)
    setEditId(id);
    // console.log("jjjjj",id)

    fetchDataFromApi(`/api/category/${id}`).then((res)=>{
      // console.log("dfdfdf",res.data)
      setFormFields({
        name:res.data.name,
        images:res.data.images,
      });
    })
  }

  const categoryEditFun=(e)=>{
    e.preventDefault();
    setIsLoading(true);

    setTimeout(()=>{
      editData(`/api/category/${editId}`,formFields).then((res)=>{

        fetchDataFromApi('/api/category').then((res)=>{
          setCatData(res.data);
          // console.log(res.data)
          setOpen(false);
          setIsLoading(false);
        })
      })
    },3000)
  };

  const deleteCat=(id)=>{
    deleteData(`/api/category/${id}`).then(res=>{
      fetchDataFromApi('/api/category').then((res)=>{
        setCatData(res.data);
        // console.log(res.data)
        fetchDataFromApi('/api/category').then((res)=>{
          setCatData(res.data);
          // console.log(res.data)
        })
      })
    })
  }

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Danh sách danh mục</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="#"
            />

            <StyledBreadcrumb
              label="Categories"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </div>

        <div className="card shadow border-0 p-3 mt-4">

          <div className="row cardFilters mt-3">
            <div className="col-md-3">
              <h4>SHOW BY</h4>
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
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="col-md-3">
              <h4>CATEGORY BY</h4>
              <FormControl size="small" className="w-100">
                <Select
                  value={showBysetCatBy}
                  onChange={(e) => setCatBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  labelId="demo-select-small-label"
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="table-responsive mt-3">
            <table className="table table-bordered table-striped v-align">
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th style={{ width: "300px" }}>HÌNH ẢNH</th>
                  <th>TÊN DANH MỤC</th>
                  <th>CHỨC NĂNG</th>
                </tr>
              </thead>

              <tbody>
              {
                catData?.length!==0 && catData?.map((item,index)=>{
                  return(
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <Checkbox {...label} /> <span>#{index+1}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center productBox">
                          <div className="imgWrapper">
                            <div className="img card shadow m-0">
                              <img
                                src={item.images[0]} alt=""
                                className="w-100"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{item.name} </td>
                      <td>
                        <div className="actions d-flex align-items-center">
                          <Link to="/product/details">
                            <Link to="/product/details">
                              <Button className="secondary" color="secondary">
                                <FaEye />
                              </Button>
                            </Link>
                          </Link>
                          <Button className="success" color="success" onClick={()=>editCategory(item._id)}>
                            <FaPencilAlt />
                          </Button>
                          <Button className="error" color="error" onClick={()=>deleteCat(item._id)}>
                            <MdDelete />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
               

              </tbody>
            </table>

            <div className="d-flex tableFooter">
              <p>
                hiển thị <b>{page}</b> trong <b>{catData?.length}</b> kết quả
              </p>
              <Pagination
                count={page}
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
        <DialogTitle>Cập nhật danh mục</DialogTitle>
        <form>
          <DialogContent>
            <TextField
              value={formFields.name}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Tên danh mục"
              type="text"
              fullWidth
              onChange={changeInput}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="images"
              name="images"
              label="Hình ảnh"
              type="text"
              fullWidth
              value={formFields.images}
              onChange={addImgUrl}
            />
          </DialogContent>
        </form>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Hủy</Button>
          <Button type="button" onClick={categoryEditFun} variant="contained">
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

export default Categories;
