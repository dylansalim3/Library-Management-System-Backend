const Author = require('./../models/Author');

exports.findAuthorByName = async (name) => {
    return Author.findOne(({where: {name: name}}))
}

exports.createAuthor = (name) => {
    return Author.create({name: name});
}

exports.findOrCreateAuthorByName = (name, arguments) => {
    return Author.findOrCreate({where: {name: name}, ...arguments});
}