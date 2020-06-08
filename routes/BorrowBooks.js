const express = require('express');
const borrowBooks = express.Router();
const BorrowBook = require('../models/BorrowBook');
const BookDetail = require('../models/BookDetail');
const Book = require('../models/Book');
const User = require('../models/User');
const db = require('../database/db.js');
const {checkUserExist} = require('../controller/UserController');

borrowBooks.get('/get-all-borrow-books',(req,res)=>{
    BorrowBook.findAll({include:[BookDetail]}).then(books=>{
        res.json(books);
    });
});

borrowBooks.get('/get-borrow-book-by-book-id/:book_id',(req,res)=>{
    BorrowBook.findAll({where:{bookId:req.params.book_id}}).then((borrowBook)=>{
        res.json(borrowBook);
    })
});

// borrowBooks.get('get-borrow-book/:book_id');

borrowBooks.post('/add-borrow-book', async (req,res)=>{
    const startDate = req.body.startDate;
    const dueDate = req.body.endDate;
    const bookId = req.body.bookId;
    const userId = req.body.userId;
    const userExist = await checkUserExist(userId);
    if(!userExist){
        res.json("User does not exist")
    }else{
        BorrowBook.count({user_id:userId}).then(count=>{
            if(count<3){
                db.sequelize.transaction(function(t){
                    return BorrowBook.create({start_date:startDate,due_date:dueDate,book_id:bookId,user_id:userId},{transaction:t})
                    .then(borrowBook=>{
                        Book.findOne({id:bookId}).then(book=>{
                            book.status = 'UNAVAILABLE';
                            return book.save();
                        }).then(()=>{
                            res.json(borrowBook);
                        })
                    });
                })
            }else{
                res.json({err:"More than 3 books borrowed by this student"});
            }
        });
    }        
});


module.exports = borrowBooks;