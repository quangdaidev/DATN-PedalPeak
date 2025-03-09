const { Category } = require("../models/category.js");
const { Product } = require("../models/product.js");
const express = require("express");
const router = express.Router();
const pLimit = require("p-limit");
// const cloudinary = require("../utils/cloudinary.js");
const cloudinary = require("cloudinary").v2;

router.get(`/`, async (req, res) => {
  const productList = await Product.find().populate("category");

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});


router.post(`/create`, async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(404).send("Invalid Category!");
  }

  const limit = pLimit(2);

  const imagesToUpload = req.body.images.map((image) => {
    return limit(async () => {
      const result = await cloudinary.uploader.upload(image);
      return result;
    });
  });

  const uploadStatus = await Promise.all(imagesToUpload);

  const imgurl = uploadStatus.map((item) => {
    return item.secure_url;
  });

  if (!uploadStatus) {
    return res.status(500).json({
      error: "images cannot upload!",
      status: false,
    });
  }

  let product = new Product({
    category: req.body.category,
    name: req.body.name,
    image: imgurl,
    old_price: req.body.old_price,
    price: req.body.price,
    brand:req.body.brand,
    color:req.body.color,
    desc: req.body.desc,
    status:req.body.status,
  });

  product = await product.save();
  if (!product) {
    res.status(500).json({
      error: err,
      success: false,
    });
  }

  res.status(201).json(product);
});

router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res
      .status(500)
      .json({ message: "The product with the given ID was not found." });
  }
  return res.status(200).send(product);
});

router.delete(`/:id`, async (req, res) => {
  const deletProduct = await Product.findByIdAndDelete(req.params.id);
  if (!deletProduct) {
    return res.status(404).json({
      message: "product not found!",
      status: false,
    });
  }
  res.status(200).send({
    message: "the product is deleted!",
    status: true,
  });
});

router.put(`/:id`, async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      category: req.body.category,
      name: req.body.name,
      image: imgurl,
      old_price: req.body.old_price,
      price: req.body.price,
      brand:req.body.brand,
      color:req.body.color,
      desc: req.body.desc,
      status:req.body.status,
    },
    { new: true }
  );

  if (!product) {
    res.status(404).json({
      message: "the product can not be updated!",
      status: false,
    });
  }

  res.status(200).json({
    message: "the product is updated!",
    status: true,
  });
});

module.exports = router;
