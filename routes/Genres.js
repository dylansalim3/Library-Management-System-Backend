const express = require('express');
const genres = express.Router();
const Genre = require('../models/Genre');
const db = require('../database/db.js');

genres.get('/get-all-genre',(req,res)=>{
    Genre.findAll().then(genres=>{
        res.json(genres);
    });
});

module.exports = genres;