const nodemailer = require('nodemailer');
const env = process.env;
const {google} = require('googleapis');

const sendEmail = async (receiverEmail, emailSubject, html,res) => {
    const emailService = env.EMAIL_SERVICE;
    const senderEmail = env.SENDER_EMAIL;
    const clientId = env.CLIENT_ID;
    const clientSecret = env.CLIENT_SECRET;
    const refreshToken = env.REFRESH_TOKEN;
    const OAuth2 = google.auth.OAuth2;

    //client_id and client_secret
    const myOAuth2Client = new OAuth2(
        clientId,
        clientSecret
    );

    myOAuth2Client.setCredentials({refresh_token: refreshToken});

    const myAccessToken = myOAuth2Client.getAccessToken()


    const transporter = nodemailer.createTransport({
        service: emailService,
        auth: {
            type: "OAuth2",
            user: senderEmail, //your gmail account you used to set the project up in google cloud console"
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            accessToken: myAccessToken //access token variable we defined earlier
        }
    });

    const mailOptions = {
        from: senderEmail,
        to: receiverEmail,
        subject: emailSubject,
        html: html,
        attachments,
    };

    if (res !== undefined && res !== null) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }


    let info = await transporter.sendMail(mailOptions);
    console.log(info);
    return info;
}

const buildVerificationEmail = (receiverFirstName, registrationLink) => {
    var subject = "[E-Library] Please verify your account";
    var text =
        `<p>Hi <b>${receiverFirstName}</b></p>,
    <p>Thanks for creating an E-Library account!</p> 
    <br>
    <p>Please click on the link below to complete the registration:</p>
    <a href="${registrationLink}">Complete your registration</a> 
    <p style="color:red">*The URL is valid only for 48 hours from the time the email was sent.</p>
    <br>
    <p>Thank you,</p>
    <p><b>E-Library</b></p>
    `;
    return {subject: subject, text: text};
}

const buildResetPasswordEmail = (resetPasswordLink) => {
    var subject = "[E-Library] Password Recovery";
    var text = `
    <h2>Password Recovery</h2>
    <p>You recently requested password reset for account associated with this email.</p>
    <br>
    <p>Click on the <b><a href="http://${resetPasswordLink}">link</a></b> to reset your password</p>
    `;
    return {subject: subject, text: text};
}

const buildBackupDatabaseEmail = (receiverFirstName,downloadLink) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const subject = `[E-Library] Database Backup for ${currentMonth} ${currentYear}`;
    const text =
        `<p>Hi <b>${receiverFirstName}</b></p>,
    <p>Here is your monthly database backup!</p> 
    <br>
    <p>Please click on the link below to download the backup zip file</p>
    <a href="${downloadLink}">Download</a>
    <br>
    <p>Thank you,</p>
    <p><b>E-Library</b></p>
    `;
    return {subject: subject, text: text};
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = {buildResetPasswordEmail, buildVerificationEmail, sendEmail, validateEmail, buildBackupDatabaseEmail};