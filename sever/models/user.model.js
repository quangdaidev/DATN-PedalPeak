import { access } from "fs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide name"]
    },
    email: {
        type: String,
        required: [true, "Provide email"],
        unique: true
    },
    password: {
        type: String,
        default: "",
    },
    avatar: {
        type: String,
        default: ""
    },
    mobile: {
        type: String,
        default: null
    },
    address_details: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'address' // tham chiếu tới (collection) address.
        }
    ],
    my_list: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'product'
        }
    ],
    status: {
        type: String,
        enum: ["Hoạt động", "Không hoạt động", "Cấm"],
        default: "Hoạt động"
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: "USER"
    },
    orderHistory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'order'
        }
    ],
    forgot_password_otp: {
        type: String,
        default: null
    },
    forgot_password_expiry: {
        type: Date,
        default: ""
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date
    },
    access_token: {
        type: String,
        default: ''
    },
    refresh_token: {
        type: String,
        default: ''
    },
    signUpWithGoogle: {
        type: Boolean,
        default: false
    }
    
}, {timestamps: true}) // Mongoose tự động cập nhật các trường này mỗi khi tài liệu được tạo ra hoặc thay đổi.

const UserModel = mongoose.model('User', userSchema)

export default UserModel