const express = require('express');
const books = express.Router();
const Book = require('../models/Book');
const BookDetail = require('../models/BookDetail');
const db = require('../database/db.js');

books.post('/get-books',(req,res)=>{
    const bookDetailId = req.body.bookDetailId;
    Book.findAll({include:[{model:BookDetail,where:{id:bookDetailId}}]}).then(books=>{
        res.json(books);
    })
});

module.exports = books;