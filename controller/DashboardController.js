const UserRepository = require('./../repository/UserRepository');
const BorrowBookRepository = require('./../repository/BorrowBookRepository');

exports.getAdminDashboardData = async (req, res) => {
    try {
        const studentCount = await UserRepository.getStudentsCount();
        const teacherCount = await UserRepository.getTeacherCount();
        const overdueBookCount = await BorrowBookRepository.getOverdueBooksCount();
        const booksCurrentBorrowed = await BorrowBookRepository.getCurrentMonthBorrowedBookCount();

        res.json({ studentCount, teacherCount, overdueBookCount, booksCurrentBorrowed });
    } catch (err) {
        res.status(500).json({ err: err.toString() });
    }
}