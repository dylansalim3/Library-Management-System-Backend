const express = require('express');
const users = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const db = require('../database/db.js');

process.env.SECRET_KEY = 'secret_fyp';

users.post('/register', (req, res) => {
  const today = new Date();
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
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.json({ status: user.email + ' registered' });
            })
            .catch((err) => {
              res.send('error: ' + err);
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
    console.log("request body role: "+req.body.role);
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
        res.send({error:"User does not exist"})
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});


module.exports = users;
