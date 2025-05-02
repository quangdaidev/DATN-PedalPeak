import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    productTitle: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductColor",
        }
    ],
    colorChose: {
        type: String,
        default:""
    },
    quantity: {
        type: Number,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    productId: {
        type: String,
        required:true
    },
    userId: {
        type:String,
        required: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "reviews",
        }
    ],
}, {
    timestamps: true
});

const CartProductModel = mongoose.model('cart', cartProductSchema);

export default CartProductModel;


