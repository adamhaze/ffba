var db = require('../../db/index.js');
var Ranks = require('../../db/models/ranks.js');

async function getRankingsDiff(numPlayers) {
    let query = {date: new Date(Date.now()).toDateString()};
    let response = await Ranks.find(query);
    var rankingsDiff = {};
    for(var i=0; i < numPlayers; i++){
        // extract just rankings values
        let values = Object.values(Object.values(response[i])[2]);
        values = values.slice(3,values.length-1);

        if (values.includes(-1)) { continue; }

        // compute spread
        let diff = Math.max(...values) - Math.min(...values)
        rankingsDiff[response[i].name] = diff;
    };
    let keysSorted = Object.keys(rankingsDiff).sort(function(a,b){return rankingsDiff[b]-rankingsDiff[a]});
    return keysSorted.slice(0,25);
};

module.exports = getRankingsDiff;

