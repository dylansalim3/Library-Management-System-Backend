const express = require('express');
const users = express.Router();

const UserController = require("../controller/UserController");

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/vnd.ms-excel' || file.mimetype === 'text/csv') {
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
});


users.post('/admin/get-all-profile', UserController.adminGetAllProfile);

users.post('/profile', UserController.getUserById);

users.post('/updateprofile', UserController.updateUserProfile);

users.post('/register', UserController.registerUser);

users.post('/loginwithrole', UserController.loginWithRole);

users.post('/register-user', upload.single('file'), UserController.registerUserByCsv);

users.post('/complete-registration', UserController.completeRegistration);

users.get('/get-registration-csv', UserController.getRegistrationCsv);

users.post('/get-user-by-verification-hash', UserController.getUserByVerificationHash);

users.post('/delete-user-role', UserController.removeUserRole);

users.post('/add-user-role', UserController.addUserRole);

users.post('/reset-password', UserController.sendForgetPasswordEmail);


module.exports = users;
