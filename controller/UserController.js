const User = require('../models/User');
const fs = require('fs');
const csv = require('csv-parser');
const db = require('../database/db.js');
const UserRole = require('../models/UserRole');
const bcrypt = require('bcrypt');
const {buildVerificationEmail,sendEmail} = require('../utils/emailUtils');

const checkUserExist = async(userId) =>{
    const userExist = await User.count({where:{id:userId}});
    return userExist;
}

const checkUserExistByEmail = async(email) =>{
    const userExist = await User.count({where:{email:email}});
    return userExist>0;
}

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

const createUserByCsv = async(req,res) =>{
  const file = req.file;
  const allowedRoles = req.body.allowedRoles;
  const registrationLinkPrefix = req.body.registrationLinkPrefix;
  if (file.mimetype === 'application/vnd.ms-excel' || file.mimetype === 'text/csv') {
    const emails = [];
    const rows = {};
    var errMessage = [];
    var rowNum = 1;

    source = fs.createReadStream(file.path)
      .pipe(csv())
      .on('headers', headers => {
        const isCsvFormatCorrect = isArrayEquals(['email', 'role'], headers);
        if (!isCsvFormatCorrect) {
          res.status(400).json({ message: ['The csv is in incorrect format'] });
          source.destroy();
        }else if(allowedRoles===undefined||allowedRoles.length===0){
          res.status(400).json({ message: ['Allowed roles are empty'] });
          source.destroy();
        }else if(registrationLinkPrefix===undefined){
          res.status(400).json({ message: ['Registration link prefix not found'] });
          source.destroy();
        }
      })
      .on('data', (row) => {
        if (!validateEmail(row['email'])) {
          errMessage.push('Invalid email format at line ' + rowNum);
        } else if (emails.includes(row['email'])) {
          errMessage.push('Duplication of emails at line ' + rowNum);
        }else if(!allowedRoles.includes(row['role'])){
          console.log(allowedRoles,row['role']);
          errMessage.push('Invalid roles assignment at line '+rowNum);
        }
        emails.push(row['email']);
        rows[row['email']] = row['role'];
        rowNum += 1;
      })
      .on('end', async () => {
        const existingUsers = (await User.findAll({ where: { email: emails } }));
        if (existingUsers.length > 0) {
          for (var i = 0; i < existingUsers.length; i++) {
            errMessage.push(existingUsers[i].email + ' user existed');
          }
        }
        if (errMessage.length > 0) {
          res.status(400).json({ message: errMessage });
        } else {

          mappedEmails = emails.map(email => {
            const hashEmail = bcrypt.hashSync(email,10);
            return { 'email': email, 'active':false, verification_hash:hashEmail };
          });

          console.log("mappedEmails",mappedEmails);

          db.sequelize.transaction(t => {
            var promises = [];
            for (var i = 0; i < mappedEmails.length; i++) {
              promises[i] = User.create(mappedEmails[i], { transaction: t });
            }
            return Promise.all(promises).then(users => {
              var userRolePromises = [];
              for (var i = 0; i < users.length; i++) {
                userRolePromises.push(UserRole.create({ user_id: users[i].id, role_id: rows[users[i].email] }, { transaction: t }));
              }
              return Promise.all(userRolePromises);
            });
          }).then(function (result) {
            const addedUserId = result.map(userRole=>{
              return userRole.user_id;
            })
            User.findAll({where:{id:addedUserId}}).then(users=>{
              users.forEach(user=>{
                const email = user.email;
                const verification_hash = user.verification_hash;
                const registrationLink = registrationLinkPrefix+'/'+verification_hash;
                const {subject,text} = buildVerificationEmail(email,registrationLink);
                sendEmail(email,subject,text);
              });
            }).then(()=>{
              res.send(result);
            }).catch(err=>{
              console.log(err);
              res.status(400).json({ message: 'Email to users operations failed' });
            })
          }).catch(function (err) {
            console.log(err);
            return res.send(err);
            // res.status(400).json({ message: errMessage });
          })
        }


      });
  } else {
    res.json('Wrong document format')
  }
}

module.exports = {checkUserExist,checkUserExistByEmail,createUserByCsv}