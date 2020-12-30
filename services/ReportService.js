const {jsPDF} = require('jspdf/dist/jspdf.node')

const fs = require('fs');
const {applyPlugin} = require('jspdf-autotable');
applyPlugin(jsPDF);
const headerColor = "#203864";
const headerRibbonColor = "#8497B0";
const subheaderColor = "#dae3f3";

exports.createMonthlyReport = () => {
    const doc = new jsPDF();
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
    const mime = 'image/png';

    const dataX = 7;

    const marginWithPreviousElement = 8;

    // Top Header Section
    doc.setFillColor(headerColor);
    doc.rect(0, 0, width, height / 10, 'F');

    doc.setFillColor(headerRibbonColor);
    doc.rect(10, 0, 10, 40, 'F');


    doc.setFontSize(20);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor("#FFFFFF")
    doc.text("LIBRARY MONTHLY REPORT", width / 2 - 50, 18);


    //User Distribution Header
    const userDistributionY = 43;
    const userIconUri = transformFileToBase64Uri('./assets/icons/users.png', mime);
    const userDistributionHeaderText = "User Distribution";
    constructSubHeader(doc, userDistributionY, userIconUri, userDistributionHeaderText);

    //User Distribution Data
    doc.text("New User", width / 6, 63);
    const newUserData = transformFileToBase64Uri('./uploads/generated_charts/newUsers.png', mime);
    doc.rect(dataX, 66, 90, 60);
    // doc.addImage(newUserData, 10, 66,80,50);

    doc.text("Users", 4 * (width / 6) + 7, 63);
    doc.rect((width / 2) + 7, 66, 90, 60);


    //Dashboard Header
    const dashboardDistributionY = 66 + 60 + marginWithPreviousElement;
    const dashboardIconUri = transformFileToBase64Uri('./assets/icons/view-boards.png', mime);
    const dashboardDistributionHeaderText = "Dashboard";
    constructSubHeader(doc, dashboardDistributionY, dashboardIconUri, dashboardDistributionHeaderText);

    // Dashboard Data
    let borrowedImageUri;
    const dashboardY = 133 + 20;

    // First item
    constructDashboardItem(doc, dataX, dashboardY, ['No. of', 'books', 'borrowed', 'borrowed'])

    // Second item
    const secondDataX = dataX + 70;
    constructDashboardItem(doc, secondDataX, dashboardY, ['No. of', 'books', 'overdue'])

    // Third item
    const thirdDataX = secondDataX + 70;
    constructDashboardItem(doc, thirdDataX, dashboardY, ['No. of', 'books', 'added'])

    // Books Borrowed Header
    const booksBorrowedDistributionY = dashboardY + 30 + marginWithPreviousElement;
    const booksBorrowedIconUri = transformFileToBase64Uri('./assets/icons/book-open.png', mime);
    const booksBorrowedDistributionHeaderText = "Books Borrowed";
    constructSubHeader(doc, booksBorrowedDistributionY, booksBorrowedIconUri, booksBorrowedDistributionHeaderText);

    // Top 5 borrowed books table
    doc.autoTable({
        head: [['Name', 'Email', 'Country']],
        body: [
            ['David', 'david@example.com', 'Sweden'],
            ['Castille', 'castille@example.com', 'Spain'],
            ['Castille', 'castille@example.com', 'Spain'],
            ['Castille', 'castille@example.com', 'Spain'],
            ['Castille', 'castille@example.com', 'Spain'],
            // ...
        ],
        foot: ['here'],
        startY: booksBorrowedDistributionY + 10 + marginWithPreviousElement + marginWithPreviousElement,
        tableWidth: 'wrap',
        showFoot: 'firstPage',
        styles: {cellPadding: 2, fontSize: 12}
    });

    const topBookBorrowedIconUri = transformFileToBase64Uri('./assets/icons/bookmark.png', mime);
    doc.addImage({imageData: topBookBorrowedIconUri, x: dataX + 10, y: doc.autoTable.previous.finalY + 6, width: 6, height: 6});
    doc.setFontSize(12);
    doc.text("Top 5 Books Borrowed", dataX + 20, doc.autoTable.previous.finalY + 10);

    // Separator
    doc.setFillColor("#000000");
    doc.rect(width / 2, booksBorrowedDistributionY + 10 + marginWithPreviousElement, 0.25, 80, 'F');

    // Bar chart (No of books against month)
    doc.rect((width / 2) + 7, booksBorrowedDistributionY + 10 + marginWithPreviousElement + marginWithPreviousElement, 90, 60);

    const barChartFinalY = booksBorrowedDistributionY + 10 + marginWithPreviousElement + marginWithPreviousElement +60;
    const bookBorrowedBarChartIconUri = transformFileToBase64Uri('./assets/icons/library.png', mime);

    doc.addImage({imageData: bookBorrowedBarChartIconUri, x: (width / 2) + 7 + 10, y: barChartFinalY + 3, width: 6, height: 6});
    doc.setFontSize(12);
    doc.text("Top 5 Books Borrowed", (width / 2) + 7 + 20, barChartFinalY + 7);
    doc.save("a4.pdf");
}

const constructSubHeader = (doc, userDistributionY, userIconUri, headerText) => {
    const width = doc.internal.pageSize.getWidth();

    doc.setFillColor(subheaderColor);
    doc.rect(0, userDistributionY, width, 10, 'F');


    doc.addImage({imageData: userIconUri, x: 11, y: userDistributionY + 2, width: 6, height: 6});

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(15);
    doc.setTextColor("#000000")
    doc.text(headerText, 22, userDistributionY + 7);
}

const constructDashboardItem = (doc, dataX, dashboardY, descList, imgUri) => {
    const imgSize = 30;
    const textMarginLeft = 5;

    doc.rect(dataX, dashboardY, imgSize, imgSize);
    doc.text(descList[0], dataX + imgSize + textMarginLeft, dashboardY + (imgSize / 3));
    doc.text(descList[1], dataX + imgSize + textMarginLeft, dashboardY + (imgSize / 3) + 6);
    doc.text(descList[2], dataX + imgSize + textMarginLeft, dashboardY + (imgSize / 3) + 12);
}

const transformFileToBase64Uri = (filePath, mime) => {
    const encoding = 'base64';
    const fileData = fs.readFileSync(filePath, "base64");
    return `data:${mime};${encoding},${fileData}`;
}