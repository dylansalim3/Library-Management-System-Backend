const {CanvasRenderService} = require('chartjs-node-canvas');
const path = require('path');
const fs = require('fs');
const UserRepository = require('./../repository/UserRepository');
const BorrowBookRepository = require('./../repository/BorrowBookRepository');
const BorrowBookHistoryRepository = require('./../repository/BorrowBookHistoryRepository');
const {BORROWED_MAX, OVERDUE_MAX, ADDED_MAX, RENEWED_MAX} = require('./../constant/constant');

// const stream = canvasRenderService.renderToStream(configuration);
// const imageBuffer = await canvasRenderService.renderToBuffer(configuration);
const headerColor = "#203864";
const headerRibbonColor = "#8497B0";
const subheaderColor = "#dae3f3";
const dashboardChartSize = 200;

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

exports.generateCharts = () => {
    const month = new Date().getMonth();
    const year = new Date().getFullYear;


    (async () => {
        const allUsersBase64 = await createAllUserChart(err => {
            console.log(err);
        });
        writeBase64ImageToFile(allUsersBase64, "allUsers");

        const newUsersBase64 = await createNewUserChart();
        writeBase64ImageToFile(newUsersBase64, "newUsers");

        const numberOfBooksBorrowedDoughnutBase64 = await createNumberOfBooksBorrowedDoughnut();
        writeBase64ImageToFile(numberOfBooksBorrowedDoughnutBase64, "NoOfBooks");

        const overdueBase64 = await createNumberOfBooksOverdueDoughnut();
        writeBase64ImageToFile(overdueBase64, "Overdue");


    })();
}

const createAllUserChart = async (error) => {
    const width = 400;
    const height = 400;

    const {studentCountPromise, teacherCountPromise} = UserRepository.getTotalUserCount();

    const studentCount = await studentCountPromise;
    const teacherCount = await teacherCountPromise;
    const canvasRenderService = new CanvasRenderService(width, height, chartCallback);

    const configuration = {
        type: 'pie',
        data: {
            labels: ['Student', 'Teacher'],
            datasets: [{
                data: [studentCount, teacherCount],
                backgroundColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }]
        },
    };
    const dataUrlBase64 = await canvasRenderService.renderToDataURL(configuration);
    return dataUrlBase64;
}

const createNewUserChart = async (month, year, error) => {
    const width = 400;
    const height = 400;

    const {studentCountPromise, teacherCountPromise} = UserRepository.getNewUserCount(month, year);

    const studentCount = await studentCountPromise;
    const teacherCount = await teacherCountPromise;

    const canvasRenderService = new CanvasRenderService(width, height, chartCallback);

    const configuration = {
        type: 'doughnut',
        data: {
            labels: ['Student', 'Teacher'],
            datasets: [{
                data: [studentCount, teacherCount],
                backgroundColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }]
        },
    };
    const dataUrlBase64 = await canvasRenderService.renderToDataURL(configuration);
    return dataUrlBase64;
}

const createNumberOfBooksBorrowedDoughnut = async () => {
    const booksCurrentBorrowed = await BorrowBookRepository.getCurrentMonthBorrowedBookCount();
    const booksHistoryCurrentBorrowed = await BorrowBookHistoryRepository.getCurrentMonthBorrowedBook();
    const totalBookBorrowedCount = booksCurrentBorrowed + booksHistoryCurrentBorrowed;

    const remainderCount = BORROWED_MAX - totalBookBorrowedCount > 0 ? BORROWED_MAX - totalBookBorrowedCount : 0;

    return await constructDashboardDoughnutChart("Number of Books Borrowed", totalBookBorrowedCount, remainderCount)
}

const createNumberOfBooksOverdueDoughnut = async () => {
    const overdueCount = await BorrowBookRepository.getTotalOverdueBooksCount();
    const reminderCount = OVERDUE_MAX - overdueCount;

    return await constructDashboardDoughnutChart("Number of Books Overdue", overdueCount, reminderCount);
}

const createNumberOfBooksAddedDoughnut = async () =>{

}

const constructDashboardDoughnutChart = async (itemLabel, itemCount, remainderCount) => {
    const configuration = {
        type: 'doughnut',
        data: {
            labels: [itemLabel],
            datasets: [{
                data: [itemCount, remainderCount],
                backgroundColor: [
                    headerColor,
                    '#FFFFFF',
                ],
                borderColor: [
                    headerColor,
                    '#FFFFFF',
                ],
                borderWidth: 1
            }]
        },
    };

    const canvasRenderService = new CanvasRenderService(dashboardChartSize, dashboardChartSize, chartCallback);
    const dataUrlBase64 = await canvasRenderService.renderToDataURL(configuration);
    return dataUrlBase64;
}


const createBooksBorrowedBarChart = async () => {
    const width = 400;
    const height = 400;


    const canvasRenderService = new CanvasRenderService(width, height, chartCallback);

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

    return dataUrlBase64;
}

const writeBase64ImageToFile = (dataUrlBase64, filename) => {
    const base64Data = dataUrlBase64.replace(/^data:image\/png;base64,/, "");
    const outputFile = path.join(path.dirname(require.main.filename || process.main.filename), 'generated_charts', `${filename}.png`);
    fs.writeFile(outputFile, base64Data, "base64", function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("done");
    });
}