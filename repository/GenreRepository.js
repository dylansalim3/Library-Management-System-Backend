const Genre = require('../models/Genre');

exports.findALlGenre = () =>{
    return Genre.findAll();
}