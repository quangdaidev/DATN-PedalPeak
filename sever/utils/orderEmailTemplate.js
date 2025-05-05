const OrderEmail = (name, order) => {

    const productListHTML = order.products.map(product => `
        <tr>
          <td><img src="${product.image}" alt="${product.productTitle}" style="width: 60px; height: auto; border-radius: 4px;" /></td>
          <td>${product.productTitle}</td>
          <td>${product.quantity}</td>
          <td>${product.price.toLocaleString()} VND</td>
          <td>${(product.subTotal).toLocaleString()} VND</td>
        </tr>
    `).join('');

    return `
        <!DOCTYPE html>
            <html lang="vi">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Đơn hàng thành công</title>
                <style>
                    body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                    color: #333;
                    }
                    .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    }
                    .header {
                    text-align: center;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                    }
                    .header h1 {
                    color: #4CAF50;
                    }
                    .content {
                    font-size: 16px;
                    line-height: 1.5;
                    }
                    .order-info {
                    background-color: #f9f9f9;
                    padding: 10px 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                    }
                    .product-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                    }
                    .product-table th, .product-table td {
                    border: 1px solid #ddd;
                    padding: 10px;
                    text-align: left;
                    }
                    .product-table th {
                    background-color: #f2f2f2;
                    }
                    .footer {
                    text-align: center;
                    font-size: 14px;
                    color: #777;
                    margin-top: 30px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                    <h1>Đơn hàng của bạn đã được đặt thành công!</h1>
                    </div>
                    <div class="content">
                    <p>Xin chào <strong>${name}</strong>,</p>
                    <p>Cảm ơn bạn đã mua sắm tại <strong>PedalPeak</strong>. Dưới đây là thông tin đơn hàng của bạn:</p>
                    
                    <div class="order-info">
                        <p><strong>Mã đơn hàng:</strong> ${order._id}</p>
                        <p><strong>Ngày đặt:</strong> ${order.createdAt}</p>
                        <p><strong>Phương thức thanh toán:</strong> ${order.payment_status}</p>
                        <p><strong>Tổng tiền:</strong> ${order.totalAmt} VND</p>
                    </div>
                
                    <h3>Chi tiết sản phẩm</h3>
                    <table class="product-table">
                        <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Thành tiền</th>
                        </tr>
                        </thead>
                        <tbody>
                        ${productListHTML}
                        </tbody>
                    </table>
                
                    <p>Chúng tôi sẽ liên hệ lại khi đơn hàng của bạn được giao.</p>
                    </div>
                    <div class="footer">
                    <p>&copy; 2025 PedalPeak. Mọi quyền được bảo lưu.</p>
                    </div>
                </div>
            </body>
        </html>
    `;

};
export default OrderEmail; 