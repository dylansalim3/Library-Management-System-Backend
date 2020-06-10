const nodemailer = require('nodemailer');
const {emailCredential} = require('./../emailCredential.json');

const sendEmail = (receiver,subject,html) => {
    var transporter =  nodemailer.createTransport({
        service: emailCredential.service,
        auth: {
          user: emailCredential.email,
          pass: emailCredential.password,
        }
      });
      var receiverEmail='';
      if(receiver.constructor === Array){
        for(var i=0;i<receiver.length;i++){
            receiverEmail+= "," + receiver[i];
        }
      }else{
          receiverEmail=receiver;
      }
      
      var mailOptions = {
        from: emailCredential,
        to: receiverEmail,
        subject: subject,
        html: html,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });      
}

const buildVerificationEmail = (receiverFirstName,registrationLink) =>{
    var subject = "[E-Library] Please verify your account";
    var text = 
    `<p>Hi <b>${receiverFirstName}</b></p>,
    <p>Thanks for creating an E-Library account!</p> 
    <br>
    <p>Please click on the link below to complete the registration:</p>
    <a href="${registrationLink}">${registrationLink}</a> 
    <p style="color:red">*The URL is valid only for 48 hours from the time the email was sent.</p>
    <br>
    <p>Thank you,</p>
    <p><b>E-Library</b></p>
    `;
    return {subject:subject,text:text};
}

module.exports = {buildVerificationEmail,sendEmail};