import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    products: [
        {
            productId: {
                type: String
            },
            productTitle: {
                type: String           
            },
            quantity: {
                type: Number
            },
            price: {
                type: Number
            },
            image: {
                type: String
            },
            subTotal: {
                type: Number
            },
            colorChose: {
                type: String 
            },
            colorChoseId: {
                type: String 
            },
        }
    ],
    paymentId: {
        type: String,
        default: ""
    },
    payment_status: {
        type:String,
        default: ""
    },
    order_status: {
        type:String,
        default: "chờ xác nhận"
    },
    delivery_address: {
        type: mongoose.Schema.ObjectId,
        ref: "address"
    },
    totalAmt: {
        type: Number,
        default: 0
    }
 
}, {
    timestamps: true
}); // Đóng đúng vị trí của schema

const OrderModel = mongoose.model("order", orderSchema);

export default OrderModel;
