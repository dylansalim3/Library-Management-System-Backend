const express = require('express');
const genres = express.Router();
const GenreController = require("../controller/GenreController");

genres.get('/get-all-genre',GenreController.getAllGenre);

module.exports = genres;