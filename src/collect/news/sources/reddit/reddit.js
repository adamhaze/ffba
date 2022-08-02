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

    // TODO: only want to get new posts from current day
    // TODO: for each post, check against all user's players OR
    //       query all posts for 1 player at a time (may be easier to build list of urls per player)
    // query all players 1 post at a time: build object of {player name: [list of urls]}
    //      appending to lists in JS?

    var newPosts = await r.getSubreddit(subreddits[0]).getNew({limit: 50});
    console.log(newPosts);
    
    
    // r.getSubreddit('fantasyfootball').getNew({limit: 50}).then(async function (response){
    //     console.log(response.length);
    // });

};


module.exports = getNews;