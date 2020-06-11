const express = require('express');
const users = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const db = require('../database/db.js');
const path = require('path');
const fs = require('fs');
const UserRole = require('../models/UserRole');
const Role = require('../models/Role');
const { createUserByCsv,createUser } = require('../controller/UserController');
const {sendEmail} = require('../utils/emailUtils');

process.env.SECRET_KEY = 'secret_fyp';

users.get('/get-user/:user_id', (req, res) => {
  User.findOne({
    id: req.params.user_id,
  }).then(user => {
    res.json(user);
  });
})
users.post('/profile',(req,res) =>{
    db.sequelize.query(
      `SELECT users.* FROM users WHERE users.id = ${JSON.stringify(
        req.body.userid
      )}`,
      { type: db.sequelize.QueryTypes.SELECT }
    ).then(result=>{
      res.send({ userdata: result });
    })
})

users.post('/updateprofile',(req,res)=>{
      db.sequelize
        .query(
          `UPDATE users SET first_name = ${JSON.stringify(req.body.first_name)}
          ,last_name = ${JSON.stringify(req.body.last_name)}
          ,profileimg = ${JSON.stringify(req.body.profileimg)}
          ,address = ${JSON.stringify(req.body.address)}
          ,phonenum = ${JSON.stringify(req.body.phonenum)}
          WHERE users.id =${JSON.stringify(req.body.userid)}
          `
        )
        .then((result) => {
          res.send({ result: result });
        });
})

users.post('/register', (req, res) => {
  const today = new Date();
  const roleId = req.body.roleId;
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today,
  };

  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      const message = '';
      const err = '';
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          db.sequelize.transaction(t => {
            return User.create(userData, { transaction: t })
              .then((user) => {
                return UserRole.create({ role_id: roleId, user_id: user.id }, { transaction: t }).then(userRole => {
                  res.json({ status: user.email + ' registered' });
                });
              });
          }).catch(function (err) {
            t.rollback();
            res.send(err);
            return done(err);
          });
        });
      } else {
        res.json({ error: ' User already exists' });
      }
    })
    .catch((err) => {
      res.send('error: ' + err);
    });
});

users.post('/loginwithrole', (req, res) => {
  console.log("request body role: " + req.body.role);
  db.sequelize
    .query(
      `SELECT users.* FROM users WHERE users.email = ${JSON.stringify(
        req.body.email
      )}`,
      { type: db.sequelize.QueryTypes.SELECT }
    )
    .then((results) => {

      if (results.length == 1) {
        console.log('user exists');

        if (bcrypt.compareSync(req.body.password, results[0].password)) {
          // console.log("result is "+JSON.parse(results[0]));
          // // JSON.stringify(result[0]).role="admin";
          // let userData = JSON.parse(JSON.stringify(result[0]));
          // console.log('result is ' + userData);

          // results[0].push({role:"admin"});
          let mydata = JSON.stringify(results[0]);
          mydata = JSON.parse(mydata);
          mydata['role'] = req.body.role;
          console.log(JSON.stringify(mydata));
          let token = jwt.sign(mydata, process.env.SECRET_KEY);
          console.log("Correct password");
          //check role
          db.sequelize
            .query(
              `SELECT users.* FROM users INNER JOIN user_role ON users.id = user_role.user_id
                INNER JOIN role ON user_role.role_id = role.id
                WHERE 
                role.role = ${JSON.stringify(req.body.role)} 
                AND users.email = ${JSON.stringify(req.body.email)}`,
              { type: db.sequelize.QueryTypes.SELECT }
            )
            .then((results) => {
              if (results.length == 1) {
                res.send({ token: token });
              } else {
                console.log('Wrong role selected');
                res.send({ error: 'Wrong role selected' });
              }
            })
            .catch((err) => {
              console.log(err);
            });


        } else {
          console.log('Wrong password');
          res.send({ error: 'Wrong password' });
        }
      } else if (results.length == 0) {
        console.log('user does not exist');
        res.send({ error: "User does not exist" })
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

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

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
function isArrayEquals(x, y) {
  var objectsAreSame = true;
  for (var propertyName in x) {
    if (x[propertyName] !== y[propertyName]) {
      objectsAreSame = false;
      break;
    }
  }
  return objectsAreSame;
}


users.post('/register-user', upload.single('file'), async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const role = req.body.role;
  if(req.file){
    await createUserByCsv(req,res);
    try{
      fs.unlinkSync(path.resolve(__dirname,'..',req.file.path));    
    }catch(err){
      console.log(err);
    }
  }else if(email){
    await createUser(req,res);
  }
});

users.post('/complete-registration',(req,res)=>{
  const userId = req.body.userid;
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const profileimg = req.body.profileimg;
  const address = req.body.address;
  const phonenum = req.body.phonenum;
  const password = req.body.password;

  const hashPassword = bcrypt.hashSync(password,10);

  User.findOne({where:{id:userId}}).then(user=>{
    user.first_name = firstName;
    user.last_name = lastName;
    user.profileimg = profileimg;
    user.address = address;
    user.phonenum = phonenum;
    user.password = hashPassword;
    user.active = true;
    user.verification_hash = '';
    return user.save();
  }).then(result=>{
    res.json(result);
  }).catch(err=>{
    res.status(400).json({message:err});
  })

})

users.get('/get-registration-csv', (req, res) => {
  var csvLink = req.protocol + '://' + req.get('host') ;

  if(req.query.role==='teacher'){
    csvLink += '/uploads/registration/teacher/' + 'Format.csv';
  }else{
    csvLink += '/uploads/registration/admin/' + 'Format.csv';
  }
  
  res.send(csvLink);
})

users.post('/get-user-by-verification-hash',(req,res)=>{
  const hash = req.body.hash;
  User.findOne({where:{verification_hash:hash}}).then(user=>{
    const userId=user.id;
    // res.json(user);
    UserRole.findOne({where:{user_id:userId}}).then(userRole=>{
      const roleId = userRole.role_id;
      Role.findOne({where:{id:roleId}}).then(role=>{
        // const role = role.name;
        res.json({user,role});
      })
    })
  }).catch(err=>{
    res.status(400).json({message:'User have been registered'});
  });
})

module.exports = users;