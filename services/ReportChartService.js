const {CanvasRenderService} = require('chartjs-node-canvas');
const path = require('path');
const fs = require('fs');

// const stream = canvasRenderService.renderToStream(configuration);
// const imageBuffer = await canvasRenderService.renderToBuffer(configuration);


exports.generateCharts = () => {
    const width = 400;
    const height = 400;
    const chartCallback = (ChartJS) => {

        // Global config example: https://www.chartjs.org/docs/latest/configuration/
        ChartJS.defaults.global.elements.rectangle.borderWidth = 2;
        // Global plugin example: https://www.chartjs.org/docs/latest/developers/plugins.html
        ChartJS.plugins.register({
            // plugin implementation
        });
        // New chart type example: https://www.chartjs.org/docs/latest/developers/charts.html
        ChartJS.controllers.MyType = ChartJS.DatasetController.extend({
            // chart implementation
        });
    };

    const canvasRenderService = new CanvasRenderService(width, height, chartCallback);

    (async () => {
        const configuration = {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            callback: (value) => '$' + value
                        }
                    }]
                }
            }
        };
        const dataUrlBase64 = await canvasRenderService.renderToDataURL(configuration);

        var base64Data = dataUrlBase64.replace(/^data:image\/png;base64,/, "");
        const outputFile = path.join(path.dirname(require.main.filename || process.main.filename), 'generated_charts', "sample.png");
        fs.writeFile(outputFile, base64Data, "base64", function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("done");
        });
    })();
}

