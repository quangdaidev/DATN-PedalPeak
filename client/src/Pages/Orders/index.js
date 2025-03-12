import React, {useState} from 'react'
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
const Orders = () => {

  function createData(
    Ma_don_hang,
    Tong_tien,
    Ngay_dat,
    Sdt_nguoi_nhan,
    Dia_chi,
    Trang_thai,
   
  ) {
    return {
      Ma_don_hang,
      Tong_tien,
      Ngay_dat,
      Sdt_nguoi_nhan,
      Dia_chi,
      Trang_thai,
    
      Chi_tiet: [
        {
          Msp: 'SP00001',
          Tensp: 'Xe đạp thể thao CRV700',
          Anhsp: 'https://bizweb.dktcdn.net/100/412/747/products/z3798208191431-0bdcbd25d1be6c030414f35de4c430eb.jpg?v=168856301030',
          Giasp:12000000,
          Soluong:2,

        },
        {
          Msp: 'SP00001',
          Tensp: 'Xe đạp thể thao CRV700',
          Anhsp: 'https://bizweb.dktcdn.net/100/412/747/products/z3798208191431-0bdcbd25d1be6c030414f35de4c430eb.jpg?v=168856301030',
          Giasp:12000000,
          Soluong:2,

        }
      ],
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
          <TableCell align="center" component="th" scope="row">
            {row.Ma_don_hang}
          </TableCell>
          <TableCell align="right">{row.Tong_tien}</TableCell>
          <TableCell align="right">{row.Ngay_dat}</TableCell>
          <TableCell align="right">{row.Sdt_nguoi_nhan}</TableCell>
          <TableCell align="center">{row.Dia_chi}</TableCell>
          <TableCell align="center">{row.Trang_thai}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Chi tiết đơn hàng
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Mã sản phẩm</TableCell>
                      <TableCell align="center">Tên sản phẩm</TableCell>
                      <TableCell align="center">Hình ảnh</TableCell>
                      <TableCell align="right">Giá (VND)</TableCell>
                      <TableCell align="right">Số lượng</TableCell>
                      <TableCell align="right">Thành tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.Chi_tiet.map((historyRow) => (
                      <TableRow key={historyRow.Msp}>
                        <TableCell align="center" component="th" scope="row">
                          {historyRow.Msp}
                        </TableCell>
                        <TableCell align="center">{historyRow.Tensp}</TableCell>
                        <TableCell  align="center"> 
                          <img
                          alt="" src={historyRow.Anhsp}
                          className="img w-[100px] ml-12 rounded-md"
                          />
                        </TableCell>
                        <TableCell align="right">{historyRow.Giasp}</TableCell>
                        <TableCell align="right">{historyRow.Soluong}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.Soluong * historyRow.Giasp * 100) / 100}
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
  const rows = [
    createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
    createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
    createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
    createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
    createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
    createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
    createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
    createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
    createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
    createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
    createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
    createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
    createData('DH000001','24000000', '20-03-2025','0986572210', '24 Tân Khai Q11 Tp.HCM', 'đã nhận', 'đã nhận'),
  ];

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
                        Bạn có <span className="font-bold text-primary-600">2</span>{" "} 
                        đơn hàng
                    </p>

                    <div className="relative overflow-x-auto mt-5">
                      {/* <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="">
                          <tr>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Kích cỡ/Sizes
                              </th>
                              <td class="px-6 py-4">
                              One Size
                              </td>
                          </tr>
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Màu sắc/Colors	                                        </th>
                              <td class="px-6 py-4">
                              Green, White, Yellow
                              </td>
                          </tr>
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Chất liệu khung/Frame	                                        </th>
                              <td class="px-6 py-4">
                              Max Bike STL 24
                              </td>
                          </tr>
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Phuộc/Fork	                                        </th>
                              <td class="px-6 py-4">
                              Max Bike STL 24
                              </td>
                          </tr>
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Vành xe/Rims	                                        </th>
                              <td class="px-6 py-4">
                              ALU, Double Wall, 36H, Schrader valve
                              </td>
                          </tr>
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Đùm/Hubs	                                        </th>
                              <td class="px-6 py-4">
                              N/A
                              </td>
                          </tr>
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Lốp xe/Tires	                                        </th>
                              <td class="px-6 py-4">
                              24x2.125
                              </td>
                          </tr>
                        </tbody>
                      </table> */}
                      <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                          <TableHead>
                            <TableRow>
                              <TableCell />
                              <TableCell align="center">Mã đơn hàng</TableCell>
                              <TableCell align="right">Tổng tiền&nbsp;(VND)</TableCell>
                              <TableCell align="right">Ngày đặt hàng</TableCell>
                              <TableCell align="right">SĐT người nhận</TableCell>
                              <TableCell align="center">Địa chỉ giao hàng</TableCell>
                              <TableCell align="center">Trạng thái</TableCell>
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
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
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