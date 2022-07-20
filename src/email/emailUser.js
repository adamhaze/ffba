var nodemailer = require('nodemailer');
const credentials = require('./credentials');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: credentials.email,
    pass: credentials.pw
  }
});

var mailOptions = {
  from: credentials.email,
  to: credentials.email,
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});