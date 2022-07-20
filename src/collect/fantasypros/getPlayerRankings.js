
const puppeteer = require('puppeteer');
const db = require('../../db/index.js');
const Player = require('../../db/models/player.js');

async function scrape(){
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();

    // connect to rankings webpage
    await page.goto('https://www.fantasypros.com/nfl/fantasy-football-rankings/ppr-overall.php'); // PPR rankings
    
    // iterate through each player on rankings page
    let numPlayersFP = 449;
    for(var i=1; i <= numPlayersFP; i++){
        let nameQuery = await page.waitForSelector(`#ranking-table > tbody > tr:nth-child(${i}) > td.player__cell.sticky-cell.sticky-cell-two > div > div.player__name > span.everything-but-mobile.js-sort-field`);
        var name = await page.evaluate(nameQuery => nameQuery.textContent, nameQuery);

        // iterate through rankings for each player
        let ranks = new Array(5);
        for (var j=3; j<=7; j++){
            let rankQuery = await page.waitForSelector(`#ranking-table > tbody > tr:nth-child(${i}) > td:nth-child(${j})`);
            ranks[j-3] = await page.evaluate(rankQuery => rankQuery.textContent, rankQuery);
            if (ranks[j-3] == '-'){ ranks[j-3] = -1};
        };
        let playerUpdate = {rankFPBrown:ranks[0], rankFPErickson:ranks[1], rankFPFitz:ranks[2], rankFPFreedman:ranks[3], rankFPPisapia:ranks[4]};
        
        // Update Player in database with new rankings
        await Player.findOneAndUpdate({name: name, date: new Date(Date.now()).toDateString()}, playerUpdate, {upsert: true});
    }
    process.exit();
}


scrape();