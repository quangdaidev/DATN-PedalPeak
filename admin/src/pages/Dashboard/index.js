import DashboardBox from "./components/dashboardBox";
import { HiDotsVertical } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdShoppingBag } from "react-icons/md";
import { GiStarsStack } from "react-icons/gi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useEffect, useState } from "react";
import { IoIosTimer } from "react-icons/io";
import Button from "@mui/material/Button";
import { Chart } from "react-google-charts";

// import InputLabel from "@mui/material/InputLabel";
// import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import { MyContext } from "../../App";

import Rating from "@mui/material/Rating";
import { fetchDataFromApi } from "../../utils/api";
import Orders from "../Orders";

export const data = [
  ["Year", "Sales", "Expenses"],
  ["2013", 1000, 400],
  ["2014", 1170, 460],
  ["2015", 660, 1120],
  ["2016", 1030, 540],
];

export const options = {
  backgroundColor: "transparent",
  chartArea: { width: "100%", height: "100%" },
};

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showBy, setshowBy] = useState("");
  const [showBysetCatBy, setCatBy] = useState("");
  const open = Boolean(anchorEl);

  const ITEM_HEIGHT = 48;

  const context = useContext(MyContext);

  const [totalOrdersData, setTotalOrdersData] = useState([]);
  const [users,setUsers] = useState([]);
  const [proData, setProData] = useState([]);
  const [catData, setCatData] = useState([]);


  useEffect(() => {
    context.setisHideSidebarAndHeader(false);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchDataFromApi("/api/user/getAllUsers").then((res)=>{
      if(res?.error === false){
        setUsers(res?.data)
      }
    })

    fetchDataFromApi('/api/product/getAllProducts').then((res)=>{
      setProData(res.data)
    })

    fetchDataFromApi('/api/category').then((res)=>{
      setCatData(res.data)
    })

    fetchDataFromApi('/api/order/getAllOrders').then((res)=>{
      setTotalOrdersData(res.data)
    })
  },[])

  let orderNew = totalOrdersData?.filter(order => order.order_status === "chờ xác nhận");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="row dashboardBoxWrapperRow">
          <div className="col-md-8">
            <div className="dashboardBoxWrapper d-flex">
              <DashboardBox
                color={["#c012e2", "#eb64fe"]}
                icon={<IoMdCart />}
                grow={true}
                title={"Đơn hàng chờ xử lý"}
                number={orderNew?.length}
              />
              <DashboardBox
                color={["#2c78e5", "#60aff5"]}
                icon={<MdShoppingBag />}
                grow={true}
                title={"Tổng sản phẩm"}
               number={proData?.length}
              />
              <DashboardBox
                color={["#e1950e", "#f3cd29"]}
                icon={<GiStarsStack />}
                grow={true}
                title={"Danh mục sản phẩm"}
                number={catData?.length}
              />
              <DashboardBox
                color={["#1da256", "#48d483"]}
                icon={<FaUserCircle />}
                grow={true}
                title={"Tổng người dùng"}
                number={users?.length}
              />
              
            </div>
          </div>

          <div className="col-md-4 pl-0 topPart2">
            <div className="box graphBox">
              <div className="d-flex align-items-center w-100 bottomEle">
                <h6 className="text-white mb-0 mt-0">Total Sales</h6>
                <div className="ml-auto">
                  <Button className="ml-auto toggleIcon" onClick={handleClick}>
                    <HiDotsVertical />
                  </Button>
                  <Menu
                    className="dropdown_menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Day
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Week
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Month
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Year
                    </MenuItem>
                  </Menu>
                </div>
              </div>

              <h3 className="text-white font-weight-bold">$3,787,681.00</h3>
              <p>$3,578.90 in last month</p>

              <Chart
                chartType="PieChart"
                width="100%"
                height="170px"
                data={data}
                options={options}
              />
            </div>
          </div>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          {/* <h3 className="hd">Best Selling Products</h3> */}

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
                    
            <Orders/>
          </div>

        </div>
        
      </div>
    </>
  );
};

export default Dashboard;
