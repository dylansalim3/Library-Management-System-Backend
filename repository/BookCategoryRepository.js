const Category = require('./../models/Category');

exports.findAllCategory = () => {
  return Category.findAll();
};

exports.createCategory = (name) => {
  return Category.create({ name: name });
};

