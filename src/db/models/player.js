// Require mongoose
const mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    name: { type: String },
    playerId: { type: Number },
    position: {type: String, default: ' '},
    team: {  type: String  },
    ADP: {  type: Number  },
    owned: { type: Number },
    projRushYds: { type: Number, default: 0 },
    projRushTD: { type: Number, default: 0 },
    projRecYds: { type: Number, default: 0 },
    projRecTD: { type: Number, default: 0 },
    projReceptions: { type: Number, default: 0 },
    date: { type: String, default: new Date(Date.now()).toDateString() }
});

PlayerSchema.index({ '$**$': 'text' });

// Create the Player model
var Player = mongoose.model("Player", PlayerSchema);

// Export the Player model
module.exports = Player;