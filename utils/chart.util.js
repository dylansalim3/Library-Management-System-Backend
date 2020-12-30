const fs = require('fs');
const chartExporter = require('highcharts-export-server');
const path = require('path');

exports.createChart = (chartDetail, filename, cb) => {
    chartExporter.initPool();
    chartExporter.export(chartDetail, (err, res) => {
        if (err) {
            console.log(`err is ${err}`);
            cb(null, err);
        } else if (res === undefined) {
            console.log("response is empty");
            cb(null, err);
        } else {
            const imageb64 = res.data;
            const outputFile = path.join(path.dirname(require.main.filename || process.main.filename), 'uploads', 'generated_charts', filename);
            fs.writeFileSync(outputFile, imageb64, "base64", function (err) {
                if (err) {
                    cb(null, err);
                }
            });
            chartExporter.killPool();
            cb(true);
        }
    });
}