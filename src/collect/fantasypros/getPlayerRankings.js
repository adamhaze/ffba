
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
        // TODO: make temp player object to store fantasy pros rankings
        //       findOneAndUpdate at end of rankings iteration


        // iterate through each ranking for each player
        for (var j=3; j<=7; j++){
            let rankQuery = await page.waitForSelector(`#ranking-table > tbody > tr:nth-child(${i}) > td:nth-child(${j})`);
            var rank = await page.evaluate(rankQuery => rankQuery.textContent, rankQuery);
            console.log(rank);
        }
            
            // let temp = 0;
            // await Player.findOneAndUpdate({name: name, date: temp}, )

            // TODO:
            // map column number to expert
            // add expert rank stats to Player model

    }
    
    

    // td:nth-child(2) would be player info(name)
    
    process.exit();
}


scrape();