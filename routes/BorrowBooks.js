const express = require('express');
const borrowBooks = express.Router();
const BorrowBookController = require("../controller/BorrowBookController");

borrowBooks.post('/add-borrow-book', BorrowBookController.addBorrowBook);

borrowBooks.post('/find-all-borrowed-books', BorrowBookController.findBorrowedBooksByUserId);

borrowBooks.post('/extend-expiry-date',BorrowBookController.extendExpiryDate);

module.exports = borrowBooks;