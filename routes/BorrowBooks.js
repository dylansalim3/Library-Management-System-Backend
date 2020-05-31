const express = require('express');
const borrowBooks = express.Router();
const BorrowBook = require('../models/BorrowBook');
const book = require('../models/Book');

borrowBooks.get('/get-all-borrow-books',(req,res)=>{
    BorrowBook.findAll({include:[book]}).then(books=>{
        res.json(books);
    });
});

borrowBooks.get('/get-borrow-book-by-book-id/:book_id',(req,res)=>{
    BorrowBook.findAll({where:{bookId:req.params.book_id}}).then((borrowBook)=>{
        res.json(borrowBook);
    })
});

// borrowBooks.get('get-borrow-book/:book_id');

// borrowBooks.post()

module.exports = borrowBooks;