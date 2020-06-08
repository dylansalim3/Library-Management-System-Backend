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
    const selectedBorrowBook = await BorrowBook.findOne({ id: bookId }).then(borrowBook => {
        return borrowBook;
    });
    console.log(selectedBorrowBook);
    if(selectedBorrowBook==null){
        res.json({err:'The book id does not exist'});
    }else{
        const {user_id,start_date,due_date} = selectedBorrowBook;
        const newBorrowBookHistoryEntry = {
            book_id: bookId,
            due_date: req.body.dueDate,
            return_date: Date.now(),
            status: "RETURNED",
            user_id: user_id,
            start_date:start_date,
            due_date:due_date,
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
        const results = await BorrowBookHistory.findAll({include:[{model:Book,require:true,include:[BookDetail]}],where:{user_id:userId}}); 
        const mappedResults = results.map(result=>{
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
        res.json(mappedResults);
    }    
})

module.exports = borrowBooksHistory;    