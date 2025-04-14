// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

//cuong hfwihfuiweh
const express = require("express");
// import express from "express";
const app = express();
const bodyParser = require("body-parser");
// import bodyParser from "body-parser";
const mongoose = require("mongoose");
// import mongoose from "mongoose";
const cors = require("cors");
// import cors from "cors";
require("dotenv/config");
// import {} from "dotenv/config";

app.use(cors());
app.options("*", cors());

// Middleware
app.use(bodyParser.json());


// Kết nối MongoDB
mongoose
//   // .connect(process.env.CONNECTION_STRING, {
//   //   useNewUrlParser: true,
//   //   useUnifiedTopology: true,
//   // })
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("Đã kết nối đến MongoDB!"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

// Routes
const categoryRoutes = require("./routes/categories");

const productRoutes = require("./routes/products");

app.use("/api/categories", categoryRoutes);
app.use(`/api/products`, productRoutes);


// Khởi động server
app.listen(process.env.PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${process.env.PORT}`);
});

