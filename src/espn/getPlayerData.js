// import Client from 'espn-fantasy-football-api/node.js'; // node
// import Player from '../db/models/player.js';
// import db from '../db/index.js';
const Client = require('espn-fantasy-football-api/node');
var Player = require('../db/models/player.js');
var db = require('../db/index.js');

// init client to get data from ESPN api
const myClient = new Client.Client({ leagueId: 1807663261 });
myClient.setCookies({ espnS2: "AECTLfBetRAmtuxjYd1fspkJqAaWVrvCT3vfDZD47W7Q70eGj0AqWIwdjjrutHkJuM5aiMcKENANthWNPiwYLZb4Cm1pKM7xJVgKy3mvsorImuowun83RiJHnG0IBC62s3bwVOHhTZQ5YlFD6XrDb9XZOdCfjYnmrwC482Li/fZ0soKFC6GsWoO+a7URGSlfe1jIRkG/tdlfquvkI6BUGYLY0ud/4FToD2k6sBixbbjrB8vzMUU4c5VQbOb9iBUlsx4=", 
                      SWID: '{3F159436-6F55-4662-BD46-F3BBCD1A3A01}'});

// get all fantasy players via free agents from private league that will never draft
// store relevant info for each
const freeAgents = myClient.getFreeAgents({seasonId: 2022, scoringPeriodId: 0}).then(async function (response) {
    // response.length
    await Player.deleteMany({});
    for (var i=0; i < 5; i++){
        const playerInfo = response[i].player;
        const projStats = response[i].projectedRawStats;
        const addPlayer = {
            name: playerInfo.fullName,
            id: playerInfo.id,
            team: playerInfo.proTeamAbbreviation,
            ADP: playerInfo.averageDraftPosition,
            owned: playerInfo.percentOwned,

            projRushYds: projStats.rushingYards,
            projRushTD: projStats.rushingTouchdowns,
            projRecYds: projStats.receivingYards,
            projRecTD: projStats.receivingTouchdowns,
            projReceptions: projStats.receivingReceptions
        }

        let newPlayer = new Player(addPlayer);
        await newPlayer.save();

    }
    console.log('ESPN player data collected...');
    process.exit();
}).catch(error => {
    console.log(error);
});


