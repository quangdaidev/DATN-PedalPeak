// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");
const cloudinary = require("cloudinary").v2;
const pLimit = require("p-limit");
// import pLimit from 'p-limit';
// const { default: mongoose } = require("mongoose");

// cloudinary.config({
//   cloud_name: process.env.cloudinary_Config_Cloud_Name,
//   api_Key: process.env.cloudinary_Config_api_key,
//   api_secret: process.env.cloudinary_Config_api_secret,
// });

  // Configuration
  cloudinary.config({ 
    cloud_name: 'pedalpeak', 
    api_key: '772484797329468', 
    api_secret: 'ri813V_nTj1QfCIlmKIbBoFmDWs' // Click 'View API Keys' above to copy your API secret
});

// Lấy danh sách tất cả categories
router.get("/", async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});

router.get(`/:id`, async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res
      .status(500)
      .json({ message: "The category with the given ID was not found. " });
  }
  return res.status(200).send(category);
});

router.delete(`/:id`, async (req, res) => {
  const deleteCategory = await Category.findByIdAndDelete(req.params.id);
  if (!deleteCategory) {
    res.status(404).json({
      message: "Category not found!",
      success: false,
    });
  }
  res.status(200).send({
    success: true,
    message: "the Category is deleted!",
  });
});

router.post(`/create`, async (req, res) => {
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

  let category = new Category({
    name: req.body.name,
    images: imgurl,
    color: req.body.color,
  });

  if (!category) {
    res.status(500).json({
      error: err,
      success: false,
    });
  }

  category = await category.save();

  res.status(201).json(category);
});


router.put(`/:id`, async (req, res) => {

  const limit = pLimit(2);

  const imagesToUpload = req.body.images.map((image) => {
    return limit(async () => {
      const result = await cloudinary.uploader.upload(image);
      return result;
    });
  });

  const uploadStatus = await Promise.all(imagesToUpload);

  
  if (!uploadStatus || uploadStatus.length === 0) {
    return res.status(500).json({
      error: "images cannot upload!",
      status: false,
    });
  }

  // const imgurl = uploadStatus.map((item) => {
  //   return item.secure_url;
  // });

  const imgurl = uploadStatus.map((item) => item.secure_url);
  
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      images: imgurl,
      color: req.body.color,
    },
    { new: true }
  );

  if (!category) {
    res.status(404).json({
      message: "the category can not be updated!",
      status: false,
    });
  }
  

  res.send(category);
  // res.status(200).json({
  //   message: "the category is updated!",
  //   status: true,
  // });
});

// categorySchema.virtual("id").get(function () {
//   return this._id.toHexString();
// });

// categorySchema.set("toJSON", {
//   virtuals: true,
// });

// exports.Category = mongoose.model("Category", categorySchema);

module.exports = router;
// exports.categorySchema = categorySchema;
