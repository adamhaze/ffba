var db = require('../../db/index.js');
var Ranks = require('../../db/models/ranks.js');
var RanksTracker = require('../../db/models/ranksTracker.js');

async function analyzePlayerRankings(query){

    await Ranks.find(query).then(async function(response){
        let n = response.length-1;
        if (n >= 0){
            let playerUpdate = {
                name: response[n].name,
                date: response[n].date,
                rankFPBrown: (response[0].rankFPBrown > 0 && response[n].rankFPBrown > 0) ? (response[0].rankFPBrown - response[n].rankFPBrown) : 0,
                rankFPErickson: (response[0].rankFPErickson > 0 && response[n].rankFPErickson > 0) ? (response[0].rankFPErickson - response[n].rankFPErickson) : 0,
                rankFPFitz: (response[0].rankFPFitz > 0 && response[n].rankFPFitz > 0) ? (response[0].rankFPFitz - response[n].rankFPFitz) : 0,
                rankFPFreedman: (response[0].rankFPFreedman > 0 && response[n].rankFPFreedman > 0) ? (response[0].rankFPFreedman - response[n].rankFPFreedman) : 0,
                rankFPPisapia: (response[0].rankFPPisapia > 0 && response[n].rankFPPisapia > 0) ? (response[0].rankFPPisapia - response[n].rankFPPisapia) : 0,

                // TODO: shouldn't be checking rank...1day, should be checking response[n] vs response[n-1]
                //       The 1day ranking updates are wrong and need to be corrected
                rankFPBrown1day: (n >= 1 && response[0].rankFPBrown1day > 0 && response[n].rankFPBrown1day > 0) ? (response[0].rankFPBrown1day - response[n].rankFPBrown1day) : 0,
                rankFPErickson1day: (n >= 1 && response[0].rankFPErickson1day > 0 && response[n].rankFPErickson1day > 0) ? (response[0].rankFPErickson1day - response[n].rankFPErickson1day) : 0,
                rankFPFitz1day: (n >= 1 && response[0].rankFPFitz1day > 0 && response[n].rankFPFitz1day > 0) ? (response[0].rankFPFitz1day - response[n].rankFPFitz1day) : 0,
                rankFPFreedman1day: (n >= 1 && response[0].rankFPFreedman1day > 0 && response[n].rankFPFreedman1day > 0) ? (response[0].rankFPFreedman1day - response[n].rankFPFreedman1day) : 0,
                rankFPPisapia1day: (n >= 1 && response[0].rankFPPisapia1day > 0 && response[n].rankFPPisapia1day > 0) ? (response[0].rankFPPisapia1day - response[n].rankFPPisapia1day) : 0,

                rankYahooBehrens: (response[0].rankYahooBehrens > 0 && response[n].rankYahooBehrens > 0) ? (response[0].rankYahooBehrens - response[n].rankYahooBehrens) : 0,
                rankYahooPianowski: (response[0].rankYahooPianowski > 0 && response[n].rankYahooPianowski > 0) ? (response[0].rankYahooPianowski - response[n].rankYahooPianowski) : 0,
                rankYahooDelDon: (response[0].rankYahooDelDon > 0 && response[n].rankYahooDelDon > 0) ? (response[0].rankYahooDelDon - response[n].rankYahooDelDon) : 0,
                rankYahooLoza: (response[0].rankYahooLoza > 0 && response[n].rankYahooLoza > 0) ? (response[0].rankYahooLoza - response[n].rankYahooLoza) : 0,
                rankYahooHarmon: (response[0].rankYahooHarmon > 0 && response[n].rankYahooHarmon > 0) ? (response[0].rankYahooHarmon - response[n].rankYahooHarmon) : 0,

                rankYahooBehrens1day: (n >= 1 && response[0].rankYahooBehrens1day > 0 && response[n].rankYahooBehrens1day > 0) ? (response[0].rankYahooBehrens1day - response[n].rankYahooBehrens1day) : 0,
                rankYahooPianowski1day: (n >= 1 && response[0].rankYahooPianowski1day > 0 && response[n].rankYahooPianowski1day > 0) ? (response[0].rankYahooPianowski1day - response[n].rankYahooPianowski1day) : 0,
                rankYahooDelDon1day: (n >= 1 && response[0].rankYahooDelDon1day > 0 && response[n].rankYahooDelDon1day > 0) ? (response[0].rankYahooDelDon1day - response[n].rankYahooDelDon1day) : 0,
                rankYahooLoza1day: (n >= 1 && response[0].rankYahooLoza1day > 0 && response[n].rankYahooLoza1day > 0) ? (response[0].rankYahooLoza1day - response[n].rankYahooLoza1day) : 0,
                rankYahooHarmon1day: (n >= 1 && response[0].rankYahooHarmon1day > 0 && response[n].rankYahooHarmon1day > 0) ? (response[0].rankYahooHarmon1day - response[n].rankYahooHarmon1day) : 0
            };
            let ranksUpdate = new RanksTracker(playerUpdate);
            await ranksUpdate.save();
        };

    }).catch(error => {
        console.log(error);
    });
};

module.exports = analyzePlayerRankings;