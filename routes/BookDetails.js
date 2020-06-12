const express = require('express');
const bookDetails = express.Router();
const BookDetail = require('../models/BookDetail');
const Book = require('../models/Book');
const Genre = require('../models/Genre');
const db = require('../database/db.js');
const Author = require('./../models/Author');
const BorrowBookHistory = require('../models/BorrowBookHistory');
const BookAuthor = require('../models/BookAuthor');

bookDetails.get('/get-all-book-details', (req, res) => {
  BookDetail.findAll({ include: [Genre] }).then(books => res.json(books));
});

// bookDetails.post('/get-book-by-book-detail-id', (req, res) => {
//   const bookDetailId = req.body.id;
//   BookDetail.findOne({ include: [Genre], where: { id: bookDetailId } }).map(book=>{
//     // if(book.authors.length>0){
//     //   book['author'] = book.authors[0].name;
//     // }
//     return book;
//   }).then(bookDetail => {
//     res.json(bookDetail);
//   });
// })

bookDetails.post('/add', (req, res) => {
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
  BookDetail.create(data)
    .then((book) => {
      res.json({ status: 'book added' });
    })
    .catch((err) => {
      res.send('error: ' + err);
    });
});

bookDetails.post('/get-book-by-genre', (req, res) => {
  const requestGenre = req.body.genre;
  BookDetail.findAll({ include: [{ model: Genre, where: { name: requestGenre } }] }).then(books => {
    res.json(books);
  });
});

bookDetails.post('/get-book', (req, res) => {
  const searchCriteria = req.body.searchCriteria;
  const searchCriteriaType = req.body.searchCriteriaType;
  const genreId = req.body.genre;
  const a = {};
  if (genreId) {
    a['genre_id'] = genreId;
  }
  if (searchCriteria) {
    a[searchCriteriaType] = searchCriteria;
  }

  BookDetail.findAll({ include: [Genre, Book, Author], where: a }).map(book => {
    if (book.authors.length > 0) {
      book['author'] = book.authors[0].name;
    }
    return book;
  }).then(books => {
    res.json(books);
  })
});

bookDetails.get('/get-latest-book', (req, res) => {
  BookDetail.findAll({ include: [Genre, Book, Author], limit: 3, order: [['datepublished', 'DESC']] }).map(book => {
    if (book.authors > 0) {
      book['author'] = book.authors[0].name;
    }
    return book;
  }).then(bookDetails => {
    res.json(bookDetails);
  }).catch(err => {
    res.status(400).json({ message: 'Latest book cannot retrieve' });
  })
});

bookDetails.post('/update-book', async (req, res) => {
  const bookDetailId = req.body.id;
  const authorName = req.body.author;

  const bookDetailData = {
    title: req.body.title,
    isbn: req.body.isbn,
    genre_id: req.body.genreId,
    bookimg: req.body.bookimg,
    summary: req.body.summary,
    datepublished: req.body.datepublished,
    publisher: req.body.publisher,
    location: req.body.location,
  };
  var isAuthorExist = true;
  const authorId = await Author.findOne({ where: { name: authorName } }).then(author => {
    if (author) {
      return author.id;
    } else {
      isAuthorExist = false;
      return Author.create({ name: authorName }).then(author => {
        return author.id;
      }).catch(err => {
        res.status(400).json({ message: 'Add New Author Failed' });
      })
    }
  });
  console.log(isAuthorExist);
  if (authorId) {
    db.sequelize.transaction(t => {
      return BookDetail.update(bookDetailData, { where: { id: bookDetailId }, transaction: t }).then(bookDetail => {
        
        if (!isAuthorExist) {
          return BookAuthor.create({ book_detail_id: bookDetailId, author_id:authorId }, { transaction: t }).then(bookAuthor => {
            return res.json('Book Detail Updated Successfully');
          });
        }else{
          return BookAuthor.update({author_id:authorId},{where:{book_detail_id:bookDetailId},transaction:t}).then(()=>{
            return res.json('Book Detail Updated Successfully');
          });
        }
      });
    }).catch(err => {
      console.log(err);
      res.status(400).json({ message: 'Book Detail Update Failed' });
    })
  } else {
    res.status(400).json({ message: 'Author not found and cannot be created' });
  }

});

bookDetails.post('/delete-book', async (req, res) => {
  const bookDetailId = req.body.id;
  const bookId = await Book.findOne({ where: { book_detail_id: bookDetailId } }).then(book => {
    if (book) {
      return book.id;
    }
  });
  db.sequelize.transaction(t => {
    if (bookId) {
      BorrowBookHistory.destroy({ where: { book_id: bookId }, transaction: t });
    }
    return Book.destroy({ where: { book_detail_id: bookDetailId }, transaction: t }).then(books => {
      return BookDetail.destroy({ where: { id: bookDetailId }, transaction: t }).then(bookDetail => {
        console.log(bookDetail);
        if (bookDetail) {
          res.json('Book Detail Deleted Successfully')
        } else {
          res.status(400).json({ message: 'Book Detail Delete Failed' });
        }
      });
    });
  }).catch(err => {
    console.log(err);
    res.status(400).json({ message: 'Book Detail Delete Failed' });
  })


})

module.exports = bookDetails;
