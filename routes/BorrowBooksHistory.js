const express = require('express');
const borrowBooksHistory = express.Router();
const BorrowBookHistory = require('../models/BorrowBookHistory');
const BorrowBook = require('../models/BorrowBook');
const Book = require('../models/Book');
const BookDetail = require('../models/BookDetail');
const db = require('../database/db');
const {checkUserExist} = require('../controller/UserController');

borrowBooksHistory.post('/return-book', async (req, res) => {
    const bookId = req.body.bookId;
    const isBookBorrowed = await BorrowBook.count({where: {book_id: bookId} })<=0;
    const selectedBorrowBook = await BorrowBook.findOne({ book_id: bookId });
    const isBookExist = await Book.count({where:{id:bookId}})<=0;

    if(isBookExist){
        res.status(400).json({message:'The book is not exist'});
    }else if(isBookBorrowed){
        res.status(400).json({message:'The book is not borrowed'});
    }else{
        const {user_id,start_date,due_date} = selectedBorrowBook;
        const newBorrowBookHistoryEntry = {
            book_id: bookId,
            due_date: req.body.dueDate,
            return_date: Date.now(),
            status: "RETURNED",
            user_id: user_id,
            start_date:start_date,
        }
    
    
    
        db.sequelize.transaction(t => {
            return BorrowBookHistory.create(newBorrowBookHistoryEntry, { transaction: t }).then(borrowBooksHistory => {
                BorrowBook.findOne({ book_id: bookId }).then(borrowBook => {
                    return borrowBook.destroy();
                }).then(() => {
                    Book.findOne({ id: bookId }).then(book => {
                        book.status = 'AVAILABLE';
                        return book.save();
                    }).then(() => {
                        res.json(borrowBooksHistory);
                    });
                });
            });
        });
    }
    
    
});

borrowBooksHistory.post('/get-book-history',async (req,res)=>{
    const userId = req.body.userId;
    const isUserExist = await checkUserExist(userId);
    if(!isUserExist){
        res.statusMessage = "User Does not Exist";
        res.status(404).end();
    }else{
        const borrowBookHistoryResults = await BorrowBookHistory.findAll({include:[{model:Book,require:true,include:[BookDetail]}],where:{user_id:userId}}); 
        const borrowBookResults = await BorrowBook.findAll({include:[{model:Book,require:true,include:[BookDetail]}],where:{user_id:userId}});
        
        const mappedBorrowBookHistoryResults = borrowBookHistoryResults.map(result=>{
            
            return {
                id:result.id,
                bookId:result.book_id,
                bookimg:result.book.book_detail.bookimg,
                borrowDate:result.start_date,
                dueDate:result.due_date,
                returnDate:result.return_date,
                status:result.status,
            };
        });

        const mappedBorrowBookResults = borrowBookResults.map(result=>{
            return {
                id:result.id,
                bookId:result.book_id,
                bookimg:result.book.book_detail.bookimg,
                borrowDate:result.start_date,
                dueDate:result.due_date,
                returnDate:null,
                status:'BORROWED',
            }; 
        });
        const results = mappedBorrowBookResults.concat(mappedBorrowBookHistoryResults);
        results.sort(function(a,b){
            return a.due_date-b.due_date;
        });
        res.json(results);
    }    
})

module.exports = borrowBooksHistory;    