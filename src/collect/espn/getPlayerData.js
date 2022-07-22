
var Client = require('espn-fantasy-football-api/node');
var Player = require('../../db/models/player.js');
var db = require('../../db/index.js');

// TODO: turn this to an async function that gets exported
// TODO: change 'espn' directory to 'stats'
// TODO: make single driver file in 'collect' that calls getPlayerData and the rankings driver

// init client to get data from ESPN api
const myClient = new Client.Client({ leagueId: 1807663261 });
myClient.setCookies({ espnS2: "AECTLfBetRAmtuxjYd1fspkJqAaWVrvCT3vfDZD47W7Q70eGj0AqWIwdjjrutHkJuM5aiMcKENANthWNPiwYLZb4Cm1pKM7xJVgKy3mvsorImuowun83RiJHnG0IBC62s3bwVOHhTZQ5YlFD6XrDb9XZOdCfjYnmrwC482Li/fZ0soKFC6GsWoO+a7URGSlfe1jIRkG/tdlfquvkI6BUGYLY0ud/4FToD2k6sBixbbjrB8vzMUU4c5VQbOb9iBUlsx4=", 
                      SWID: '{3F159436-6F55-4662-BD46-F3BBCD1A3A01}'});

// get all fantasy players via free agents from private league that will never draft
// store relevant info for each
const freeAgents = myClient.getFreeAgents({seasonId: 2022, scoringPeriodId: 0}).then(async function (response) {
    // await Player.deleteMany({});
    for (var i=0; i < response.length; i++){
        const playerInfo = response[i].player;
        const projStats = response[i].projectedRawStats;
        const addPlayer = {
            name: playerInfo.fullName,
            playerId: playerInfo.id,
            team: playerInfo.proTeamAbbreviation,
            ADP: playerInfo.averageDraftPosition,
            owned: playerInfo.percentOwned,

            projRushYds: projStats.rushingYards,
            projRushTD: projStats.rushingTouchdowns,
            projRecYds: projStats.receivingYards,
            projRecTD: projStats.receivingTouchdowns,
            projReceptions: projStats.receivingReceptions
        };

        let newPlayer = new Player(addPlayer);
        await newPlayer.save();

    }
    console.log('ESPN player data collected...');
    process.exit();
}).catch(error => {
    console.log(error);
});


// Hidden ESPN API endpoints (news!)
// https://gist.github.com/akeaswaran/b48b02f1c94f873c6655e7129910fc3b