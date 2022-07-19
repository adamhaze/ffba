
const puppeteer = require('puppeteer');
const db = require('../db/index.js');
const Player = require('../db/models/player.js');

async function scrape(){
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();

    // successfully gets first ranking for Jonathan Taylor... yay
    await page.goto('https://www.fantasypros.com/nfl/fantasy-football-rankings.php');
    let selector = '#ranking-table > tbody > tr:nth-child(1) > td:nth-child(2)';
    var element = await page.waitForSelector(selector);

    for(var i=1; i < 10; i++){
        let nameQuery = await page.waitForSelector(`#ranking-table > tbody > tr:nth-child(${i}) > td.player__cell.sticky-cell.sticky-cell-two > div > div.player__name > span.everything-but-mobile.js-sort-field`);
        var name = await page.evaluate(nameQuery => nameQuery.textContent, nameQuery);
        Player.find({name: name}).exec(async function(err, response){
            if (err) throw err;
            let temp = 0;
            await Player.findOneAndUpdate({name: name, date: temp}, )

            // TODO:
            // for each name, use 'selector' query (iterate over nth-chile($i)) to get each ranking
            // map column number to expert
            // add expert rank stats to Player model

        })

        console.log(name);
    }
    
    

    // td:nth-child(2) would be player info(name)
    
    process.exit();
}


scrape();