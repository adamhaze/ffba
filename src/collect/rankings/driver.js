var puppeteer = require('puppeteer');
var db = require('../../db/index.js');
var fantasyPros = require('./fantasyPros.js');
var yahoo = require('./yahoo.js');
var Ranks = require('../../db/models/ranks.js');

// TODO: export this function

async function driver() {

    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    await fantasyPros(page);
    await yahoo(page);

    process.exit();

};

module.exports = driver;