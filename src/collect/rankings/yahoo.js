// Yahoo Experts
// rankings for Half-PPR
// https://sports.yahoo.com/fantasy-football-draft-rankings-for-2022-nfl-season-142617825.html
// const puppeteer = require('puppeteer');
const Ranks = require('../../db/models/ranks.js');

async function scrape(page){
    // connect to rankings webpage
    await page.goto('https://partners.fantasypros.com/external/widget/fp-widget.php?height=800px&width=640px&thead_color=%23ffffff&thead_font=%23000000&t_alt_row=%23fafafa&link_color=%233778be&pill_color=%232881eb&sport=NFL&wtype=ST&filters=7%3A9%3A285%3A699%3A747&scoring=HALF&expert=1663&affiliate_code=&year=2022&week=0&auction=false&Notes=false&tags=false&cards=true&showPodcastIcons=false&format=table&promo_link=true&title_header=true&positions=ALL%3AQB%3ADST%3AK&ppr_positions=&half_positions=ALL%3ARB%3AWR%3ATE&site=&fd_aff=&dk_aff=&fa_aff=&dp_aff=&');

    // iterate through each player on rankings page
    let numPlayers = 325;
    for (var i=1; i <= numPlayers; i++){
        let nameQuery = await page.waitForSelector(`#fpPosTable > tbody > tr:nth-child(${i}) > td.fp-player-name-cell > a:nth-child(1)`);
        var name = await page.evaluate(nameQuery => nameQuery.textContent, nameQuery);

        let ranks = new Array(5);
        for (var j=3; j <= 7; j++){
            let rankQuery = await page.waitForSelector(`#fpPosTable > tbody > tr:nth-child(${i}) > td:nth-child(${j})`);
            ranks[j-3] = await page.evaluate(rankQuery => rankQuery.textContent, rankQuery);
            if (ranks[j-3] == ''){ ranks[j-3] = -1};
        };
        let playerUpdate = {
            name: name,
            date: new Date(Date.now()).toDateString(),
            rankYahooBehrens: ranks[0],
            rankYahooPianowski: ranks[1],
            rankYahooDelDon: ranks[2],
            rankYahooLoza: ranks[3],
            rankYahooHarmon: ranks[4]
        };
        // Update Player in database with new rankings
        await Ranks.findOneAndUpdate({name: name, date: playerUpdate.date}, playerUpdate, {upsert: true});
    };
    console.log('Yahoo rankings scraped...');
};

module.exports = scrape;