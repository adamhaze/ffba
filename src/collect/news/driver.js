// this script will run the news scrapers from multiple different sources
const email = require('../../email/emailNews.js');
const reddit = require('./sources/reddit/reddit.js');

(async () => {
    var players = await reddit();
    var temp = await email(players);
})();
