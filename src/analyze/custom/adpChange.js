var db = require('../../db/index.js');
var StatTracker = require('../../db/models/statTracker.js');

async function getADPchange(descending) {
    let numPlayers = 10;
    let query = {date: new Date(Date.now()).toDateString()};
    if (descending){ // players CLIMBING in ADP
        var response = await StatTracker.find(query).sort({ADP1day: -1});
    } else{ // players FALLING in adp
        var response = await StatTracker.find(query).sort({ADP1day: 1});
    };
    
    let returnPlayers = new Array(numPlayers);
    for(var i=0; i < numPlayers; i++){
        returnPlayers[i] = response[i].name;
    };
    return returnPlayers;
    
};


module.exports = getADPchange;
// getADPchange(10);