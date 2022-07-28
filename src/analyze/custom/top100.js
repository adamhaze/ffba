var db = require('../../db/index.js');
var Ranks = require('../../db/models/ranks.js');

// TODO: return players sorted in order of avg ranking 
// and sorted by ADP for comparison (bool-triggered)
async function getTop100() {
    let query = {date: new Date(Date.now()).toDateString()};
    let response = await Ranks.find(query).sort({avg: 1}); // response[0] = highest avg rank
    for (var i=0; i < response.length; i++){
        console.log(response[i].name, ' ', response[i].avg);
    }
    
}

getTop100();