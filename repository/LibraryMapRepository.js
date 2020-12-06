const LibraryMap = require('../models/LibraryMap');
const db = require("../database/db");

exports.findLibraryMaps = () => {
    return LibraryMap.findAll();
}

exports.findLibraryMapByPk = (pk) => {
    return LibraryMap.findByPk(pk);
}

exports.findLibraryMapByFloorAndName = (floor, name) => {
    return LibraryMap.findOne({where: {floor_name: floor, name: name}});
}

exports.findOrCreateLibraryMap = (entry) => {
    return LibraryMap.findOrCreate({where: entry});
}

exports.deleteLibraryMapByPk = (pk) =>{
    return LibraryMap.destroy({where: {id: pk}});
}