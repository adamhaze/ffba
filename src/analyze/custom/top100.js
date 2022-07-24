var db = require('../../db/index.js');
var Ranks = require('../../db/models/ranks.js');

// players sorted in order of avg ranking and their corresponding
// difference between ranking and ESPN ADP
async function getTop100() {
    let query = {date: new Date(Date.now()).toDateString()};
    let response = await Ranks.find(query).sort({avg: -1});
}