
const puppeteer = require('puppeteer');

async function scrape(){
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();

    // successfully gets first ranking for Jonathan Taylor... yay
    await page.goto('https://www.fantasypros.com/nfl/fantasy-football-rankings.php');
    var element = await page.waitForSelector('#ranking-table > tbody > tr:nth-child(1) > td:nth-child(3)');
    var text = await page.evaluate(element => element.textContent, element);
    console.log(text);
    process.exit();
}


scrape();