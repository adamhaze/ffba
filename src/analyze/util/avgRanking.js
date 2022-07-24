// Function used in analyzePlayerData to update the Ranks documents for each player
// with their average ranking across (only for current day)

var db = require('../../db/index.js');
var Ranks = require('../../db/models/ranks.js');

async function computeAvgRankings(query) {
    let fullQuery = {name: query.name, date: new Date(Date.now()).toDateString()};
    await Ranks.find(fullQuery).then(async function (response){

        let values = Object.values(Object.values(response[0])[2]);
        values = values.slice(4,values.length-1);
        let avgRank = values.reduce((a,b) => a + b) / values.length;
        console.log(avgRank);
        
        await Ranks.findOneAndUpdate(fullQuery, {avg: avgRank});

    }).catch(error => {
        console.log(error);
    });
}

module.exports = computeAvgRankings;