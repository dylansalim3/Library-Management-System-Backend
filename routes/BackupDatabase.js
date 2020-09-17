const express = require('express');
const backupData = express.Router();
const BackupDatabaseController  =require('../controller/BackupDatabaseController');
const Mutler = require("../utils/mutler.util");

backupData.post('/backup-data',BackupDatabaseController.backupDatabase);

backupData.post('/restore-data',Mutler.uploadSQLFile.single('file'),BackupDatabaseController.restoreDatabase)

module.exports = backupData;