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

    var newPosts = await r.getSubreddit(subreddits[0]).getNew({limit: 50});
    console.log(newPosts);
    
    
    // r.getSubreddit('fantasyfootball').getNew({limit: 50}).then(async function (response){
    //     console.log(response.length);
    // });

};


module.exports = getNews;