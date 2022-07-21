// TODO: separate backend process to run after getPlayerData 
//      which checks each unique player by "id" and computes changes in
//      projections and/or ADP

var db = require('../db/index.js');
var StatTracker = require('../db/models/statTracker.js');
var RanksTracker = require('../db/models/ranksTracker.js');
var playerList = require('../collect/espn/util/playerList.js');
var analyzePlayerStats = require('./util/stats.js');
var analyzePlayerRanks = require('./util/rankings.js');


async function analyzePlayerData(){
    await StatTracker.deleteMany({});
    await RanksTracker.deleteMany({});
    for(var i=0; i < playerList.length; i++){
        let player = playerList[i].split(',');
        // let query = {'name': player[0], 'playerId': parseInt(player[1].trim())};
        let query = {name: player[0], date: new Date(Date.now()).toDateString()};
        console.log(query.name);
        await analyzePlayerStats(query);
        await analyzePlayerRanks(query);
    };
    process.exit();
};
analyzePlayerData();








// Player.find({}).exec(function(err, result){
//     if (err) throw err;
//     let playerMap = Object.assign({}, ...result.map((elem) => ({[elem.name]: elem.playerId})));
//     console.log(playerMap);
// });
