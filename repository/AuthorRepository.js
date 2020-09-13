const Author = require('./../models/Author');

const findAuthorById = async (id) => {
    return Author.findOne({where: {id: id}});
}

const findAuthorByName = async (name) => {
    return Author.findOne(({where: {name: name}}))
}

const createAuthor = (name) => {
    return Author.create({name: name});
}

module.exports = {findAuthorById, findAuthorByName, createAuthor};