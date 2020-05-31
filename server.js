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
    destination: function( req,file,cb){
        cb(null,'./uploads/')
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + file.originalname);
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype ==='image/jpeg'|| file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        //rejects storing a file
        cb(null,false);
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
var borrowBooks = require('./routes/BorrowBooks');

app.use('/uploads',express.static('uploads'));
app.use('/users',Users);
app.use('/books',Books);
app.use('/borrow-books',borrowBooks);

app.post('/file', upload.single('file'), function (req, res, next) {
  const filepath = req.file.path;
//   console.log(file.filename);
  res.send(filepath);
});



// const db = require('./database/db');
const borrowBook = require('./models/BorrowBook');
const book = require('./models/Book');
const user = require('./models/User');
const db = require('./database/db')
borrowBook.belongsTo(book,{foreign_key:'book_id',constraint: true, OnDelete: 'CASCADE'});
book.hasMany(borrowBook);
borrowBook.belongsTo(user,{foreign_key:'user_id'});
user.hasMany(borrowBook);

// borrowBook.create({due_date:new Date().now, bookId:7,userId:1});

db.sequelize.sync();
//.then(()=>{
//     return borrowBook.findOne(1);
// }).then(borrowBook=>{
//     if(!borrowBook){
//         borrowBook.create()
//     }
// });

app.listen(port, ()=> {
    console.log("Server is running on part: " + port)
});