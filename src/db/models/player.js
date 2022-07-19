// Require mongoose
const mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    name: { type: String },
    playerId: { type: Number },
    team: {  type: String  },
    ADP: {  type: Number  },
    owned: { type: Number },
    projRushYds: { type: Number, default: 0 },
    projRushTD: { type: Number, default: 0 },
    projRecYds: { type: Number, default: 0 },
    projRecTD: { type: Number, default: 0 },
    projReceptions: { type: Number, default: 0 },
    date: { type: String, default: new Date(Date.now()).toDateString() },
    cADPOvr: { type: Number, default: 0 },// change in ADP stats
    cADP1day: { type: Number, default: 0 },
    cADP7day: { type: Number, default: 0 },
    cOwnOvr: { type: Number, default: 0}, // change in ownership percentage
    cProjRushYds: { type: Number, default: 0}, // change in projections (overall)
    cProjRushTD: { type: Number, default: 0},
    cProjRecYds: { type: Number, default: 0},
    cProjRecTD: { type: Number, default: 0},
    cProjReceptions: { type: Number, default: 0},
    cProjRushYds7day: { type: Number, default: 0}, // change in projections (week long)
    cProjRushTD7day: { type: Number, default: 0},
    cProjRecYds7day: { type: Number, default: 0},
    cProjRecTD7day: { type: Number, default: 0},
    cProjReceptions7day: { type: Number, default: 0},
    rankFPBrown: {type: Number, default: 0}, // rankings features
    rankFPErickson: {type: Number, default: 0},
    rankFPFitz: {type: Number, default: 0},
    rankFPFreedman: {type: Number, default: 0},
    rankFPPisapia: {type: Number, default: 0}

});

PlayerSchema.index({ '$**$': 'text' });

// Create the Player model
var Player = mongoose.model("Player", PlayerSchema);

// Export the Player model
module.exports = Player;