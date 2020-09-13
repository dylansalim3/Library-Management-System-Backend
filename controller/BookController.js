const Book = require('../models/Book');
const BookDetail = require('../models/BookDetail');
const Author = require('../models/Author');
const BookAuthor = require('../models/BookAuthor');
const db = require('../database/db.js');

exports.addBook = async (req, res) => {
    const today = new Date();
    const author =  req.body.author;
    const status = req.body.status;
    const data = {
        isbn: req.body.isbn,
        title: req.body.title,
        datepublished: req.body.datepublished,
        publisher: req.body.publisher,
        type: req.body.type,
        e_book: req.body.ebook,
        category_id: req.body.category,
        // genre_id: req.body.genre,
        summary: req.body.summary,
        location: req.body.location,
        bookimg: req.body.bookimg,
        status: req.body.status,
        created: today,
    };
    if(req.body.genre){
        data['genre_id'] = req.body.genre;
    }
    db.sequelize.transaction(t=>{
        return Author.findOrCreate({where:{name:author},transaction:t}).spread((author,isCreated)=>{
            console.log(author);
            const authorId =  author.id;
            return BookDetail.findOrCreate({where:data,transaction:t}).spread((bookDetail,isCreated)=>{
                const bookDetailId = bookDetail.id;
                return BookAuthor.findOrCreate({where:{author_id:authorId,book_detail_id:bookDetailId},transaction:t})
                    .spread((bookAuthor,isCreated)=>{
                        return Book.create({status:status,book_detail_id:bookDetailId},{transaction:t});
                    });
            })

        });
    }).then((book)=>{
        data['author']=author;
        data['id'] = book.id;
        res.json({bookdetail:data,status:'book added'})
    }).then(err=>{
        res.send(err);
    });
}