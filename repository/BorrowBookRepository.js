const BorrowBook = require("../models/BorrowBook");
const {Sequelize} = require('./../database/db');

exports.findBorrowBookCountByUserId = (userId) => {
    return BorrowBook.count({ user_id: userId });
}

exports.createBorrowBook = ({ start_date: startDate, due_date: dueDate, book_id: bookId, user_id: userId }) => {
    return BorrowBook.create({ start_date: startDate, due_date: dueDate, book_id: bookId, user_id: userId });
}

exports.findBorrowBookByBookId = (bookId) => {
    return BorrowBook.findOne({ book_id: bookId });
}

exports.findAllBorrowBook = (options) => {
    return BorrowBook.findAll(options);
}

exports.getOverdueBooksCount = () => {
    return BorrowBook.count({ where: { due_date: { $gt: new Date() } } });
}

exports.getCurrentMonthBorrowedBookCount = () => {
    return BorrowBook.count(Sequelize.fn('month',Sequelize.col('start_date')),new Date().getMonth());
}