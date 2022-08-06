// https://not-an-aardvark.github.io/snoowrap/index.html
const snoowrap = require('snoowrap');
const credentials = require('./credentials.js');


const players = {
    'Patrick Mahomes': [],
    'Saquon Barkley': [],
    'Clyde Edwards-Helaire': [],
    'Davante Adams': [],
    'Jaylen Waddle': [],
    'Keenan Allen': [],
    'Mark Andrews': [],
    'AJ Dillon': [],
    'Tyler Boyd': [],
    'Derek Carr': [],
    'Mitch Trubisky': [],
    'James White': [],
    'Melvin Gordon': [],
    'Raheem Mostert': [],
    'Matt Breida': [],
    'Trey Sermon': [],
    'DeAndre Hopkins': [],
    'Odell Beckham': [],
    'Robbie Anderson': [],
    'N\'Keal Harry': [],
    'Mecole Hardman': [],
    'Jakobi Myers': [],
    'Harrison Bryant': [],
    'Tommy Tremble': [],
    'Khalil Shakir': [],
    'Danny Gray': [],
    'Jameson Williams': [],
    'Kenneth Walker': [],
    'Treylon Burks': [],
    'Chris Olave': [],
    'Skyy Moore': []
};

const subreddits = ['fantasyfootball', 'Fantasy_Football', 'DynastyFF'];
const r = new snoowrap({
    userAgent: 'something',
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    username: credentials.username,
    password: credentials.password
});

async function getNews(){
    var numPosts = 50;
    for (var j=0; j < subreddits.length; j++) {
        var newPosts = await r.getSubreddit(subreddits[j]).getNew({limit: numPosts});
        for (var i=0; i < numPosts; i++){
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            var date = new Date(newPosts[i].created_utc * 1000).toDateString();
            var text = newPosts[i].selftext;
            for(const name of Object.keys(players)){
                nameArr = name.split(" ");
                if (text.includes(nameArr[0]) || text.includes(nameArr[1])){
                    if (!players[name].includes(newPosts[i].url)){
                        players[name].push(newPosts[i].url);
                    };
                };
            };
        };
    };
    return players;
};


module.exports = getNews;