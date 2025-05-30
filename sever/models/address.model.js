import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        default: ""
    },
    ward: {
        type: String,
        default: ""
    },
    district: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: null
    },   
    note: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        default: true
    },
    addressType: {
        type: String,
        enum: ["Nhà riêng", "Nơi làm việc"]
    },
    userId: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const AddressModel = mongoose.model('address', addressSchema);


export default AddressModel;


