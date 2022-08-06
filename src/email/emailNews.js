const nodemailer = require('nodemailer');
const credentials = require('./credentials');


async function email (players){
    const names = Object.keys(players);
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
        subject: 'Daily Player News!',
        html: `<h1> ${names[26]} </h1>
                <ol>
                    <li> ${players[names[26]][0]} </li> 
                </ol>
                `
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = email;