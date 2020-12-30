const path = require('path');
const chartUtil = require('./../utils/chart.util');
const UserRepository = require('./../repository/UserRepository');
const BorrowBookRepository = require('./../repository/BorrowBookRepository');
const BorrowBookHistoryRepository = require('./../repository/BorrowBookHistoryRepository');
const {BORROWED_MAX, OVERDUE_MAX, ADDED_MAX, RENEWED_MAX} = require('./../constant/constant');
const chart = require('highcharts-export-server/lib/chart');
const ReportChartService = require('./../services/ReportChartService');
const ReportService = require('./../services/ReportService');

exports.getMonthlyReport = async (req, res) => {
    let {month, year} = req.body;

    if (month === undefined || month < 1 || month > 12) {
        month = new Date().getMonth();
    }
    if (year === undefined || year < 2020) {
        year = new Date().getFullYear;
    }
    let hasError = false;

    // createNewUserChart().then(result => {
    //     createAllUserChart().then(result => {
    //         res.json(result);
    //     });
    // });

    // await createNewUserChart(12, 2020, error => {
    //     hasError = true;
    // });
    // await createAllUserChart(error => {
    //     hasError = true;
    // });
    //
    // await createNumberOfBorrowedBookChart(12,2020,error=>{
    //     hasError = true;
    // })
    ReportChartService.generateCharts();
    ReportService.createMonthlyReport();


    if(hasError){
        res.json({msg:"failed"});
    }else{
        res.json({msg: "success"});
    }
    // createAllUserChart().then(result=>{
    //     res.json(result);
    // })

    // Promise.all([createNewUserChart(),createAllUserChart()]).then((result)=>{
    //     res.json(result);
    // })

    // createNumberOfBorrowedBookChart();

    // const chartData = [{
    //     name: 'Tokyo',
    //     data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
    //     color: '#800000'
    // }];

    // const chartDetails = constructBarChartOptions(monthsArray, chartData,'title', null, 'Rainfall (mm)');


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


    // chartUtil.createChart(chartDetails, 'testPieChart.png', (response, err) => {
    //     if (err) {
    //         res.status(500).json({ err: err.toString() });
    //     }
    //     if (res) {
    //         res.json({ message: response });
    //     }
    // })
}

const createNewUserChart = async (month, year, error) => {

    const {studentCountPromise, teacherCountPromise} = UserRepository.getNewUserCount(month, year);

    const studentCount = await studentCountPromise;
    const teacherCount = await teacherCountPromise;

    const chartData = [
        {
            name: "Student",
            y: studentCount,
        },
        {
            name: "Teacher",
            y: teacherCount,
        }
    ];

    console.log(chartData);

    const chartDetails = constructPieChartOptions(chartData, 'New Users');

    console.log(chartDetails);

    chartUtil.createChart(chartDetails, 'newUsers.png', (response, err) => {
        if (err) {
            error(err);
        }else{
            return {studentCount, teacherCount};
        }
    })


}

const createAllUserChart = async (error) => {

    const {studentCountPromise, teacherCountPromise} = UserRepository.getTotalUserCount();

    const studentCount = await studentCountPromise;
    const teacherCount = await teacherCountPromise;

    const chartData = [
        {
            name: "Student",
            y: studentCount,
        },
        {
            name: "Teacher",
            y: teacherCount,
        }
    ];

    const chartDetails = constructPieChartOptions(chartData, 'Total Users');

    chartUtil.createChart(chartDetails, 'totalUsers.png', (response, err) => {
        if (err) {
            error(err);
        }
        return {studentCount, teacherCount};
    });


}

const createNumberOfBorrowedBookChart = async (month, year, error) => {
    const booksCurrentBorrowed = await BorrowBookRepository.getCurrentMonthBorrowedBookCount();
    const booksHistoryCurrentBorrowed = await BorrowBookHistoryRepository.getCurrentMonthBorrowedBook();
    const totalBookBorrowedCount = booksCurrentBorrowed + booksHistoryCurrentBorrowed;

    const remainderCount = BORROWED_MAX - totalBookBorrowedCount > 0 ? BORROWED_MAX - totalBookBorrowedCount : 0;

    const chartData = [
        ['Number of Books Borrowed', totalBookBorrowedCount],
        {
            name: 'Other',
            y: remainderCount,
            dataLabels: {
                enabled: false
            }
        }
    ];

    const chartDetails = constructSemiCircleChart(chartData, 'Number of Borrowed Books');

    chartUtil.createChart(chartDetails, 'numOfBorrowedBooks.png', (response, err) => {
        if (err) {
            error(err);
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

const constructBarChartOptions = (categories, chartData, titleText, xAxisText, yAxisText) => {
    return {
        type: "png",
        options: {
            chart: {
                type: 'column'
            },
            title: {
                text: titleText
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: categories,
                text: xAxisText
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


const constructPieChartOptions = (chartData, titleText) => {
    return {
        type: "png",
        options: {
            chart: {
                type: "pie"
            },
            title: {
                text: titleText
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

// 'Browser<br>shares<br>2017'
const constructSemiCircleChart = (chartData, titleText) => {
    return {
        type: "png",
        options: {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: titleText,
                align: 'center',
                verticalAlign: 'middle',
                y: 60
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -50,
                        style: {
                            fontWeight: 'bold',
                            color: 'white'
                        }
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%'],
                    size: '110%'
                }
            },
            series: [{
                type: 'pie',
                name: titleText,
                innerSize: '50%',
                data: chartData,
            }]
        }
    }
}