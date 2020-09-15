const UserRepository = require("../repository/UserRepository");
const BookRepository = require("../repository/BookRepository");
const BorrowBookRepository = require("../repository/BorrowBookRepository");

exports.addBorrowBook = async (req, res) => {
    const startDate = req.body.startDate;
    const dueDate = req.body.endDate;
    const bookId = req.body.bookId;
    const userId = req.body.userId;
    const userExist = await UserRepository.checkUserExist(userId);
    const isBookAvailable = await BookRepository.findBookById(bookId).then(book => {
        if (book) {

            return book.status.toUpperCase() === 'AVAILABLE';
        } else {
            return false;
        }
    });

    if (!userExist) {
        res.status(400).json({message: "User does not exist"})
    } else if (!isBookAvailable) {
        res.status(400).json({message: "Book is not available"})
    } else {

        BorrowBookRepository.findBorrowBookCountByUserId(userId).then(count => {
            if (count < 3) {
                BorrowBookRepository.createBorrowBook({start_date: startDate, due_date: dueDate, book_id: bookId, user_id: userId})
                    .then(borrowBook => {
                        return BookRepository.findBookById(bookId).then(book => {
                            book.status = 'UNAVAILABLE';
                            return book.save();
                        }).then(() => {
                            res.json(borrowBook);
                        })
                    });

            } else {
                res.status(400).json({message: "More than 3 books borrowed by this student"});
            }
        });
    }
}