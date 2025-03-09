const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  
category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: [{
    type: String,
    require: true,
  }],
  brand: {
    type: String,
    require: true,
  },
  old_price: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  
  color: [{
    type: String,
    require: true,
  }],
  status: {
    type: String,
    require: true,
  },

  desc: {
    type: String,
    require: true,
  },
});

exports.Product = mongoose.model("Product", productSchema);
