const User = require('../models/User');
const db = require('../database/db.js');

exports.findUserByEmail = (email) => {
    return User.findOne({
        where: {
            email: email,
        },
    });
}

exports.createUser = (userData) => {
    return User.create(userData);
}

exports.updateUserProfile = (firstName, lastName, profileImg, address, phoneNum, userid) => {
    return db.sequelize
        .query(
            `UPDATE users SET first_name = ${JSON.stringify(firstName)}
          ,last_name = ${JSON.stringify(lastName)}
          ,profileimg = ${JSON.stringify(profileImg)}
          ,address = ${JSON.stringify(address)}
          ,phonenum = ${JSON.stringify(phoneNum)}
          WHERE users.id =${JSON.stringify(userid)}
          `
        );
}

exports.findUserById = (id) => {
    return User.findOne({where: {id: id}});
}

exports.findUserByEmailAndRole = (email, role) => {
    return db.sequelize
        .query(
            `SELECT users.* FROM users INNER JOIN user_role ON users.id = user_role.user_id
                INNER JOIN role ON user_role.role_id = role.id
                WHERE 
                role.role = ${JSON.stringify(role)} 
                AND users.email = ${JSON.stringify(email)}`,
            {type: db.sequelize.QueryTypes.SELECT}
        );
}

exports.checkUserExist = async (userId) => {
    const userExist = await User.count({where: {id: userId}});
    return userExist;
}

exports.checkUserExistByEmail = async (email) => {
    const userExist = await User.count({where: {email: email}});
    return userExist > 0;
}