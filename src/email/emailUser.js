var nodemailer = require('nodemailer');
const credentials = require('./credentials');
var rankingsDiff = require('../analyze/custom/rankingsDiff.js');


async function email (spread, numPlayers){
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
        html: `<h1> 25 Players with Greatest Rankings Spread (Top ${numPlayers}) </h1>
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
                    <li id="a10"> ${spread[10]}  </li> 
                    <li id="a11"> ${spread[11]}  </li> 
                    <li id="a12"> ${spread[12]}  </li> 
                    <li id="a13"> ${spread[13]}  </li> 
                    <li id="a14"> ${spread[14]}  </li> 
                    <li id="a15"> ${spread[15]}  </li> 
                    <li id="a16"> ${spread[16]}  </li> 
                    <li id="a17"> ${spread[17]}  </li> 
                    <li id="a18"> ${spread[18]}  </li> 
                    <li id="a19"> ${spread[19]}  </li> 
                    <li id="a20"> ${spread[20]}  </li> 
                    <li id="a21"> ${spread[21]}  </li> 
                    <li id="a22"> ${spread[22]}  </li> 
                    <li id="a23"> ${spread[23]}  </li> 
                    <li id="a24"> ${spread[24]}  </li> 
                </ol>
                <h2> 10 Players with Greatest Change in ADP </h2>`
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


let numPlayers = 150;
(async () => {
    let spread = await rankingsDiff(numPlayers);
    email(spread, numPlayers);
})()

