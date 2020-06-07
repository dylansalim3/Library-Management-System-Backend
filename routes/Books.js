const express = require('express');
const books = express.Router();
const Book = require('../models/Book');
const db = require('../database/db.js');


books.post('/add', (req, res) => {
  const today = new Date();
  const data = {
    isbn: req.body.isbn,
    title: req.body.title,
    datepublished: req.body.datepublished,
    publisher: req.body.publisher,
    type: req.body.type,
    e_book: req.body.ebook,
    category_id: req.body.category,
    genre_id: req.body.genre,
    summary: req.body.summary,
    location: req.body.location,
    bookimg: req.body.bookimg,
    status: req.body.status,
    created: today,
  };
  Book.create(data)
    .then((book) => {
      res.json({ bookdetail:book,status: 'book added' });
    })
    .catch((err) => {
      res.send('error: ' + err);
    });
});

module.exports = books;
