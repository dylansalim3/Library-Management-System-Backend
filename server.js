var express = require("express");
// var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 5000;

app.use(bodyParser.json());
// app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));

var multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        //rejects storing a file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


// var upload = multer({ dest: 'uploads/' });

var Users = require('./routes/Users');
var Books = require('./routes/Books');
var BookDetails = require('./routes/BookDetails');
var borrowBooks = require('./routes/BorrowBooks');
var BorrowBooksHistory = require('./routes/BorrowBooksHistory');
var Genres = require('./routes/Genres');
var Roles = require('./routes/Roles');

app.use('/uploads', express.static('uploads'));
app.use('/users', Users);
app.use('/books', Books);
app.use('/book-details',BookDetails);
app.use('/borrow-books', borrowBooks);
app.use('/borrow-books-history',BorrowBooksHistory);
app.use('/genres', Genres);
app.use('/roles',Roles);


app.post('/file', upload.single('file'), function (req, res, next) {
    const filepath = req.file.path;
//   console.log(file.filename);
    res.send(filepath);
});


const borrowBook = require('./models/BorrowBook');
const borrowBookHistory = require('./models/BorrowBookHistory');
const book = require('./models/Book');
const bookDetail = require('./models/BookDetail');
const user = require('./models/User');
const genre = require('./models/Genre');
const bookAuthor = require('./models/BookAuthor');
const author = require('./models/Author');
const role = require('./models/Role');
const userRole = require('./models/UserRole');
const category = require('./models/Category');
const db = require('./database/db');
book.belongsTo(bookDetail, {foriegnKey:'book_detail_id',constraint: true, OnDelete: 'CASCADE'});
bookDetail.hasMany(book,{foriegnKey:'book_detail_id'});

borrowBook.belongsTo(book, {foreignKey: 'book_id',constraint: true, OnDelete: 'CASCADE'});
book.hasMany(borrowBook,{foreignKey: 'book_id'});
borrowBook.belongsTo(user,{foreignKey: 'user_id',});
user.hasMany(borrowBook,{foreignKey: 'user_id',});

borrowBookHistory.belongsTo(book,{foreignKey:'book_id'});
book.hasMany(borrowBookHistory,{foreignKey:'book_id'});
borrowBookHistory.belongsTo(user,{foreignKey:'user_id'});
book.hasMany(borrowBookHistory,{foreignKey:'user_id'});

bookDetail.belongsTo(genre, {foreignKey: 'genre_id'});
genre.hasOne(bookDetail, {foreignKey: 'genre_id'});
bookDetail.hasMany(author);
author.belongsToMany(bookDetail, {through: bookAuthor});
user.hasMany(role);
role.belongsToMany(user, {through: userRole});

bookDetail.hasOne(category);
category.belongsTo(bookDetail);



// borrowBook.create({due_date:new Date().now, bookId:7,userId:1});

db.sequelize.sync();
//     .then(() => {
//     return user.create({
//         email: 'dylansalim015@gmail.com',
//         first_name: 'dylan',
//         last_name: 'salim',
//         password: 'test123',
//         role: [
//             {
//                 role: "student"
//             }
//         ]
//     });
// })
//     .then(() => {
//
//     return bookDetail.bulkCreate([{
//         isbn: 'ss',
//         title: 'ss',
//         publisher: 's2',
//         type: 'PHYSICAL',
//         e_book: null,
//         category_id: 2,
//         genre_id: 2,
//         location: 'swq',
//         bookimg: 'uploads/1589162180832developmentprocess.jpg',
//         summary: 'this is summary',
//         book:{
//
//         }
//     },
//         {
//             isbn: 'isbn',
//             title: 'book title',
//             publisher: 'publisher name 1',
//             type: 'PHYSICAL',
//             e_book: null,
//             category_id: 3,
//             genre_id: 1,
//             location: 'location 1',
//             bookimg: 'uploads/1589162366744Turquoise Monster Cute Desktop Wallpaper.png',
//             summary: 'this is summary'
//         }]);

// }).then(() => {
//     return role.bulkCreate([{
//         role: 'admin'
//     },
//         {
//             role:'student'
//         },
//         {
//             role:'librarian'
//         },
//         {
//             role:'teacher'
//         }
//     ]);
// });
//.then(()=>{
//     return borrowBook.findOne(1);
// }).then(borrowBook=>{
//     if(!borrowBook){
//         borrowBook.create()
//     }
// });

app.listen(port, () => {
    console.log("Server is running on part: " + port)
});

module.exports = upload;