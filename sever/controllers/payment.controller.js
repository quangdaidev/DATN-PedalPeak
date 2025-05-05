import moment from 'moment';
import qs from 'qs';
import crypto from 'crypto';
import OrderModel from "../models/order.model.js"; 
import ProductColorModel from '../models/productColor.model.js';
import UserModel from "../models/user.model.js";
import OrderEmail from "../utils/orderEmailTemplate.js";
import sendEmailFun from "../config/sendEmail.js";

export const payment = async (req, res) => { 

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    
    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    
    let tmnCode = "14QVDL9N";
    let secretKey = "57G56MRY30CVNJ9MC3S0S24IXJJGK2ZG";
    let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    let returnUrl = "http://localhost:4000/api/payment/vnpay_return";
    let orderId = moment(date).format('DDHHmmss');
    let amount = req.body.amount;
    // let bankCode = req.body.bankCode;
    
    // let locale = req.body.language;
    // if(locale === null || locale === ''){
    //     locale = 'vn';
    // }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale']   = "vn";
    vnp_Params['vnp_CurrCode'] = "VND";
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount* 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = "127.0.0.1"; //https://api.ipify.org/?format=json
    vnp_Params['vnp_CreateDate'] = createDate;

    // if(bankCode !== null && bankCode !== ''){
    //     vnp_Params['vnp_BankCode'] = bankCode;
    // }

    function sortObject(obj) {
        let sorted = {};
        let str = [];
        let key;
        for (key in obj){
            if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    }

    vnp_Params = sortObject(vnp_Params);

    
    let signData = qs.stringify(vnp_Params, { encode: false });
       
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    // vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });
    // res.redirect(vnpUrl)

    let finalUrl = vnpUrl + '?' + qs.stringify(vnp_Params, { encode: false });

    // Trả về URL cho client
    res.json({ data: finalUrl});
}

export const paymentReturn = async (req, res) => {
   
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    function sortObject(obj) {
        let sorted = {};
        let str = [];
        let key;
        for (key in obj){
            if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    }

    vnp_Params = sortObject(vnp_Params);

    let tmnCode = "14QVDL9N";
    let secretKey = "57G56MRY30CVNJ9MC3S0S24IXJJGK2ZG";

    let signData = qs.stringify(vnp_Params, { encode: false });    
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     

    if(secureHash === signed){

        const paymentId = vnp_Params['vnp_TxnRef'];

        if(vnp_Params['vnp_ResponseCode'] ==="00"){
            try {
                const order = await OrderModel.findOne({ 
                    paymentId: paymentId, 
                    payment_status: "Chờ thanh toán online" 
                });
        
                if (!order) {
                    return res.status(404).json({ message: "Không tìm thấy đơn hàng hoặc đơn hàng đã được xử lý" });
                }
        
                // Cập nhật trạng thái thanh toán
                order.payment_status = "Thanh toán online thành công";

                for (let i = 0; i <  order.products.length; i++) {

                    const productColor = await ProductColorModel.findOne({ _id: order.products[i].colorChoseId  });      
              
                    const newStock = parseInt(productColor.countInStock - order.products[i].quantity);
                        
                    await ProductColorModel.findOneAndUpdate(
                        { _id: order.products[i].colorChoseId },
                        {
                            countInStock: newStock,
                        },
                        { new: true }
                    );
                    
                }

                await order.save();

                const user = await UserModel.findById(order.userId)

                const content = await sendEmailFun({
                    to: user.email,
                    subject: "Chi tiết đơn hàng từ trang web PedalPeak",
                    text: "",
                    html: OrderEmail(user.name, order)
                });
        
                // Trả về kết quả cho VNPAY
                // return res.status(200).json({ code: vnp_Params['vnp_ResponseCode'] });
                return res.status(200).json( "Thanh toán online thành công, chi tiết đơn hàng đã gửi qua mail" );
            } catch (error) {
                console.error("Lỗi xử lý thanh toán:", error);
                return res.status(500).json({ code: '99', message: "Lỗi hệ thống" });
            }
        }


        if(vnp_Params['vnp_ResponseCode'] ==="24"){
            try {
                const order = await OrderModel.findOne({ 
                    paymentId: paymentId, 
                    payment_status: "Chờ thanh toán online" 
                });
        
                if (!order) {
                    return res.status(404).json({ message: "Không tìm thấy đơn hàng hoặc đơn hàng đã được xử lý" });
                }
        
                // Cập nhật trạng thái thanh toán
                order.payment_status = "Thanh toán online thất bại";
                await order.save();
        
                // Trả về kết quả cho VNPAY
                return res.status(200).json( "Hủy thanh toán thành công" );
            } catch (error) {
                console.error("Lỗi xử lý thanh toán:", error);
                return res.status(500).json({ code: '99', message: "Lỗi hệ thống" });
            }
        }
        
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        // res.status(200).json({code: vnp_Params['vnp_ResponseCode']})
    } else{
        
        try {
            const order = await OrderModel.findOne({ 
                paymentId: paymentId, 
                payment_status: "Chờ thanh toán online" 
            });
    
            if (!order) {
                return res.status(404).json({ message: "Không tìm thấy đơn hàng hoặc đơn hàng đã được xử lý" });
            }
    
            // Cập nhật trạng thái thanh toán
            order.payment_status = "Thanh toán online thất bại";
            await order.save();
    
            // Trả về kết quả cho VNPAY
            // return res.status(500).json({code: '97'})
            return res.status(500).json("Thanh toán online không thành công, xin mời bạn đặt hàng lại ")
        } catch (error) {
            console.error("Lỗi xử lý thanh toán:", error);
            return res.status(500).json({ code: '99', message: "Lỗi hệ thống" });
        }
    }

}

export const paymentId = async (req, res) => {

        let vnp_Params = req.query;
        let secureHash = vnp_Params['vnp_SecureHash'];
        
        let orderId = vnp_Params['vnp_TxnRef'];
        let rspCode = vnp_Params['vnp_ResponseCode'];
    
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        function sortObject(obj) {
            let sorted = {};
            let str = [];
            let key;
            for (key in obj){
                if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
                }
            }
            str.sort();
            for (key = 0; key < str.length; key++) {
                sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
            }
            return sorted;
        }
    
        vnp_Params = sortObject(vnp_Params);
        
        let secretKey = "57G56MRY30CVNJ9MC3S0S24IXJJGK2ZG";
       
        let signData = qs.stringify(vnp_Params, { encode: false });   
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
        
        let paymentStatus = '0'; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
        //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
        //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó
        
        let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
        let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
        if(secureHash === signed){ //kiểm tra checksum
            if(checkOrderId){
                if(checkAmount){
                    if(paymentStatus=="0"){ //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
                        if(rspCode=="00"){
                            //thanh cong
                            //paymentStatus = '1'
                            // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
                            res.status(200).json({RspCode: '00', Message: 'Success'})
                        }
                        else {
                            //that bai
                            //paymentStatus = '2'
                            // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
                            res.status(200).json({RspCode: '00', Message: 'Success'})
                        }
                    }
                    else{
                        res.status(200).json({RspCode: '02', Message: 'This order has been updated to the payment status'})
                    }
                }
                else{
                    res.status(200).json({RspCode: '04', Message: 'Amount invalid'})
                }
            }       
            else {
                res.status(200).json({RspCode: '01', Message: 'Order not found'})
            }
        }
        else {
            res.status(200).json({RspCode: '97', Message: 'Checksum failed'})
        }

}


// res.json({ finalUrl });

