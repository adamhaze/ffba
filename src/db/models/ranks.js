// Require mongoose
const mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

var RankSchema = new Schema({
    name: { type: String },
    date: { type: String, default: new Date(Date.now()).toDateString() },

    rankFPBrown: {type: Number, default: 0}, // Fantasy Pros rankings
    rankFPErickson: {type: Number, default: 0},
    rankFPFitz: {type: Number, default: 0},
    rankFPFreedman: {type: Number, default: 0},
    rankFPPisapia: {type: Number, default: 0}
});

RankSchema.index({ '$**$': 'text' });

// Create the Player model
var Ranks = mongoose.model("Ranks", RankSchema);

// Export the Player model
module.exports = Ranks;