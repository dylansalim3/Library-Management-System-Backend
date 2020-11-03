const path = require('path');
const chartUtil = require('./../utils/chart.util');

exports.getMonthlyReport = (req, res) => {
    const { month, year } = req.body;

    

    const chartData = [{
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        color: '#800000'
    }];

    const chartDetails = constructBarChartOptions(monthsArray, chartData, null, 'Rainfall (mm)');
    // constructPieChartOptions([
    //     {
    //         name: "a",
    //         y: 100
    //     },
    //     {
    //         name: "b",
    //         y: 20
    //     },
    //     {
    //         name: "c",
    //         y: 50
    //     }
    // ]);
    chartUtil.createChart(chartDetails, 'testPieChart.png', (response, err) => {
        if (err) {
            res.status(500).json({ err: err.toString() });
        }
        if (res) {
            res.json({ message: response });
        }
    })
}

const monthsArray = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

const constructBarChartOptions = (categories, chartData, xAxisText, yAxisText) => {
    return {
        type: "png",
        options: {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Monthly Average Rainfall'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: categories,
                text:xAxisText
            },
            yAxis: {
                min: 0,
                title: {
                    text: yAxisText
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: chartData
        }
    }
}



const constructPieChartOptions = (chartData) => {
    return {
        type: "png",
        options: {
            chart: {
                type: "pie"
            },
            title: {
                text: "Heading of Chart"
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        format: "<b>{point.name}</b>: {point.y}"
                    }
                }
            },
            series: [
                {
                    data: chartData
                }
            ]
        }
    }
}