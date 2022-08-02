// https://not-an-aardvark.github.io/snoowrap/index.html
const snoowrap = require('snoowrap');
const credentials = require('./credentials.js');

const r = new snoowrap({
    userAgent: 'something',
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    username: credentials.username,
    password: credentials.password
});
var newPosts = r.getSubreddit('fantasyfootball').getNew({limit: 50}).then(async function (response){
    console.log(response.length);
});