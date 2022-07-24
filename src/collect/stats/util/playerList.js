const fs = require('fs');

let espnPlayers = '/Users/adamhayes/ws_home/projects/fantasyfb-analysis/src/collect/espn/util/espn_player_ids.txt';
let data = fs.readFileSync(espnPlayers, 'utf8');
let playerList = data.split('\n');

module.exports = playerList;