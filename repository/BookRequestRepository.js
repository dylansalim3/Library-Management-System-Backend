const Book = require('../models/Book');
const BookDetail = require('../models/BookDetail');
const User = require('../models/User');
const BookRequest = require('./../models/BookRequest');

exports.createBookRequest = (bookRequest) => {
    return BookRequest.create(bookRequest);
}

exports.bulkCreateBookRequest = (bookRequest, options) => {
    return BookRequest.bulkCreate(bookRequest);
}

exports.findBookRequestByBookId = (bookId, options) => {
    return BookRequest.findOne({ where: { book_id: bookId }, options });
}

exports.findAllExtendBookRequestByUserId = (userId) => {
    return BookRequest.findAll({ where: { user_id: userId, type: 'EXTEND' } });
}

exports.findAllExtendBookRequestByUserIdAndBookId = (userId, bookId) => {
    const queryCriteria = { type: 'EXTEND' };
    if (userId) {
        queryCriteria['user_id'] = userId;
    }
    if (bookId) {
        queryCriteria['book_id'] = bookId;
    }
    return BookRequest.findAll({ where: queryCriteria });
}

exports.findAllExtendBookRequest = () => {
    return BookRequest.findAll({ include: [{ model: Book, include: [BookDetail] },User], where: { type: 'EXTEND' } });
}

exports.findBookRequestByPk = (pk) => {
    return BookRequest.findByPk(pk);
}

exports.updateBookRequestStatus = (bookRequestId, status, reasonReject) => {
    return BookRequest.findOne({ where: { id: bookRequestId } }).then(bookRequest => {
        bookRequest.status = status;
        bookRequest.reasonReject = reasonReject;
        bookRequest.save();
        return bookRequest;
    });
}