const nodemailer = require('nodemailer');
const credentials = require('./credentials');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

async function email (players){
    const names = Object.keys(players);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: credentials.email,
          pass: credentials.pw
        }
      });

    // point to the template folder
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./src/email/templates/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./src/email/templates/'),
    };      
    // use a template file with nodemailer
    transporter.use('compile', hbs(handlebarOptions));

    var mailOptions = {
        from: credentials.email,
        to: credentials.email,
        subject: 'Daily Player News!',
        template: 'email',
        context: {
            userPlayers: players
        }
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