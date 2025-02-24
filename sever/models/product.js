const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  MaDM: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    require: true,
  },
  TenSP: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    require: true,
  },
  GiaNiemYet: {
    type: Number,
    default: 0,
  },
  GiaKhuyenMai: {
    type: Number,
    default: 0,
  },
  MoTa: {
    type: String,
    require: true,
  },
});

exports.Product = mongoose.model("Product", productSchema);
