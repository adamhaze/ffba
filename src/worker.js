const collect = require('./collect/main.js');
const analyze = require('./analyze/main.js');

// TODO:
// const schedule = require('node-schedule');
// const job = schedule.scheduleJob('*/1 * * * *', function() {
//   requestListing();
// });

(async () => {
    await collect();
    await analyze();
    // process.exit();
})();