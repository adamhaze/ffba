var nodemailer = require('nodemailer');
const credentials = require('./credentials');
var rankingsDiff = require('../analyze/custom/rankingsDiff.js');


async function email (spread){
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
        html: `<h1> 10 Players with Greatest Rankings Spread </h1>
                <ol>
                    <li id="a1"> ${spread[0]} </li> 
                    <li id="a2"> ${spread[1]}  </li> 
                    <li id="a3"> ${spread[2]}  </li> 
                    <li id="a4"> ${spread[3]}  </li> 
                    <li id="a5"> ${spread[4]}  </li> 
                    <li id="a6"> ${spread[5]}  </li> 
                    <li id="a7"> ${spread[6]}  </li> 
                    <li id="a8"> ${spread[7]}  </li> 
                    <li id="a9"> ${spread[8]}  </li> 
                    <li id="a10"> ${spread[9]}  </li> 
                </ol>`
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

(async () => {
    let spread = await rankingsDiff();
    email(spread);
})()

