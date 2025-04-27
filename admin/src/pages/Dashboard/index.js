import DashboardBox from "./components/dashboardBox";
import { HiDotsVertical } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdShoppingBag } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
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
import SearchBox from "../../components/SearchBox";
import OrdersDashboard from "../OrdersDashboard";

const Dashboard = () => {

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const [anchorEl, setAnchorEl] = useState(null);
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

  //Doanh thu trong tháng hiên tại

  const now = new Date();
  const currentMonth = now.getMonth(); // 0-indexed (0 = Tháng 1)
  const currentYear = now.getFullYear();

  const revenueMonth = totalOrdersData
  ?.filter(order => {
    const orderDate = new Date(order.updatedAt); // đổi sang Date object
    return (
      order.order_status === "hoàn thành" &&
      orderDate.getMonth() === currentMonth &&
      orderDate.getFullYear() === currentYear
    );
  }).reduce((sum, order) => sum + Number(order.totalAmt), 0);

  //Doanh thu trong tuần hiện tại

  const currentWeekStart = new Date(now);

  currentWeekStart.setDate(now.getDate() - now.getDay()); // Bắt đầu từ Chủ nhật; +1 để bắt đầu thứ 2
  currentWeekStart.setHours(0, 0, 0, 0);

  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 7); // Kết thúc thứ Bảy

  const revenueWeek = totalOrdersData
    ?.filter(order => {
      const orderDate = new Date(order.updatedAt);
      return (
        order.order_status === "hoàn thành" &&
        orderDate >= currentWeekStart &&
        orderDate < currentWeekEnd
      );
    })
    .reduce((sum, order) => sum + Number(order.totalAmt), 0);

  //Doanh thu trong ngày hiện tại
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Đặt về đầu ngày (00:00)

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Ngày kế tiếp để làm mốc kết thúc

  const revenueToday = totalOrdersData
    ?.filter(order => {
      const orderDate = new Date(order.updatedAt);
      return (
        order.order_status === "hoàn thành" &&
        orderDate >= today &&
        orderDate < tomorrow
      );
    })
    .reduce((sum, order) => sum + Number(order.totalAmt), 0);

  // Biểu đồ doanh thu theo quý

  const [selectedSortVal, setSelectedSortVal] = useState(currentYear);

  const years = [
    ...new Set(
      totalOrdersData
        ?.filter(order => order.order_status === "hoàn thành")
        .map(order => new Date(order.updatedAt).getFullYear())
    )
  ].sort((a, b) => b - a);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortBy = (value) => {
    setAnchorEl(null);
    setSelectedSortVal(value);
  };

  const revenueBySelectedYear = totalOrdersData
  ?.filter(order => {
    const orderDate = new Date(order.updatedAt); // hoặc order.order_date
    return (
      order.order_status === "hoàn thành" &&
      orderDate.getFullYear() === selectedSortVal
    );
  })
  .reduce((sum, order) => sum + Number(order.totalAmt), 0);

  // Hàm tính quý
  const getQuarter = (month) => {
    if (month >= 0 && month <= 2) return 1;
    if (month >= 3 && month <= 5) return 2;
    if (month >= 6 && month <= 8) return 3;
    if (month >= 9 && month <= 11) return 4;
  };

  // Khởi tạo đối tượng để lưu tổng tiền theo từng quý
  const revenueByQuarter = { 1: 0, 2: 0, 3: 0, 4: 0 };

  // Lọc đơn hàng "hoàn thành" trong năm người dùng chọn và tính tổng tiền theo quý
  totalOrdersData
    ?.filter(order => {
      const orderDate = new Date(order.updatedAt); // Hoặc order.order_date
      const orderYear = orderDate.getFullYear();
      return order.order_status === "hoàn thành" && orderYear === selectedSortVal;
    })
    .forEach(order => {
      const orderDate = new Date(order.updatedAt);
      const orderQuarter = getQuarter(orderDate.getMonth());
      revenueByQuarter[orderQuarter] += Number(order.totalAmt); // Cộng tổng tiền vào quý tương ứng
    });

  // const data = Object.entries(revenueByQuarter).map(([quarter, total]) => ({
  //   Year: `Quý ${quarter}`,
  //   Sales: total
  // }));

  const data = [
    ["Year", "Sales"],
    ["quý 1", revenueByQuarter[1]],
    ["quý 2", revenueByQuarter[2]],
    ["quý 3", revenueByQuarter[3]],
    ["quý 4", revenueByQuarter[4]],
  ];
  
  const options = {
    backgroundColor: "transparent",
    chartArea: { width: "100%", height: "100%" },
  };

  //Biểu đồ so sánh doanh thu các năm
  const [selectedYear1, setSelectedYear1] = useState(currentYear);

  const [selectedYear2, setSelectedYear2] = useState();

  const handleYear1 = (value) => {
    setSelectedYear1(value);
  };

  const handleYear2 = (value) => {
    setSelectedYear2(value);
  };

  // Khởi tạo đối tượng lưu doanh thu theo từng tháng (1-12)

  const [showBy1, setshowBy1] = useState(currentYear);
  const [showBy2, setshowBy2] = useState("");

  const revenueByMonth1 = {
    1: 0, 2: 0, 3: 0, 4: 0,
    5: 0, 6: 0, 7: 0, 8: 0,
    9: 0, 10: 0, 11: 0, 12: 0
  };

  const revenueByMonth2 = {
    1: 0, 2: 0, 3: 0, 4: 0,
    5: 0, 6: 0, 7: 0, 8: 0,
    9: 0, 10: 0, 11: 0, 12: 0
  };

// Lọc đơn hàng "hoàn thành" trong năm đã chọn và tính tổng tiền theo tháng
totalOrdersData
  ?.filter(order => {
    const orderDate = new Date(order.updatedAt); // Hoặc order.order_date
    const orderYear = orderDate.getFullYear();
    return order.order_status === "hoàn thành" && orderYear === selectedYear1;
  })
  .forEach(order => {
    const orderDate = new Date(order.updatedAt);
    const month = orderDate.getMonth() + 1; // getMonth() trả về từ 0-11
    revenueByMonth1[month] += Number(order.totalAmt); // Cộng tổng tiền vào tháng tương ứng
  });

  totalOrdersData
  ?.filter(order => {
    const orderDate = new Date(order.updatedAt); // Hoặc order.order_date
    const orderYear = orderDate.getFullYear();
    return order.order_status === "hoàn thành" && orderYear === selectedYear2;
  })
  .forEach(order => {
    const orderDate = new Date(order.updatedAt);
    const month = orderDate.getMonth() + 1; // getMonth() trả về từ 0-11
    revenueByMonth2[month] += Number(order.totalAmt); // Cộng tổng tiền vào tháng tương ứng
  });

  const dataNew = [
    ["Name", "Popularity"],
    ["Tháng 1", revenueByMonth1[1]],
    ["Tháng 2", revenueByMonth1[2]],
    ["Tháng 3", revenueByMonth1[3]],
    ["Tháng 4", revenueByMonth1[4]],
    ["Tháng 5", revenueByMonth1[5]],
    ["Tháng 6", revenueByMonth1[6]],
    ["Tháng 7", revenueByMonth1[7]],
    ["Tháng 8", revenueByMonth1[8]],
    ["Tháng 9", revenueByMonth1[9]],
    ["Tháng 10", revenueByMonth1[10]],
    ["Tháng 11", revenueByMonth1[11]],
    ["Tháng 12", revenueByMonth1[12]],
  ];
  
  const dataOld = [
    ["Name", "Popularity"],
    ["Tháng 1", revenueByMonth2[1]],
    ["Tháng 2", revenueByMonth2[2]],
    ["Tháng 3", revenueByMonth2[3]],
    ["Tháng 4", revenueByMonth2[4]],
    ["Tháng 5", revenueByMonth2[5]],
    ["Tháng 6", revenueByMonth2[6]],
    ["Tháng 7", revenueByMonth2[7]],
    ["Tháng 8", revenueByMonth2[8]],
    ["Tháng 9", revenueByMonth2[9]],
    ["Tháng 10", revenueByMonth2[10]],
    ["Tháng 11", revenueByMonth2[11]],
    ["Tháng 12", revenueByMonth2[12]],
  ];
  
  const diffdata = {
    old: dataOld,
    new: dataNew,
  };

  return (
    <>
      <div className="right-content w-100 ">
        <div className="row dashboardBoxWrapperRow">  
          <div className="col-md-8">
            <div className="dashboardBoxWrapper d-flex mb-4">
              <DashboardBox
                color={["#c012e2", "#eb64fe"]}
                icon={<IoMdCart />}
                grow={true}
                title={"Đơn hàng chờ xử lý"}
                number={orderNew?.length}
                width="calc(25% - 20px)"
              />
              <DashboardBox
                color={["#2c78e5", "#60aff5"]}
                icon={<MdShoppingBag />}
                grow={true}
                width="calc(25% - 20px)"
                title={"Tổng sản phẩm"}
                number={proData?.length}
              />
              <DashboardBox
                color={["#e1950e", "#f3cd29"]}
                icon={<GiStarsStack />}
                grow={true}
                width="calc(25% - 20px)"
                title={"Danh mục sản phẩm"}
                number={catData?.length}
              />
              <DashboardBox
                color={["#1da256", "#48d483"]}
                icon={<FaUserCircle />}
                grow={true}
                width="calc(25% - 20px)"
                title={"Tổng người dùng"}
                number={users?.length}
              />
              
            </div>
            <div className="dashboardBoxWrapper d-flex">
              <DashboardBox
                color={["#646D7E", "#98AFC7"]}
                icon={<GiReceiveMoney />}
                grow={true}
                width="calc(33.33% - 20px)"
                title={"Doanh thu tháng này"}
                number={VND.format(revenueMonth)}
              />
              <DashboardBox
                color={["#646D7E", "#98AFC7"]}
                icon={<GiReceiveMoney />}
                grow={true}
                width="calc(33.33% - 20px)"
                title={"Doanh thu tuần này"}
              //  number={proData?.length}
              number={VND.format(revenueWeek)}
              />
              <DashboardBox
                color={["#646D7E", "#98AFC7"]}
                icon={<GiReceiveMoney />}
                grow={true}
                width="calc(33.33% - 20px)"
                title={"Doanh thu hôm nay"}
                number={VND.format(revenueToday)}
              />
            </div>
          </div>

          <div className="col-md-4 pl-0 topPart2">
            <div className="box graphBox">
              <div className="d-flex align-items-center w-100 bottomEle">
                <h6 className="text-white mb-0 mt-0">Tổng doanh thu trong năm {selectedSortVal}</h6>
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
                    {years.map((year) => (
                      <MenuItem key={year} onClick={()=>handleSortBy(year)}>
                        <IoIosTimer /> Theo năm {year}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </div>

              <h3 className="text-white font-weight-bold">{VND.format(revenueBySelectedYear)}</h3>
              <br></br>
              <br></br>

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
          {/* <h3 className="hd">Biểu đồ so sánh doanh thu theo tháng</h3> */}
          <div className="row cardFilters mt-3">
            <div className="col-8 d-flex align-items-center gap-8">
              <h4 className="">Biểu đồ so sánh doanh thu theo tháng của năm</h4>
              <FormControl size="small" className="px-3 flex-grow-1">
                <Select
                  value={showBy1}
                  onChange={(e) => setshowBy1(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  labelId="demo-select-small-label"
                  className="w-100"
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year} onClick={()=>handleYear1(year)}>
                    {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <h4>và</h4>
              <FormControl size="small" className="pl-3 flex-grow-1">
                <Select
                  value={showBy2}
                  onChange={(e) => setshowBy2(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  labelId="demo-select-small-label"
                  className="w-100"
                >
                  <MenuItem value="">
                  <em>Chọn </em>
                  </MenuItem>
                  {years.map((year) => (
                    <MenuItem key={year} value={year} onClick={()=>handleYear2(year)}>
                    {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="400px"
            diffdata={diffdata}
          />

          <div className="row cardFilters mt-3">                  
           
          </div>

        </div>
        <OrdersDashboard />
      </div>
    </>
  );
};

export default Dashboard;
