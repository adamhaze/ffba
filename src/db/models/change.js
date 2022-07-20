// Require mongoose
const mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

var PlayerChangeSchema = new Schema({
    name: { type: String },
    date: { type: String, default: new Date(Date.now()).toDateString() },
    ADPOvr: { type: Number, default: 0 },// change in ADP stats
    ADP1day: { type: Number, default: 0 },
    ADP7day: { type: Number, default: 0 },
    ownOvr: { type: Number, default: 0}, // change in ownership percentage
    projRushYds: { type: Number, default: 0}, // change in projections (overall)
    projRushTD: { type: Number, default: 0},
    projRecYds: { type: Number, default: 0},
    projRecTD: { type: Number, default: 0},
    projReceptions: { type: Number, default: 0},
    projRushYds7day: { type: Number, default: 0}, // change in projections (week long)
    projRushTD7day: { type: Number, default: 0},
    projRecYds7day: { type: Number, default: 0},
    projRecTD7day: { type: Number, default: 0},
    projReceptions7day: { type: Number, default: 0},

    rankFPBrown: {type: Number, default: 0}, // change in rankings overall (Fantasy Pros)
    rankFPErickson: {type: Number, default: 0},
    rankFPFitz: {type: Number, default: 0},
    rankFPFreedman: {type: Number, default: 0},
    rankFPPisapia: {type: Number, default: 0},

    rankFPBrown1day: {type: Number, default: 0}, // 1 day change in rankings
    rankFPErickson1day: {type: Number, default: 0},
    rankFPFitz1day: {type: Number, default: 0},
    rankFPFreedman1day: {type: Number, default: 0},
    rankFPPisapia1day: {type: Number, default: 0}

});

PlayerChangeSchema.index({ '$**$': 'text' });

// Create the Player model
var Change = mongoose.model("Change", PlayerChangeSchema);

// Export the Player model
module.exports = Change;