const BorrowBook = require("../models/BorrowBook");
const Book = require('../models/Book');
const BookDetail = require('../models/BookDetail');
const { Op, Sequelize } = require("sequelize");

exports.findBorrowBookCountByUserId = (userId) => {
    return BorrowBook.count({ user_id: userId });
}

exports.createBorrowBook = ({ start_date: startDate, due_date: dueDate, book_id: bookId, user_id: userId }) => {
    return BorrowBook.create({ start_date: startDate, due_date: dueDate, book_id: bookId, user_id: userId });
}

exports.findBorrowBookByBookId = (bookId) => {
    return BorrowBook.findOne({ book_id: bookId });
}

exports.findBorrowBookByPk = (pk, options) => {
    return BorrowBook.findOne({ where: { id: pk }, options });
}

exports.findAllBorrowBook = (userId) => {
    return BorrowBook.findAll({ include: [{ model: Book, require: true, include: [BookDetail] }], where: { user_id: userId } });
}

exports.findAllBorrowBookByUserIdAndBookId = (userId, bookId) => {
    const queryCriteria = {};
    if (userId) {
        queryCriteria['user_id'] = userId;
    }
    if (bookId) {
        queryCriteria['book_id'] = bookId;
    }
    return BorrowBook.findAll({ include: [{ model: Book, require: true, include: [BookDetail] }], where: queryCriteria });
}

exports.getBorrowBookCount = (userId) => {
    return BorrowBook.count({ where: { user_id: userId } });
}

exports.getCurrentMonthBorrowedBookByUserId = (userId) => {
    return BorrowBook.count({ where: { [Op.and]: [{ user_id: userId }, Sequelize.fn('month', Sequelize.col('start_date')), new Date().getMonth()] } });
}

exports.getOverdueBooksCount = () => {
    return BorrowBook.count({ where: { due_date: { $lt: new Date() } } });
}

exports.getOverdueBooksCountByUserId = (userId) => {
    return BorrowBook.count({ where: { user_id: userId, due_date: { $lt: new Date() } } });
}

exports.getCurrentMonthBorrowedBookCount = () => {
    return BorrowBook.count({ where: (Sequelize.fn('month', Sequelize.col('start_date')), new Date().getMonth()) });
}

exports.getTotalOverdueBooksCount = () => {
    return BorrowBook.count({ where: { due_date: { $lt: new Date() } } });
}

exports.extendDueDate = (bookId, userId, newDueDate) => {
    return BorrowBook.findOne({ where: { book_id: bookId, user_id: userId } }).then(borrowBook => {
        if (!borrowBook) {
            throw Error("Borrow Book entry not found");
        }
        borrowBook.due_date = newDueDate;
        borrowBook.save();
        return borrowBook;
    });
}

exports.extendDueDateByBorrowBookId = (borrowBookId, newDueDate) => {
    return BorrowBook.findOne({ where: { id: borrowBookId } }).then(borrowBook => {
        borrowBook.due_date = newDueDate;
        borrowBook.save();
        return borrowBook;
    });
}
