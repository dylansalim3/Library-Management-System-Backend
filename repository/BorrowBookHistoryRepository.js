const BorrowBookHistory = require('../models/BorrowBookHistory');
const BorrowBook = require('../models/BorrowBook');
const Book = require('../models/Book');
const BookDetail = require('../models/BookDetail');

exports.findBookHistoryByBookId = (bookId) =>{
    return BorrowBook.findOne({ book_id: bookId });
}

exports.findBookHistoryCountByBookId = (bookId) =>{
    return BorrowBook.count({where: {book_id: bookId} })
}

// exports.deleteBorrowBookHistoryByBookId = (bookId) =>{
//
// }