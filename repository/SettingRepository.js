const Setting = require('../models/Setting');
// const { Op, Sequelize } = require('sequelize');
const db = require('../database/db.js');

exports.updateSetting = (
  school_name,
  school_address,
  opening_hours,
  email,
  book_fine,
  reservation_function
) => {
  return db.sequelize.query(
    `UPDATE setting SET school_name = ${JSON.stringify(school_name)}
          ,school_address = ${JSON.stringify(school_address)}
          ,opening_hours = ${JSON.stringify(opening_hours)}
          ,email = ${JSON.stringify(email)}
          ,book_fine = ${JSON.stringify(book_fine)}
          ,reservation_function = ${JSON.stringify(reservation_function)}
          WHERE setting.id =1
          `
  );
};

exports.getSetting = () => {
    return db.sequelize.query(`SELECT * FROM setting WHERE setting.id =1`);
}
