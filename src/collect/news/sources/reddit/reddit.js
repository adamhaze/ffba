// https://not-an-aardvark.github.io/snoowrap/index.html
const snoowrap = require('snoowrap');
const credentials = require('./credentials.js');

const subreddits = ['fantasyfootball', 'Fantasy_Football', 'DynastyFF'];
const r = new snoowrap({
    userAgent: 'something',
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    username: credentials.username,
    password: credentials.password
});

async function getNews(){

    // TODO: get all posts from current day
    // TODO: look into marking which posts have been visited (or time scraped)
    //          so you scrape all stories since last scraped
    // TODO: for each post, check against all user's players OR
    //       query all posts for 1 player at a time (may be easier to build list of urls per player)
    // query all players 1 post at a time: build object of {player name: [list of urls]}
    //      appending to lists in JS?
    var numPosts = 50;
    var newPosts = await r.getSubreddit(subreddits[0]).getNew({limit: 50});
    for (var i=0; i < numPosts; i++){
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(newPosts[i].created_utc * 1000).toDateString();
        console.log(date);
    };

};


module.exports = getNews;