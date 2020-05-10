const express = require('express');
const books = express.Router();
const Book = require('../models/Book');
const db = require('../database/db.js');


books.post('/add', (req, res) => {
  const today = new Date();
  const data = {
    title: req.body.title,
    bookimg: req.body.bookimg,
    created: today,
  };
  Book.create(data)
    .then((book) => {
      res.json({ status: 'book added' });
    })
    .catch((err) => {
      res.send('error: ' + err);
    });
});

module.exports = books;
