
var db = require('../db/index.js');
var StatTracker = require('../db/models/statTracker.js');
var RanksTracker = require('../db/models/ranksTracker.js');
var playerList = require('../collect/stats/util/playerList.js');
var analyzePlayerStats = require('./util/stats.js');
var analyzePlayerRanks = require('./util/rankings.js');
var computeAvgRankings = require('./util/avgRanking.js');


async function analyzePlayerData(){
    await StatTracker.deleteMany({});
    await RanksTracker.deleteMany({});
    // TODO: solve issue with playerList name != rankings names (e.g. Patrick Mahomes and Defenses)
    for(var i=0; i < playerList.length; i++){
        let player = playerList[i].split(',');
        let query = {name: player[0]};
        await analyzePlayerStats(query);
        await analyzePlayerRanks(query);
        await computeAvgRankings(query);
    };
    process.exit();
};
analyzePlayerData();








// Player.find({}).exec(function(err, result){
//     if (err) throw err;
//     let playerMap = Object.assign({}, ...result.map((elem) => ({[elem.name]: elem.playerId})));
//     console.log(playerMap);
// });
