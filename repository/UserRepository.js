const {Sequelize} = require('../database/db.js');
const RoleRepository = require("./RoleRepository");
const User = require('../models/User');
const Role = require('../models/Role');
const db = require('../database/db.js');
const {TeacherAllowedModifiableRole} = require("../constant/AllowedModifiableRoles");
const {AdminAllowedModifiableRoleName} = require("../constant/AllowedModifiableRoles");
const {ModifiableRole} = require("../constant/AllowedModifiableRoles");

exports.findUserByEmail = (email) => {
    return User.findOne({
        where: {
            email: email,
        },
    });
}

exports.findAllUserByEmail = (emails) => {
    return User.findAll({where: {email: emails}});
}

exports.findUserById = (id) => {
    return User.findOne({where: {id: id}});
}

exports.findAllUserById = (idList) => {
    return User.findAll({where: {id: idList}});
}

exports.findAllUserByRole = (modifiableRole) => {
    let allowedRoleName = [];
    if (modifiableRole === ModifiableRole.ADMIN) {
        allowedRoleName = AdminAllowedModifiableRoleName;
    } else if (modifiableRole === ModifiableRole.TEACHER) {
        allowedRoleName = TeacherAllowedModifiableRole;
    }
    return User.findAll({
        include: [{
            model: Role, where: {
                role: allowedRoleName
            }
        },
        ]
    });
}
//     [
//     ...allowedRoleName.map(roleName => {
//         return Sequelize.where(Sequelize.fn('lower', Sequelize.col('role'), roleName),);
//     })
// ]
exports.createUser = (userData, arguments) => {
    return User.create(userData, arguments);
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

exports.findUserByVerificationHash = (verificationHash) => {
    return User.findOne({include: Role, where: {verification_hash: verificationHash}});
}

exports.addUserRole = (userId, roleId) => {
    return User.findOne({include: Role, where: {id: userId}}).then(user => {
        const roleIndex = user.roles.findIndex(role => role.id === roleId);
        if(roleIndex !== -1){
            throw Error("Role existed");
        }
        RoleRepository.findRoleById(roleId).then(role=>{
            user.addRole(role);
            user.save();
            return user;
        });
    });
}

exports.removeUserRole = (userId, roleId) => {
    return User.findOne({include: Role, where: {id: userId}}).then(user => {
        const roleIndex = user.roles.findIndex(role => role.id === roleId);
        if (roleIndex === -1) {
            throw Error("Role is not associated to the user");
        }
        user.removeRole(user.roles[roleIndex]);
        user.save();
        return user;
    });

}


