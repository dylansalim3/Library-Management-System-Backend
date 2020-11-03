const Book = require("../models/Book");
const { Op, Sequelize } = require("sequelize");

exports.findBookByBookDetailId = (bookDetailId) => {
    return Book.findOne({ where: { book_detail_id: bookDetailId } });
}

exports.findAllAvailableBooksByBookDetailId = (bookDetailId) => {
    return Book.findAll({
        where: 
        {
            [Op.and]:
                [{ book_detail_id: bookDetailId },
                    Sequelize.where(
                        Sequelize.fn('upper', Sequelize.col('status')),
                        {
                          [Op.eq]: 'AVAILABLE'
                        }
                      )
            ]
        }
    });
}

exports.findBookById = (bookId) => {
    return Book.findOne({ where: { id: bookId } });
}

exports.findBookCountById = (bookId) => {
    return Book.count({ where: { id: bookId } })
}
exports.deleteBookByBookDetailId = (bookDetailId, arguments) => {
    return Book.destroy({ where: { book_detail_id: bookDetailId } }, arguments);
}

exports.createBook = (bookEntry, arguments) => {
    return Book.create(bookEntry, arguments);
}

exports.getBookCreatedCurrentMonthCount = () => {
    return Book.count({ where: (Sequelize.fn('month', Sequelize.col('start_date')), new Date().getMonth()) });
}