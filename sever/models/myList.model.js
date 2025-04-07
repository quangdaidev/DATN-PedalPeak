import mongoose from "mongoose";

const myListSchema = new mongoose.Schema({
    productId: {
        type: String, 
        required: true
    },
    userId: {
        type: String, 
        required: true
    },
    productTitle: {
        type: String, 
        required: true
    },
    image: {
        type: String, 
        required: true
    },
    rating: {
        type: Number, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    oldPrice: {
        type: Number, 
        required: true
    },
    color: [
        {
            type: String,
        }
    ],
    quantity: {
        type: Number,
        default:1
    },
    brand: {
        type: String, 
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    discount: {
        type: Number, 
        default: ""
    },
} , {
    timestamps: true
});

const MyListModel = mongoose.model('MyList', myListSchema)

export default MyListModel