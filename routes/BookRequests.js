const express = require('express');
const bookRequests = express.Router();
const BookRequestController = require('./../controller/BookRequestController');

bookRequests.post('/find-all-borrowed-books', BookRequestController.findAllAvailableBorrowedBooksByUserId);

bookRequests.post('/add-extend-book-request', BookRequestController.createExtendBookRequest);

bookRequests.post('/find-all-extend-book-requests', BookRequestController.findAllExtendBookRequest);

bookRequests.post('/find-all-borrowed-books-by-userid-bookid',BookRequestController.findBorrowBooksByUserIdAndBookId);

bookRequests.post('/accept-extend-book-request', BookRequestController.acceptExtendBookRequest);

bookRequests.post('/reject-extend-book-request', BookRequestController.rejectExtendBookRequest);

bookRequests.post('/remove-book-request', BookRequestController.removeBookRequest);

module.exports = bookRequests;