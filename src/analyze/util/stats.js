var db = require('../../db/index.js');
var Player = require('../../db/models/player.js');
var StatTracker = require('../../db/models/statTracker.js');

async function analyzePlayerStats(query){

    await Player.find(query).then(async function(response){
        let n = response.length-1;
        if (n >= 0){
            let playerUpdate = {
                name: response[n].name,
                date: response[n].date,
                ADPOvr: (response[0].ADP - response[n].ADP),
                ADP1day: n >= 1 ? (response[n-1].ADP - response[n].ADP) : 0,
                ADP7day: n >= 6 ? (response[n-6].ADP - response[n].ADP) : 0,
                ownOvr: (response[0].owned - response[n].owned),
                projRushYds: (response[0].projRushYds - response[n].projRushYds),
                projRushTD: (response[0].projRushTD - response[n].projRushTD),
                projRecYds: (response[0].projRecYds - response[n].projRecYds),
                projRecTD: (response[0].projRecTD - response[n].projRecTD),
                projReceptions: (response[0].projReceptions - response[n].projReceptions),
                projRushYds7day: n >= 6 ? (response[n-6].projRushYds - response[n].projRushYds) : 0,
                projRushTD7day: n >= 6 ? (response[n-6].projRushTD - response[n].projRushTD) : 0,
                projRecYds7day: n >= 6 ? (response[n-6].projRecYds - response[n].projRecYds) : 0,
                projRecTD7day: n >= 6 ? (response[n-6].projRecTD - response[n].projRecTD) : 0,
                projReceptions7day: n >= 6 ? (response[n-6].projReceptions - response[n].projReceptions) : 0,
            };
            let statsUpdate = new StatTracker(playerUpdate);
            await statsUpdate.save();
        };

    }).catch(error => {
        console.log(error);
    });
};

module.exports = analyzePlayerStats;