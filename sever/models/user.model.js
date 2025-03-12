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
        required: [true, "Provide password"],
    },
    avatar: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: null
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["Hoạt động", "Không hoạt động", "Cấm"],
        default: "Hoạt động"
    },
    address_details: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'address' // tham chiếu tới (collection) address.
        }
    ],
    shopping_cart: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'cartProduct'
        }
    ],
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
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: "USER"
    }
}, {timestamps: true}) // Mongoose tự động cập nhật các trường này mỗi khi tài liệu được tạo ra hoặc thay đổi.

const UserModel = mongoose.model('User', userSchema)

export default UserModel