const User = require('../models/User');

const checkUserExist = async(userId) =>{
    const userExist = await User.count({where:{id:userId}});
    return userExist;
}

module.exports = {checkUserExist}