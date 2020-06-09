const nodemailer = require('nodemailer');
const {emailCredential} = require('./../emailCredential.json');

const sendEmail = (receiver,subject,text) => {
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
        text: text,
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
    var text = `Hi ${receiverFirstName},\n\n Thanks for creating an E-Library account!\n 
    Please click on the link below to complete the registration:
    <a href='${registrationLink}'></a> \n
    The URL is valid only for 48 hours from the time the email was sent.\n
    Many thanks,\n
    E-Library`;
    return {subject:subject,text:text};
}

module.exports = {buildVerificationEmail,sendEmail};