var nodemailer = require('nodemailer'),
    emailKey = require('../models/data/private/keys.js') || require('../../config/env/production.js');
    //emailKey = require('../models/data/private/keys.js');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
        user: emailAddress,
        pass: emailKey
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Chris T Yo ✔ <christanseer@hotmail.com>', // sender address
    to: 'christanseer@hotmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});