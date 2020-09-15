const express = require('express');
const borrowBooks = express.Router();
const BorrowBookController = require("../controller/BorrowBookController");

borrowBooks.post('/add-borrow-book', BorrowBookController.addBorrowBook);


module.exports = borrowBooks;