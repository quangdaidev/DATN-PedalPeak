import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import TablePagination from '@mui/material/TablePagination';
import { editData, fetchDataFromApi, postData } from '../../utils/api';
import moment from 'moment';
import Chip from '@mui/material/Chip';
import { useContext } from 'react';
import { MyContext } from '../../App';
import SearchBox from '../../components/SearchBox';

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const OrdersDashboard = ()=>{

    const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    });
    
    const [orders, setOrders] = useState([]);

    const context = useContext(MyContext);

    const [singleOrder, setSingleOder] = useState();

    const [showBy, setshowBy] = useState("");
    
    useEffect(()=>{
    fetchDataFromApi('/api/order/getAllOrders').then((res)=>{
        console.log("orderList::",res)
        if(res?.error===false){
            const pendingOrders = res.data.filter(order => order.order_status === "chờ xác nhận" && order.payment_status !== "Thanh toán online thất bại");
            setOrders(pendingOrders);
        }
    })
    },[])


    function createData(
        Ma_don_hang,
        Tong_tien,
        Ngay_dat,
        Sdt_nguoi_nhan,
        Dia_chi,
        Thanh_toan,
        Trang_thai,
       
      ) {
        const donHang = orders.find(order => order._id === Ma_don_hang);
    
        // console.log("gggg",donHang)
    
        return {
            Ma_don_hang,
            Tong_tien,
            Ngay_dat,
            Sdt_nguoi_nhan,
            Dia_chi,
            Thanh_toan,
            Trang_thai,
        
            Chi_tiet: donHang.products.map(item => ({
        
                Msp: item.productId,
                Tensp: item.productTitle,
                Anhsp: item.image,
                Giasp: item.price,
                Soluong: item.quantity,
                Mausp: item.colorChose
            }))
        };
    }

    function Row(props) {
     
        const { row } = props;
        const [open, setOpen] = useState(false);
    
        return (
            <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                {row.Ma_don_hang}
                </TableCell>
                <TableCell sx={{width: '260px'}} align="left">{row.Tong_tien}</TableCell>
                <TableCell align="left">{row.Thanh_toan}</TableCell>
                <TableCell align="right">{VND.format(row.Ngay_dat)}</TableCell>
                <TableCell align="right">{row.Sdt_nguoi_nhan}</TableCell>
                <TableCell align="right">{row.Dia_chi}</TableCell>
                {/* Có thể là: "primary" | "secondary" | "error" | "info" | "success" | "warning"  hoặc "outlined" */}
                <TableCell align="left">
                    {
                        row.Trang_thai === "chờ xác nhận" ?
                        <Chip label={row.Trang_thai} color="warning" variant="filled" size="small" onClick={()=>orderStatus("đang giao",row.Ma_don_hang)}/>
                        :
                        <Chip label={row.Trang_thai} color="success" variant="filled" size="small" onClick={()=>orderStatus("hoàn thành",row.Ma_don_hang)}/>
                    }
                
                </TableCell> 
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                    <Typography variant="12px"  sx={{fontWeight: 'bold', color: 'darkgoldenrod' }} gutterBottom component="div">
                        Chi tiết đơn hàng
                    </Typography>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                        <TableRow>
                            <TableCell align="left" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Mã sản phẩm</TableCell>
                            <TableCell align="left" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Tên sản phẩm</TableCell>
                            <TableCell align="left" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Màu sản phẩm</TableCell>
                            <TableCell align="center" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Hình ảnh</TableCell>
                           
                            <TableCell align="right" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Giá (VND)</TableCell>
                            <TableCell align="right" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Số lượng</TableCell>
                            <TableCell align="right" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Thành tiền</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {row.Chi_tiet.map((historyRow) => (
                            <TableRow key={historyRow.Msp}>
                            <TableCell align="left" component="th" scope="row">
                                {historyRow.Msp}
                            </TableCell>
                            <TableCell align="left" sx={{ width: '200px' }} className='text-l'>{historyRow.Tensp}</TableCell>
                            <TableCell align="left" sx={{ }} className='text-l'>{historyRow.Mausp}</TableCell>
                            <TableCell  align="center" sx={{ width: '260px' }} className='img card shadow m-0'> 
                                <img
                                alt="" src={historyRow.Anhsp}
                                className="w-50 h-50" 
                                />
                            </TableCell>
                           
                            <TableCell align="right">{VND.format(historyRow.Giasp)}</TableCell>
                            <TableCell align="right">{historyRow.Soluong}</TableCell>
                            <TableCell align="right">
                                {VND.format(Math.round(historyRow.Soluong * historyRow.Giasp * 100) / 100)}
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
            </React.Fragment>
        );
    }
  
    const rows = orders?.map(order => 
        createData(
            order._id,            // Mã đơn hàng
            order.delivery_address?.street + ", " +  order.delivery_address?.ward + ", " + order.delivery_address?.district + ", " + order.delivery_address?.city,        
            order.totalAmt,      // Tổng tiền
            moment(order.updatedAt).format('DD/MM/YYYY'),       // Ngày tạo đơn
            order.delivery_address?.mobile,           // Số điện thoại
            order.payment_status ==="Thanh toán online thành công"? order.payment_status="Đã thanh toán online":order.payment_status,
            order.order_status,          // Trạng thái đơn
        )
    );

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const orderStatus=(status,id)=>{
        fetchDataFromApi(`/api/order/${id}`).then((res)=>{
            const order ={
                // userId: res.data._id,
                // products: res.data.products, 
                // paymentId: res.data.paymentId,
                // payment_status:res.data.payment_status, 
                // delivery_address: res.data.delivery_address,
                // totalAmt: res.data.totalAmt,
                // date: res.data.createAt,
                order_status: status
            }
            context.openAlertBox("success", "Cập nhật trạng thái thành công");
            editData(`/api/order/${id}`,order).then((res)=>{
                fetchDataFromApi('/api/order/getAllOrders').then((res)=>{
                    if(res?.error===false){
                        setOrders(res.data.filter(order => order.order_status === "chờ xác nhận"));
                    }
                })
            })
            
            setSingleOder(res.data)
        })
    }

   

    const handleSortBy = (name,order,orders,value)=>{
        postData(`/api/order/sortBy`,{
            orders: orders,
            sortBy: name,
            order: order
        }).then((res)=>{
            setOrders(res?.data);
            // setAnchorEl(null)
        })
    }

    return(
        <div className="w-100">
            <div className="card shadow border-0 p-3 mt-4">
                <h4 className="mb-0 ">Danh sách đơn hàng chưa xử lý</h4>
                <div className="row cardFilters mt-3">
                    <div className="col-10 d-flex align-items-center gap-8">
                        <div>HIỂN THỊ THEO</div>
                        <FormControl size="small" className="px-3 w-25">
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
                                <MenuItem 
                                    value="Tổng tiền, từ thấp đến cao"
                                    onClick={()=>handleSortBy('totalAmt','asc',orders, 'Tổng tiền, từ thấp đến cao')}
                                    className="!text-[13px] !text-black !capitalize"
                                >
                                    Tổng tiền, từ thấp đến cao
                                </MenuItem>
                                <MenuItem 
                                    value="Tổng tiền, từ cao đến thấp"
                                    onClick={()=>handleSortBy('totalAmt','desc',orders, 'Tổng tiền, từ cao đến thấp')}
                                    className="!text-[13px] !text-black !capitalize"
                                >
                                    Tổng tiền, từ cao đến thấp
                                </MenuItem>
                                <MenuItem 
                                    value="Ngày đặt hàng, từ mới đến cũ"
                                    onClick={()=>handleSortBy('createdAt','desc',orders, 'Ngày đặt hàng, từ mới đến cũ')}
                                    className="!text-[13px] !text-black !capitalize"
                                >
                                    Ngày đặt hàng, từ mới đến cũ
                                </MenuItem>
                                <MenuItem 
                                    value="Ngày đặt hàng, từ cũ đến mới"
                                    onClick={()=>handleSortBy('createdAt','asc',orders, 'Ngày đặt hàng, từ cũ đến mới')}
                                    className="!text-[13px] !text-black !capitalize"
                                >
                                    Ngày đặt hàng, từ cũ đến mới
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <div className="pr-3">TÌM MÃ ĐƠN HÀNG </div>
                        <SearchBox setData={setOrders} api="order"/>
                    </div>
                    
                </div>
                        
                        
                <div className="table-responsive mt-3">
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell align="left" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Mã đơn hàng</TableCell>
                                <TableCell align="left" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Địa chỉ giao hàng</TableCell>
                                <TableCell align="left" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Thanh toán</TableCell>
                                <TableCell align="right" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Tổng tiền&nbsp;(VND)</TableCell>
                                <TableCell align="right" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Ngày đặt hàng</TableCell>
                                <TableCell align="right" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>SĐT người nhận</TableCell>
                                <TableCell align="left" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Trạng thái</TableCell>
                            </TableRow>
                            </TableHead>    
                            <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                              <Row key={row.name} row={row} />
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div className="d-flex tableFooter justify-content-end">
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Số hàng mỗi trang"
                    />
                </div>
            </div>
        </div>
    )
}

export default  OrdersDashboard;