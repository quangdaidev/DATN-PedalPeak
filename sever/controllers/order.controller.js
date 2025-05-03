import OrderModel from "../models/order.model.js"; 
import ProductModel from '../models/product.model.js'; 
import mongoose from "mongoose";
import ProductColorModel from '../models/productColor.model.js';
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

            const productColor = await ProductColorModel.findOne({ _id: request.body.products[i].colorChoseId });

            if (!productColor) {
                return response.status(500).json({
                    message: 'Không tìm thấy màu sản phẩm',
                    error: true,
                    success: false
                })
            }
            let newStock = Number(productColor.countInStock);
            if( request.body.payment_status!=="Chờ thanh toán online"){
                newStock = parseInt(productColor.countInStock - request.body.products[i].quantity);
            } 

            if (newStock < 0) {
                return response.status(500).json({
                    message: 'Không đủ hàng trong kho',
                    error: true,
                    success: false
                })
            }

            await ProductColorModel.findOneAndUpdate(
                { _id: request.body.products[i].colorChoseId },
                {
                    countInStock: newStock,
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

const sortItems = (orders, sortBy, order) => { 
    // const updatedOrders = orders.map(order => {
    //     const newOrder = { ...Order };
    //     if (newOrder.price === 0 && newOrder.oldPrice) {
    //         newOrder.price = newOrder.oldPrice;
    //     }
    //     return newOrder;
    // });

    const validStatuses = ["chờ xác nhận", "đang giao", "hoàn thành"];

    if (validStatuses.includes(sortBy)) {
        orders = orders.filter(order => order.order_status === sortBy);
    }

    return orders.sort((a, b) => {
        if (sortBy === 'name') {
            return order === 'asc' 
                ? a.name.localeCompare(b.name) 
                : b.name.localeCompare(a.name)
        }
        if (sortBy === "totalAmt") {
            return order === 'asc' ? a.totalAmt - b.totalAmt: b.totalAmt - a.totalAmt
        }

        if (sortBy === "createdAt") {
            return order === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt): new Date(b.createdAt) - new Date(a.createdAt)
        }

        if (sortBy === "chờ xác nhận") {
            return order === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt): new Date(b.createdAt) - new Date(a.createdAt)
        }

        if (sortBy === "đang giao") {
            return order === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt): new Date(b.createdAt) - new Date(a.createdAt)
        }

        if (sortBy === "hoàn thành") {
            return order === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt): new Date(b.createdAt) - new Date(a.createdAt)
        }

        return 0;
    })
}


export async function sortBy(request, response) {
    const { orders, sortBy, order } = request.body;
    console.log(orders)
    const sortedItems = sortItems([... orders], sortBy, order);

    return response.status(200).json({
        error: false,
        success:true,
        data: sortedItems,
        // page:0,
        // totalPages:0
    })
}  

export async function searchOrderController(request, response) {
    try {
        const { query} = request.body;

        if (!query) {
            return response.status(400).json({
                error: true,
                success: false,
                message: "Không nhận được yêu cầu"
            })
        }

        let idQuery = null;

        if (mongoose.Types.ObjectId.isValid(query)) {
            idQuery = new mongoose.Types.ObjectId(query);
          }

        const items  = await OrderModel.find({
            $or: [
                ...(idQuery ? [{ _id: idQuery }] : []),
                { ["delivery_address.street"]: { $regex: query, $options: "i" } },
            ],
        })
        .populate('delivery_address');

        return response.status(200).json({
            error: false, 
            success: true, 
            data: items,
        })
        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

