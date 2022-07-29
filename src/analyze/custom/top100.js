const db = require('../../db/index.js');
const Ranks = require('../../db/models/ranks.js');
const Players = require('../../db/models/player.js');

async function getTop100(ADP) {
    let query = {date: new Date(Date.now()).toDateString()};
    if (ADP){
        var response = await Players.find(query).sort({ADP: 1});
    } else {
        var response = await Ranks.find(query).sort({avg: 1}); // response[0] = highest avg rank
    }
    let top100 = {};
    for (var i=0; i < 100; i++){
        if (ADP){
            top100[response[i].name] = response[i].ADP;
        } else {
            top100[response[i].name] = response[i].avg;
        }
    }
    return top100;
}

module.exports = getTop100;