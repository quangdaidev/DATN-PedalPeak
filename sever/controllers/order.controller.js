import OrderModel from "../models/order.model.js"; 
import ProductModel from '../models/product.model.js'; 
// import paypal from "@paypal/checkout-server-sdk";

export const createOrderController = async (request, response) => { 
    try {
        let order = new OrderModel({
            userId: request.body.userId,
            products: request.body.products,
            paymentId: request.body.paymentId,
            payment_status: request.body.payment_status,
            delivery_address: request.body.delivery_address,
            totalAmt: request.body.totalAmt, 
            date: request.body.date
        });

        if (!order) {
            response.status(500).json({
                error: true,
                success: false
            })
        }

        for (let i = 0; i < request.body.products.length; i++) {

            await ProductModel.findByIdAndUpdate(
                request.body.products[i].productId,
                {
                    countInStock: parseInt(request.body.products[i].countInStock - request.body.products[i].quantity),
                },
                { new: true }
            );
            
            order = await order.save();
            
            return response.status(200).json({
                error: false,
                success: true,
                message: "Đặt hàng thành công",
                data: order
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getOrderDetailsController (request, response) { 
    try {
        const userId = request.userId // order id

        const orderlist = await OrderModel.find({ userId: userId }).sort({ createdAt: -1 }).populate('delivery_address userId')
        
        return response.json({
            message:"order list",
            data: orderlist,
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({ 
            message: error.message || error, 
            error: true,
            success: false
        })
    }
}

export async function getAllOrders(request, response) {
    try {
        const orders = await OrderModel.find().sort({ createdAt: -1 }).populate('delivery_address');

        if(!orders){
            return response.status(400).json({
                erorr: true,
                success: false
            })
        }

        return response.status(200).json({
            error: false,
            success: true,
            data: orders
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
    
export async function updatedOrder(request, response) {
  const order = await OrderModel.findByIdAndUpdate(
    request.params.id,
    {
      order_status: request.body.order_status,
    },
    { new: true }
  );

  if (!order) {
    return response.status(500).json({
      message: "Không tìm thấy",
      success: false,
      error: true,
    });
  }

  response.status(200).json({
    error: false,
    success: true,
    data:  order,
  });
}

