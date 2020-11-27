const Genre = require('../models/Genre');

exports.findAllGenre = () =>{
    return Genre.findAll();
}

exports.createGenre= (name) => {
  return Genre.create({ name: name });
};