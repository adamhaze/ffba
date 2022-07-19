// TODO: separate backend process to run after getPlayerData 
//      which checks each unique player by "id" and computes changes in
//      projections and/or ADP

var db = require('../db/index.js');
const Player = require('../db/models/player.js');
const fs = require('fs');

let espnPlayers = '/Users/adamhayes/ws_home/projects/fantasyfb-analysis/src/espn/espn_player_ids.txt'
const playerMap = fs.readFile(espnPlayers, 'utf8', (err, data) => {
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

            // 
            // each player gets carbon copy of stats for each platform (ESPN, Sleeper, Yahoo, etc... -- subclasses?)
            // collect player data and write to db separately for each platform
            // analyzePlayerData should then compute the updates for each stat over each platform
            // as well as add data for cross-platform differences (LOT of columns)

            // initialize an update object with only the 'new' stats
            let playerUpdate = {
                cADPOvr: 0,
                cADP1day: 0,
                cADP7day: 0,
                cOwnOvr: 0,
                cProjRushYds: 0,
                cProjRushTD: 0,
                cProjRecYds: 0,
                cProjRecTD: 0,
                cProjReceptions: 0,
                cProjRushYds7day: 0,
                cProjRushTD7day: 0,
                cProjRecYds7day: 0,
                cProjRecTD7day: 0,
                cProjReceptions7day: 0
            };

            // compute overall stat changes
            // TODO: find neater way to do this (map?)
            playerUpdate.cADPOvr = (response[0].ADP - response[n].ADP); // -adpChange = falling, +adpChange = rising
            playerUpdate.cOwnOvr = (response[0].owned - response[n].owned);
            playerUpdate.cProjRushYds = (response[0].projRushYds - response[n].projRushYds);
            playerUpdate.cProjRushTD = (response[0].projRushTD - response[n].projRushTD);
            playerUpdate.cProjRecYds = (response[0].projRecYds - response[n].projRecYds);
            playerUpdate.cProjRecTD = (response[0].projRecTD - response[n].projRecTD);
            playerUpdate.cProjReceptions = (response[0].projReceptions - response[n].projReceptions);

            // if at least 1
            if (n >= 1){
                let adpChange1day = (response[n-1].ADP - response[n].ADP);
            }
            // if at least 7
            if (n >= 6) {
                let adpChange7day = (response[n-7].ADP - response[n].ADP);
                let cProjRushYds7day = (response[n-7].projRushYds - response[n].projRushYds);
                let cProjRushTD7day = (response[n-7].projRushTD - response[n].projRushTD);
                let cProjRecYds7day = (response[n-7].projRecYds - response[n].projRecYds);
                let cProjRecTD7day = (response[n-7].projRecTD - response[n].projRecTD);
                let cProjReceptions7day = (response[n-7].projReceptions - response[n].projReceptions);
            }

            let doc = await Player.findOneAndUpdate(query, playerUpdate, {upsert: true});
            process.exit();
        });
    }

});

// Player.find({}).exec(function(err, result){
//     if (err) throw err;
//     let playerMap = Object.assign({}, ...result.map((elem) => ({[elem.name]: elem.playerId})));
//     console.log(playerMap);
// });
