// Function used in analyzePlayerData to update the Ranks documents for each player
// with their average ranking across (only for current day)

var db = require('../../db/index.js');
var Ranks = require('../../db/models/ranks.js');

async function computeAvgRankings(query) {
    let fullQuery = {name: query.name, date: new Date(Date.now()).toDateString()};
    await Ranks.find(fullQuery).then(async function (response){

        // extract ranks, compute average, update Ranks document
        if (response.length > 0) { // only if player exists in database
            let values = Object.values(Object.values(response[0])[2]);
            values = values.filter(elem => typeof elem === 'number');
            values = values.filter(elem => elem > 0).slice(0,10); // only works for 1st 10 attributes = ranks
            let avgRank = values.reduce((a,b) => a + b) / values.length;
            
            await Ranks.findOneAndUpdate(fullQuery, {avg: avgRank});
        };
        

    }).catch(error => {
        console.log(error);
    });
}

module.exports = computeAvgRankings;