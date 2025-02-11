const express = require('express');
const router = express.Router();
const { Category } = require('../models/category');

// Lấy danh sách tất cả categories
router.get('/', async (req, res) => {
    try {
        const categoryList = await Category.find();
        res.status(200).send(categoryList);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;