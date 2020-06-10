const express = require('express');
const borrowBooks = express.Router();
const BorrowBook = require('../models/BorrowBook');
const BookDetail = require('../models/BookDetail');
const Book = require('../models/Book');
const User = require('../models/User');
const db = require('../database/db.js');
const {checkUserExist} = require('../controller/UserController');

// borrowBooks.get('/get-all-borrow-books',(req,res)=>{
//     BorrowBook.findAll({include:[{model:Book,require:true,include:[BookDetail]}],where:{user_id:userId}}).then(books=>{
//         res.json(books);
//     });
// });

// borrowBooks.get('/get-borrow-book-by-book-id/:book_id',(req,res)=>{
//     BorrowBook.findAll({where:{bookId:req.params.book_id}}).then((borrowBook)=>{
//         res.json(borrowBook);
//     })
// });

// borrowBooks.get('get-borrow-book/:book_id');

borrowBooks.post('/add-borrow-book', async (req,res)=>{
    const startDate = req.body.startDate;
    const dueDate = req.body.endDate;
    const bookId = req.body.bookId;
    const userId = req.body.userId;
    const userExist = await checkUserExist(userId);
    const isBookAvailable = await Book.findOne({id:bookId}).then(book=>{
        return book.status.toUpperCase() === 'AVAILABLE';
    });
    console.log(isBookAvailable);
    if(!userExist){
        res.status(400).json({message:"User does not exist"})
    }else if(!isBookAvailable){
        res.status(400).json({message:"Book is not available"})
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
                res.status(400).json({message:"More than 3 books borrowed by this student"});
            }
        });
    }        
});


module.exports = borrowBooks;