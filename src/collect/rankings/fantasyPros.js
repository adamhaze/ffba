
var Ranks = require('../../db/models/ranks.js');
const {players, nameMap} = require('../stats/util/playerList.js');

async function scrape(page){
    // connect to rankings webpage
    await page.goto('https://www.fantasypros.com/nfl/fantasy-football-rankings/ppr-overall.php'); // PPR rankings
    // iterate through each player on rankings page
    let numPlayersFP = 440;
    for(var i=1; i <= numPlayersFP; i++){
        let nameQuery = await page.waitForSelector(`#ranking-table > tbody > tr:nth-child(${i}) > td.player__cell.sticky-cell.sticky-cell-two > div > div.player__name > span.everything-but-mobile.js-sort-field`);
        var name = await page.evaluate(nameQuery => nameQuery.textContent, nameQuery);
        if (players.indexOf(name) === -1){
            if (nameMap[name] == undefined){
                console.log(name);
            }
            name = nameMap[name];
        }

        // iterate through rankings for each player
        let ranks = new Array(5);
        for (var j=3; j<=7; j++){
            let rankQuery = await page.waitForSelector(`#ranking-table > tbody > tr:nth-child(${i}) > td:nth-child(${j})`);
            ranks[j-3] = await page.evaluate(rankQuery => rankQuery.textContent, rankQuery);
            if (ranks[j-3] == '-'){ ranks[j-3] = -1};
        };
        let playerUpdate = {
            name: name,
            date: new Date(Date.now()).toDateString(),
            rankFPBrown: ranks[0], 
            rankFPErickson: ranks[1], 
            rankFPFitz: ranks[2], 
            rankFPFreedman: ranks[3], 
            rankFPPisapia: ranks[4]
        };
        
        // Save Player in database with new rankings
        let ranksUpdate = new Ranks(playerUpdate);
        await ranksUpdate.save();
    }
    console.log('Fantasy Pros rankings scraped...');
}

module.exports = scrape;