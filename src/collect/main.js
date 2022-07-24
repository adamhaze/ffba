var db = require('../db/index.js');
var stats = require('./stats/espn.js');
var rankings = require('./rankings/driver.js');


let ESPNleagueId = 1807663261;
(async () => {
    await stats(ESPNleagueId);
    await rankings();
})()