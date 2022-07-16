// TODO: separate backend process to run after getPlayerData 
//      which checks each unique player by "id" and computes changes in
//      projections and/or ADP

var db = require('../db/index.js');
const Player = require('../db/models/player.js');
const fs = require('fs');

let espnPlayers = '/Users/adamhayes/ws_home/projects/fantasyfb-analysis/src/espn/espn_player_ids.txt'
const playerMap = fs.readFile(espnPlayers, 'utf8', (err, data) => {
    if (err) throw err;
    let temp = data.split('\n');
    for(var i=0; i < 1; i++){
        let player = temp[i].split(',');
        let query = {'name': player[0], 'playerId': parseInt(player[1].trim())};
        Player.find(query).exec(function(err, response){
            if (err) throw err;
            console.log(response);
        })
    }

});


// query = {'playerId': 4242335};
// Player.find(query).exec(function(err, result){
//     if (err) throw err;
//     console.log(result);
// });


// Player.find({}).exec(function(err, result){
//     if (err) throw err;
//     let playerMap = Object.assign({}, ...result.map((elem) => ({[elem.name]: elem.playerId})));
//     console.log(playerMap);
// });
