const UserRepository = require('./../repository/UserRepository');
const BorrowBookRepository = require('./../repository/BorrowBookRepository');
const BorrowBookHistoryRepository = require('./../repository/BorrowBookHistoryRepository');
const BookRepository = require('./../repository/BookRepository');

exports.getAdminDashboardData = async (req, res) => {
    try {
        const studentCount = await UserRepository.getStudentsCount();
        const teacherCount = await UserRepository.getTeacherCount();
        const overdueBookCount = await BorrowBookRepository.getOverdueBooksCount();
        const booksCurrentBorrowed = await BorrowBookRepository.getCurrentMonthBorrowedBookCount();
        const booksHistoryCurrentBorrowed = await BorrowBookHistoryRepository.getCurrentMonthBorrowedBook();
        const totalBookBorrowedCount = booksCurrentBorrowed + booksHistoryCurrentBorrowed;

        res.json({ studentCount, teacherCount, overdueBookCount, booksCurrentBorrowed:totalBookBorrowedCount });
    } catch (err) {
        res.status(500).json({ err: err.toString() });
    }
}

exports.getStudentDashboardData = async (req, res) => {
    try {
        const { userId } = req.body;
        const onLoanBookCount = await BorrowBookRepository.getBorrowBookCount(userId);
        const booksBorrowedCurrentMonthCount = await BorrowBookRepository.getCurrentMonthBorrowedBookByUserId(userId);
        const booksBorrowedHistoryCurrentMonthCount = await BorrowBookHistoryRepository.getCurrentMonthBorrowedBookByUserId(userId);
        const booksBorrowedCount = booksBorrowedCurrentMonthCount + booksBorrowedHistoryCurrentMonthCount;
        const overdueBookCount = await BorrowBookRepository.getOverdueBooksCountByUserId(userId);
        const booksAddedCurrentMonth = await BookRepository.getBookCreatedCurrentMonthCount();

        res.json({ onLoanBookCount, booksBorrowedCount, overdueBookCount, booksAddedCurrentMonth });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err.toString() });
    }
}