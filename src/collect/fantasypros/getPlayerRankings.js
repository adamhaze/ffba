
const puppeteer = require('puppeteer');
const db = require('../../db/index.js');
const Player = require('../../db/models/player.js');

async function scrape(){
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();

    // connect to rankings webpage
    await page.goto('https://www.fantasypros.com/nfl/fantasy-football-rankings/ppr-overall.php'); // PPR rankings
    
    // iterate through each player on rankings page
    for(var i=1; i < 5; i++){
        let nameQuery = await page.waitForSelector(`#ranking-table > tbody > tr:nth-child(${i}) > td.player__cell.sticky-cell.sticky-cell-two > div > div.player__name > span.everything-but-mobile.js-sort-field`);
        var name = await page.evaluate(nameQuery => nameQuery.textContent, nameQuery);
        console.log(name);

        // iterate through each ranking for each player
        let ranks = new Array(5);
        for (var j=3; j<=7; j++){
            let rankQuery = await page.waitForSelector(`#ranking-table > tbody > tr:nth-child(${i}) > td:nth-child(${j})`);
            ranks[j-3] = await page.evaluate(rankQuery => rankQuery.textContent, rankQuery);
            console.log(ranks);
        };
        let playerUpdate = {rankFPBrown:ranks[0], rankFPErickson:ranks[1], rankFPFitz:ranks[2], rankFPFreedman:ranks[3], rankFPPisapia:ranks[3]};
        
        // TODO: query player by name and today's date, update rankings
        let temp = 0;
        await Player.findOneAndUpdate({name: name, date: temp}, )
    }
    process.exit();
}


scrape();