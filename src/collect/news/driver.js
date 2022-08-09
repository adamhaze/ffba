// this script will run the news scrapers from multiple different sources
const email = require('../../email/emailNews.js');
const reddit = require('./sources/reddit/reddit.js');

var players = {
    'Saquon Barkley': {},
    'Clyde Edwards-Helaire': {},
    'Davante Adams': {},
    'Jaylen Waddle': {},
    'Keenan Allen': {},
    'Mark Andrews': {},
    'AJ Dillon': {},
    'Tyler Boyd': {},
    'Derek Carr': {},
    'Mitch Trubisky': {},
    'James White': {},
    'Melvin Gordon': {},
    'Raheem Mostert': {},
    'Matt Breida': {},
    'Trey Sermon': {},
    'DeAndre Hopkins': {},
    'Odell Beckham': {},
    'Robbie Anderson': {},
    'N\'Keal Harry': {},
    'Mecole Hardman': {},
    'Jakobi Myers': {},
    'Harrison Bryant': {},
    'Tommy Tremble': {},
    'Khalil Shakir': {},
    'Danny Gray': {},
    'Jameson Williams': {},
    'Kenneth Walker': {},
    'Treylon Burks': {},
    'Chris Olave': {},
    'Skyy Moore': {},
    'Drake London': {},
    'Trevor Lawrence': {},
    'Courtland Sutton': {},
    'DK Metcalf': {},
    'Noah Fant': {},
    'James Robinson': {},
    'Rhamondre Stevenson': {},
    'Ashton Dulin': {},
    'George Pickens': {},
    'Chase Claypool': {},
    'Rachaad White': {}
};

async function collectNews(){
    players = await reddit(players);
    var temp = await email(players);
};

module.exports = collectNews;
