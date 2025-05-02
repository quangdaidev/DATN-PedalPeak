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
    discount: {
        type: Number, 
        default: ""
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "reviews",
        }
    ],
} , {
    timestamps: true
});

const MyListModel = mongoose.model('MyList', myListSchema)

export default MyListModel