const Book = require("../models/Book");

exports.findBookByBookDetailId = (bookDetailId) => {
    return Book.findOne({where: {book_detail_id: bookDetailId}});
}

exports.findBookById = (bookId) => {
    return Book.findOne({where: {id: bookId}});
}

exports.findBookCountById = (bookId) => {
    return Book.count({where: {id: bookId}})
}
exports.deleteBookByBookDetailId = (bookDetailId, arguments) => {
    return Book.destroy({where: {book_detail_id: bookDetailId}}, arguments);
}

exports.createBook = (bookEntry,arguments) =>{
    return Book.create(bookEntry, arguments);
}