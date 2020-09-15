const {Sequelize} = require('../database/db.js');
const BookDetail = require('../models/BookDetail');
const Genre = require('../models/Genre');
const Book = require('../models/Book');
const Author = require('./../models/Author');

exports.getBookDetails = async (searchCriteria, searchCriteriaType, genreId) => {
    const a = {};
    if (genreId) {
        a['genre_id'] = genreId;
    }
    if (searchCriteria) {
        a[searchCriteriaType] = {[Sequelize.Op.like]: `%${searchCriteria}%`};
    }

    return BookDetail.findAll({
        include: [Genre, Book, {model: Author, as: 'authors', attributes: ['name']}],
        where: (Sequelize.fn('lower', Sequelize.col(searchCriteriaType)), a)
    }).map(book => {
        return book;
    });
}

exports.getThreeLatestBook = () => {
    return BookDetail.findAll({
        include: [Genre, Book, Author],
        limit: 3,
        order: [['datepublished', 'DESC']]
    }).map(book => {
        if (book.authors.length > 0) {
            book['author'] = book.authors[0].name;
        }
        return book;
    });
}

exports.findBookDetailById = (bookDetailId, arguments) => {
    return BookDetail.findOne({where: {id: bookDetailId}}, arguments);
}

exports.deleteBookDetailById = (bookDetailId, arguments) => {
    return BookDetail.destroy({where: {id: bookDetailId}}, arguments)
}

exports.findOrCreateBookDetail = (bookDetailEntry, arguments) => {
    return BookDetail.findOrCreate({where: bookDetailEntry, ...arguments});
}

