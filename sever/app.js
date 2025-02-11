const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

// Middleware
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

// Kết nối MongoDB
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Đã kết nối đến MongoDB!'))
.catch((err) => console.error('Lỗi kết nối MongoDB:', err));

// Routes
const categoriesRouter = require('./routes/category');
app.use('/api/categories', categoriesRouter);

// Khởi động server
app.listen(process.env.PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${process.env.PORT}`);
});