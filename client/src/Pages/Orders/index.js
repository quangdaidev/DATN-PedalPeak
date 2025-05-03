import React, {useEffect, useState} from 'react'
import AccountSidebar from '../../Components/AccountSidebar';

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
import { fetchDataFromApi } from '../../utils/api';
import moment from 'moment';
import Chip from '@mui/material/Chip';

const Orders = () => {

  
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    fetchDataFromApi(`/api/order/order-list?token=${localStorage.getItem('accessToken')}`).then((res)=>{
      console.log("orderList::",res)
      if(res?.error===false){
        setOrders(res?.data.filter(order => order.payment_status!== "Thanh toán online thất bại"));
      }
    })
  },[])

  // let test = orders?.map(item => ({

  //   Msp: item.products.productId,
  //   Tensp: item.products.productTitle,
  //   Anhsp: item.products.image,
  //   Giasp: item.products.price,
  //   Soluong: item.products.quantity

  // }))

  // console.log("test::",test)

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

    // console.log("don hang",donHang)

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
        MauSp: item.colorChose

      }))
    
      // Chi_tiet: [
      //   {
      //     Msp: 'SP00001',
      //     Tensp: 'Xe đạp thể thao CRV700',
      //     Anhsp: 'https://bizweb.dktcdn.net/100/412/747/products/z3798208191431-0bdcbd25d1be6c030414f35de4c430eb.jpg?v=168856301030',
      //     Giasp:12000000,
      //     Soluong:2,

      //   },
      //   {
      //     Msp: 'SP00001',
      //     Tensp: 'Xe đạp thể thao CRV700',
      //     Anhsp: 'https://bizweb.dktcdn.net/100/412/747/products/z3798208191431-0bdcbd25d1be6c030414f35de4c430eb.jpg?v=168856301030',
      //     Giasp:12000000,
      //     Soluong:2,

      //   }
      // ],
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
          <TableCell sx={{width: '200px'}} align="left">{row.Tong_tien}</TableCell>
          <TableCell align="left">{row.Thanh_toan}</TableCell>
          <TableCell align="right">{VND.format(row.Ngay_dat)}</TableCell>
          <TableCell align="right">{row.Sdt_nguoi_nhan}</TableCell>
          <TableCell sx={{width: '100px'}} align="right">{row.Dia_chi}</TableCell>
          {/* Có thể là: "primary" | "secondary" | "error" | "info" | "success" | "warning"  hoặc "outlined" */}
          <TableCell align="left">
            {
              row.Trang_thai === "chờ xác nhận" ?
              <Chip label={row.Trang_thai} color="warning" variant="filled" size="small"/>
              :
              <Chip label={row.Trang_thai} color="success" variant="filled" size="small"/>
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
                      <TableCell align="left" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Màu</TableCell>
                      <TableCell align="center" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Hình ảnh</TableCell>
                     
                      <TableCell align="right" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Giá</TableCell>
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
                        <TableCell align="left" sx={{  }} className='text-l'>{historyRow.Tensp}</TableCell>
                        <TableCell align="left" sx={{ }} className='text-l'>{historyRow.MauSp}</TableCell>
                        <TableCell  align="center"> 
                          <img
                          alt="" src={historyRow.Anhsp}
                          className="img w-[100px] pl-0 rounded-md"
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

  
  // const rows = [
  //   createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
  //   createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
  //   createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
  //   createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
  //   createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
  //   createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
  //   createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
  //   createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
  //   createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
  //   createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
  //   createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
  //   createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
  //   createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
  // ];

  const rows = orders?.map(order => 
    createData(
      order._id,            // Mã đơn hàng
      order.delivery_address?.street + ", " +  order.delivery_address?.ward + ", " + order.delivery_address?.district + ", " + order.delivery_address?.city,        
      order.totalAmt,      // Tổng tiền
      moment(order.updatedAt).format('DD/MM/YYYY'),       // Ngày tạo đơn
      order.userId?.mobile,   
      order.payment_status ==="Thanh toán online thành công"? order.payment_status="Thanh toán online":order.payment_status,
      // Số điện thoại
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

  return (
    <section className="py-10 w-full mt-28">
      <div className="container flex gap-5">
          <div className="col1 w-[20%]">
              <AccountSidebar/>
          </div>

          <div className="col2 w-[80%]">
              <div className="shadow-md rounded-md  bg-white">
                  <div className="py-5 px-3 border-b border-[rgba(0,0,0,0.1)]">
                    <h2>Lịch sử đơn hàng</h2>
                    <p className="mt-> mb-0">
                        Bạn có <span className="font-bold text-primary-600">{orders?.length}</span>{" "} 
                        đơn hàng
                    </p>

                    <div className="relative overflow-x-auto mt-5">
                      <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                          <TableHead>
                            <TableRow>
                              <TableCell />
                              <TableCell align="left" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Mã đơn hàng</TableCell>
                              <TableCell align="left" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Địa chỉ giao hàng</TableCell>
                              <TableCell align="left" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Thanh toán</TableCell>
                              <TableCell align="right" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Tổng tiền</TableCell>
                              <TableCell align="right" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Ngày đặt</TableCell>
                              <TableCell align="right" style={{fontSize: '12px',  color: 'darkblue', fontWeight: 'bold', textTransform: 'uppercase'}}>Liên hệ</TableCell>
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

                      <TablePagination
                        rowsPerPageOptions={[5, 10,20,50, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        labelRowsPerPage="Số hàng mỗi trang"
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />

                    </div>
                  </div>

            
              </div>
          </div>
      </div>
    </section>
  )
}

export default Orders; 