var db = require('../../db/index.js');
var Ranks = require('../../db/models/ranks.js');
var RanksTracker = require('../../db/models/ranksTracker.js');

async function analyzePlayerRankings(query){

    // TODO: only compute change in rankings if rank > 0, else use a filler
    // TODO: incorporate new rankings (yahoo)

    await Ranks.find(query).then(async function(response){
        let n = response.length-1;
        if (n >= 0){
            let playerUpdate = {
                name: response[n].name,
                date: response[n].date,
                rankFPBrown: (response[0].rankFPBrown - response[n].rankFPBrown),
                rankFPErickson: (response[0].rankFPErickson - response[n].rankFPErickson),
                rankFPFitz: (response[0].rankFPFitz - response[n].rankFPFitz),
                rankFPFreedman: (response[0].rankFPFreedman - response[n].rankFPFreedman),
                rankFPPisapia: (response[0].rankFPPisapia - response[n].rankFPPisapia),

                rankFPBrown1day: n >= 1 ? (response[0].rankFPBrown1day - response[n].rankFPBrown1day) : 0,
                rankFPErickson1day: n >= 1 ? (response[0].rankFPErickson1day - response[n].rankFPErickson1day) : 0,
                rankFPFitz1day: n >= 1 ? (response[0].rankFPFitz1day - response[n].rankFPFitz1day) : 0,
                rankFPFreedman1day: n >= 1 ? (response[0].rankFPFreedman1day - response[n].rankFPFreedman1day) : 0,
                rankFPPisapia1day: n >= 1 ? (response[0].rankFPPisapia1day - response[n].rankFPPisapia1day) : 0
            };
            let ranksUpdate = new RanksTracker(playerUpdate);
            await ranksUpdate.save();
        };

    }).catch(error => {
        console.log(error);
    });
};

module.exports = analyzePlayerRankings;