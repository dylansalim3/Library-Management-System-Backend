const GenreRepository = require("../repository/GenreRepository");

exports.getAllGenre = (req,res)=>{
    GenreRepository.findALlGenre().then(genres=>{
        res.json(genres);
    });
}