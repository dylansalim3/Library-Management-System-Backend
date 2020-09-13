const Book = require("../models/Book");

exports.findBookByBookDetailId = (bookDetailId) => {
    return Book.findOne({where: {book_detail_id: bookDetailId}});
}

exports.findBookById = (bookId) => {
    return Book.findOne({where: {id: bookId}});
}

exports.findBookCountById = (bookId) =>{
    return Book.count({where:{id:bookId}})
}