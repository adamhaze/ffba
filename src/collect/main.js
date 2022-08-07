var db = require('../db/index.js');
var stats = require('./stats/espn.js');
var rankings = require('./rankings/driver.js');
var news = require('./news/driver.js');
var Player = require('../db/models/player.js');
var Ranks = require('../db/models/ranks.js');


let ESPNleagueId = 1807663261;
async function collectPlayerData(){
    await Player.deleteMany({date: new Date(Date.now()).toDateString()});
    await Ranks.deleteMany({date: new Date(Date.now()).toDateString()});
    await stats(ESPNleagueId);
    await rankings();
    await news();
};

module.exports = collectPlayerData;