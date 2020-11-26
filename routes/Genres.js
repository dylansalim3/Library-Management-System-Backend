const express = require('express');
const genres = express.Router();
const GenreController = require("../controller/GenreController");

genres.get('/get-all-genre',GenreController.getAllGenre);
genres.post('/add', GenreController.addGenre);

module.exports = genres;