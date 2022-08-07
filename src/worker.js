const collect = require('./collect/main.js');
const analyze = require('./analyze/main.js');


(async () => {
    await collect();
    await analyze();
    // process.exit();
})();