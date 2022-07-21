// TODO: separate backend process to run after getPlayerData 
//      which checks each unique player by "id" and computes changes in
//      projections and/or ADP

var db = require('../db/index.js');
const Player = require('../db/models/player.js');
const StatTracker = require('../db/models/statTracker.js');
var RanksTracker = require('../db/models/ranksTracker.js');
var playerList = require('../collect/espn/util/playerList.js');

async function analyzePlayerData(){
    await StatTracker.deleteMany({});
    for(var i=0; i < playerList.length; i++){
        let player = playerList[i].split(',');
        let query = {'name': player[0], 'playerId': parseInt(player[1].trim())};
        await Player.find(query).then(async function(response){
            // current day would be player at response[response.length-1]
            let n = response.length-1;
            if (n >= 0){
                // initialize an update object with only the 'new' stats
                let statTrackerUpdate = {
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
                let ranksTrackerUpdate = {
                    rankFPBrown: (response[0].rankFPBrown - response[n].rankFPBrown),
                    rankFPErickson: (response[0].rankFPErickson - response[n].rankFPErickson),
                    rankFPFitz: (response[0].rankFPFitz - response[n].rankFPFitz),
                    rankFPFreedman: (response[0].rankFPFreedman - response[n].rankFPFreedman),
                    rankFPPisapia: (response[0].rankFPPisapia - response[n].rankFPPisapia),

                    rankFPBrown1day: n >= 1 ? (response[0].rankFPBrown1day - response[n].rankFPBrown1day) : 0,
                    rankFPErickson1day: n >= 1 ? (response[0].rankFPErickson1day - response[n].rankFPErickson1day) : 0,
                    rankFPFitz1day: n >= 1 ? (response[0].rankFPFitz1day - response[n].rankFPFitz1day) : 0,
                    rankFPFreedman1day: n >= 1 ? (response[0].rankFPFreedman1day - response[n].rankFPFreedman1day) : 0,
                    rankFPPisapia1day: n >= 1 ? (response[0].rankFPPisapia1day - response[n].rankFPPisapia1day) : 0
                };
                let statsUpdate = new StatTracker(statTrackerUpdate);
                let ranksUpdate = new RanksTracker(ranksTrackerUpdate);
                await statsUpdate.save();
                await ranksUpdate.save();
            };
        }).catch(error => {
            console.log(error);
        });
    };
    process.exit();
};
analyzePlayerData();






// Player.find({}).exec(function(err, result){
//     if (err) throw err;
//     let playerMap = Object.assign({}, ...result.map((elem) => ({[elem.name]: elem.playerId})));
//     console.log(playerMap);
// });
