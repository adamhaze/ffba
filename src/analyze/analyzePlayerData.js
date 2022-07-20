// TODO: separate backend process to run after getPlayerData 
//      which checks each unique player by "id" and computes changes in
//      projections and/or ADP

var db = require('../db/index.js');
const Player = require('../db/models/player.js');
const Change = require('../db/models/change.js');
const fs = require('fs');

let espnPlayers = '/Users/adamhayes/ws_home/projects/fantasyfb-analysis/src/collect/espn/espn_player_ids.txt'
const playerMap = fs.readFile(espnPlayers, 'utf8', async function (err, data) {
    if (err) throw err;
    let playerListUnq = data.split('\n'); // list of each indiv player in ESPN database ['name, playerId']
    for(var i=0; i < playerListUnq.length; i++){
        let player = playerListUnq[i].split(',');
        let query = {'name': player[0], 'playerId': parseInt(player[1].trim())};
        Player.find(query).exec(async function(err, response){
            if (err) throw err;
            
            // current day would be player at response[response.length-1]
            let n = response.length-1;
            let query = {'name': response[n].name, 'date': response[n].date};
            console.log(query);

            // TODO: test analyzePlayerData w/ new format

            // initialize an update object with only the 'new' stats
            let playerUpdateTemp = {
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
                projReceptions7day: n >= 6 ? (response[n-6].projReceptions - response[n].projReceptions) : 0
            };

            let playerUpdate = new Change(playerUpdateTemp);
            await playerUpdate.save();

            // compute overall stat changes
            // playerUpdate.cADPOvr = (response[0].ADP - response[n].ADP); // -adpChange = falling, +adpChange = rising
            // playerUpdate.cOwnOvr = (response[0].owned - response[n].owned);
            // playerUpdate.cProjRushYds = (response[0].projRushYds - response[n].projRushYds);
            // playerUpdate.cProjRushTD = (response[0].projRushTD - response[n].projRushTD);
            // playerUpdate.cProjRecYds = (response[0].projRecYds - response[n].projRecYds);
            // playerUpdate.cProjRecTD = (response[0].projRecTD - response[n].projRecTD);
            // playerUpdate.cProjReceptions = (response[0].projReceptions - response[n].projReceptions);

            // if at least 1
            // if (n >= 1){
            //     let adpChange1day = (response[n-1].ADP - response[n].ADP);
            // }
            // if at least 7
            // if (n >= 6) {
            //     let adpChange7day = (response[n-7].ADP - response[n].ADP);
            //     let cProjRushYds7day = (response[n-7].projRushYds - response[n].projRushYds);
            //     let cProjRushTD7day = (response[n-7].projRushTD - response[n].projRushTD);
            //     let cProjRecYds7day = (response[n-7].projRecYds - response[n].projRecYds);
            //     let cProjRecTD7day = (response[n-7].projRecTD - response[n].projRecTD);
            //     let cProjReceptions7day = (response[n-7].projReceptions - response[n].projReceptions);
            // }

            // TODO: determine to use findOneAndUpdate or just save()
            // await Change.findOneAndUpdate(query, playerUpdate, {upsert: true});
            process.exit();
        });
    }

});

// Player.find({}).exec(function(err, result){
//     if (err) throw err;
//     let playerMap = Object.assign({}, ...result.map((elem) => ({[elem.name]: elem.playerId})));
//     console.log(playerMap);
// });
