const multer = require('multer');

const libraryMapStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/library_map/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname.replace(' ','-'));
    }
})

const imageFileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        //rejects storing a file
        cb(null, false);
    }
}

exports.uploadImageFile = multer({
    storage: libraryMapStorage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: imageFileFilter
});


