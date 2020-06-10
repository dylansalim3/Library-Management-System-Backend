const express = require('express');
const books = express.Router();
const Book = require('../models/Book');
const BookDetail = require('../models/BookDetail');
const Author = require('../models/Author');
const BookAuthor = require('../models/BookAuthor');
const db = require('../database/db.js');

books.post('/get-books',(req,res)=>{
    const bookDetailId = req.body.bookDetailId;
    Book.findAll({include:[{model:BookDetail,where:{id:bookDetailId}}]}).then(books=>{
        res.json(books);
    })
});

books.post('/add', async (req, res) => {
  const today = new Date();
  const author =  req.body.author;

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

  const authorId = await Author.findOrCreate({where:{name:author}}).then(author=>{
    return author.id;
  });
  db.sequelize.transaction(t=>{
    return BookDetail.create(data,{transaction:t}).then(bookDetail=>{
      const bookDetailId = bookDetail.id;
      return BookAuthor.create({author_id:authorId,book_detail_id:bookDetailId},{transaction:t})
    });
  }).then(bookAuthors=>{
    data['author']=author;
    res.json({bookdetail:data,status:'book added'})
  }).then(err=>{
    res.send(err);
  });

  // Book.create(data)
  //   .then((book) => {
  //     res.json({ bookdetail:book,status: 'book added' });
  //   })
  //   .catch((err) => {
  //     res.send('error: ' + err);
  //   });
});

module.exports = books;