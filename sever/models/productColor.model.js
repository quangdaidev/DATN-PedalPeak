import mongoose from "mongoose";

const productColorSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    countInStock: {
        type: Number,
        default: 0,
    },
    productId: {
        type: String,
        default: ""
    }
},{
    timestamps: true
})

const ProductColorModel = mongoose.model('ProductColor',productColorSchema)

export default ProductColorModel