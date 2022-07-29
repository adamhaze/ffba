const fs = require('fs');

let espnPlayers = '/Users/adamhayes/ws_home/projects/fantasyfb-analysis/src/collect/stats/util/espn_player_ids.txt';
let data = fs.readFileSync(espnPlayers, 'utf8');
let playerList = data.split('\n');

let playerListFinal = {};
for (var i=0; i < playerList.length; i++){
    let player = playerList[i].split(',');
    playerListFinal[player[0]] = +player[1]
}

playerListFinal = Object.keys(playerListFinal);
// TODO: finish name map
diffNameMap = {
    "Patrick Mahomes II": "Patrick Mahomes",
    "Buffalo Bills": "Bills D/ST",
    "Tampa Bay Buccaneers": "Buccaneers D/ST",
    "San Francisco 49ers": "49ers D/ST",
    "New England Patriots": "Patriots D/ST",
    "New Orleans Saints": "Saints D/ST",
    "Denver Broncos": "Broncos D/ST",
    "Indianapolis Colts": "Colts D/ST",
    "Los Angeles Rams": "Rams D/ST",
    "Dallas Cowboys": "Cowboys D/ST",
    "Baltimore Ravens": "Ravens D/ST",
    "Kansas City Chiefs": "Chiefs D/ST",
    "Cleveland Browns": "Browns D/ST",
    "Green Bay Packers": "Packers D/ST",
    "Miami Dolphins": "Dolphins D/ST",
    "Los Angeles Chargers": "Chargers D/ST",
    "Pittsburgh Steelers": "Steelers D/ST",
    "Cincinnati Bengals": "Bengals D/ST",
    "Philadelphia Eagles": "Eagles D/ST",
    "Carolina Panthers": "Panthers D/ST",
    "Tennessee Titans": "Titans D/ST",
    "Arizona Cardinals": "Cardinals D/ST",
    "Chicago Bears": "Bears D/ST",
    "Minnesota Vikings": "Vikings D/ST",
    "Washington Commanders": "Commanders D/ST",
    "New York Jets": "Jets D/ST",
    "Seattle Seahawks": "Seahawks D/ST",
    "New York Giants": "Giants D/ST",
    "Detroit Lions": "Lions D/ST",
    "Jacksonville Jaguars": "Jaguars D/ST",
    "Las Vegas Raiders": "Raiders D/ST",
    "Atlanta Falcons": "Falcons D/ST",
    "Houston Texans": "Texans D/ST",
    "Isiah Pacheco": "Isaih Pacheco"
};

module.exports = {
    players: playerListFinal,
    nameMap: diffNameMap
};