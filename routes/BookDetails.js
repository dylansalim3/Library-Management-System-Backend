const express = require('express');
const bookDetails = express.Router();
const BookDetailController = require("../controller/BookDetailController");

bookDetails.post('/get-book', BookDetailController.getBook);

bookDetails.get('/get-latest-book', BookDetailController.getLatestBook);

// haven tested
bookDetails.post('/update-book', BookDetailController.updateBookDetails);

// haven tested
bookDetails.post('/delete-book', BookDetailController.deleteBook)

module.exports = bookDetails;
