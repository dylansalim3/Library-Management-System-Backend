const express = require('express');
const bookCategory = express.Router();
const BookCategoryController = require('../controller/BookCategoryController');

bookCategory.post('/add', BookCategoryController.addCategory);
bookCategory.get('/get-all-category', BookCategoryController.getAllCategory);

module.exports = bookCategory;
