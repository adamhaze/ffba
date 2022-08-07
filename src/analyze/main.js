
var db = require('../db/index.js');
var StatTracker = require('../db/models/statTracker.js');
var RanksTracker = require('../db/models/ranksTracker.js');
var analyzePlayerStats = require('./util/stats.js');
var analyzePlayerRanks = require('./util/rankings.js');
var computeAvgRankings = require('./util/avgRanking.js');
const {players, nameMap} = require('../collect/stats/util/playerList.js');
const email = require('../email/emailStats.js');


async function analyzePlayerData(){
    await StatTracker.deleteMany({});
    await RanksTracker.deleteMany({});
    for(var i=0; i < players.length; i++){
        let query = {name: players[i]};
        await analyzePlayerStats(query);
        await analyzePlayerRanks(query);
        await computeAvgRankings(query);
    };
    await email();
    // console.log('Data analyed...');
};
module.exports = analyzePlayerData;








// Player.find({}).exec(function(err, result){
//     if (err) throw err;
//     let playerMap = Object.assign({}, ...result.map((elem) => ({[elem.name]: elem.playerId})));
//     console.log(playerMap);
// });
