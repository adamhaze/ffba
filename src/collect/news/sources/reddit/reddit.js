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

// TODO: implement query function for checking post title/text for player name
//       include nicknames (i.e. CEH, ETN, Mandrews)
//       handle common names (i.e. Williams, James, Jones, Matt, Allen)

var usedUrls = [];

async function getNews(players){
    var numPosts = 100;
    for (var j=0; j < subreddits.length; j++) {
        var newPosts = await r.getSubreddit(subreddits[j]).getNew({limit: numPosts});
        for (var i=0; i < numPosts; i++){
            // skip post if we've already used it for another player
            if (usedUrls.includes(newPosts[i].url)) { continue; }
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            var date = new Date(newPosts[i].created_utc * 1000).toDateString();
            var text = newPosts[i].selftext;
            var title = newPosts[i].title;
            for(const name of Object.keys(players)){
                nameArr = name.split(" ");
                if (text.includes(" "+nameArr[0]+" ") || text.includes(" "+nameArr[1]+" ") || title.includes(" "+nameArr[0]+" ") || title.includes(" "+nameArr[1]+" ")){
                    // if (!players[name].includes(newPosts[i].url)){
                    //     players[name].push(newPosts[i].url);
                    // };
                    if (!players[name][title]) {
                        players[name][title] = newPosts[i].url;
                        usedUrls.push(newPosts[i].url);
                    };
                };
            };
        };
    };
    return players;
};



module.exports = getNews;