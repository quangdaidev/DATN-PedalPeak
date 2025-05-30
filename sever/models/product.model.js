import  mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        require: true,
    },
    images: [{
        type: String,
        require: true,
    }],
    brand: {
        type: String,
        default: "",
    },
    oldPrice: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        default: 0,
    },
    catName: {
        type: String,
        default: "",
    },
    catId: {
        type: String,
        default: "",
    },
    subCatId: {
        type: String,
        default: "",
    },
    subCat: {
        type: String,
        default: "",
    },
    thirdsubCat: {
        type: String,
        default: "",
    },
    thirdsubCatId: {
        type: String,
        default: "",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",

    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "reviews",
        }
    ],
    isFeatured: {
        type: Boolean,
        default: false,
    },
    discount: {
        type: Number,
        default: "",
    },
    color: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductColor",
        }
    ],
    productWeight:{
        type: String,
        default: null,
    }
    ,
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: Boolean,
        default: false,
    },
},{
    timestamps: true
});

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel

//productRam 51-27:18
//productWeight 52 -3:52
