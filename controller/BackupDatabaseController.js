const path = require("path");
const fs = require('fs');

const db = require('../database/db');
const mysqldump = require('mysqldump');
const Importer = require("mysql-import");

const tableName = process.env.db_table_name;
const userName = process.env.db_username;
const password = process.env.db_password;
const host = process.env.db_host;
const port = process.env.db_port;

const importer = new Importer({ host: host, port: port, user: userName, password: password, database: tableName });

exports.backupDatabase = (req, res) => {
    const fileName = 'dump.sql';
    const options = {
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true,
            'content-disposition': "attachment; filename=" + fileName, // gets ignored
            'content-type': "text/csv"
        }
    }
    dumpSqlFile({ dumpToFile: './migrations/dump.sql' }).then(result => {
        const filePath = `${__dirname}/../migrations/${fileName}`;
        res.download(
            filePath,
            fileName,
            options
        );
    }).catch(err => {
        res.status(500).json({ error: `Error occurred while migrating ${err.toString()}` });
    });
}

exports.restoreDatabase = (req, res) => {
    const file = req.file;
    dumpSqlFile({ dumpToFile: './migrations/backup.sql' }).then(async result => {
        await db.sequelize.dropAllSchemas().catch(err => {
            res.status(500).json({ error: "Error in dropping databases", message: err.toString() });
        });
        importer.import(file.path).then(() => {
            let files_imported = importer.getImported();
            res.json(`${files_imported.length} SQL file(s) imported.`);
        }).catch(async err => {
            console.log('failed to restore db');
            await importer.import(`${__dirname}/../migrations/backup.sql`).catch(err => {
                res.status(500).json({ error: "Error in restoring restore old data", message: err.toString() });
            });
            res.status(500).json({ error: "Error in restoring database", message: err.toString() });
        });
    }).catch(err => {
        res.status(500).json({ error: "Error in backing up database", message: err.toString() });
    })

}

const dumpSqlFile = ({ dumpToFile }) => {
    return mysqldump({
        connection: {
            host: host,
            port: port,
            user: userName,
            password: password,
            database: tableName,
        },
        dumpToFile: dumpToFile,
    })
}