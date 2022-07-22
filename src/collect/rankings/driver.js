var puppeteer = require('puppeteer');
var db = require('../../db/index.js');
var fantasyPros = require('./fantasyPros.js');
var yahoo = require('./yahoo.js');
var Ranks = require('../../db/models/ranks.js');

// TODO: export this function

async function driver() {

    // await Ranks.deleteMany({});

    const browser = await puppeteer.launch({});
    const page = await browser.newPage();

    await fantasyPros(page);
    await yahoo(page);

    process.exit();

};

driver();