// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    name: {
        type: String
    },
    id: {
        type: Number
    },
    team: { 
        type: String 
    },
    ADP: { 
        type: Number 
    },
    owned: {
        type: Number
    },
    projRushYds: {
        type: Number
    },
    projRushTD: {
        type: Number
    },
    projRecYds: {
        type: Number
    },
    projRecTD: {
        type: Number
    },
    projReceptions: {
        type: Number
    }

});

PlayerSchema.index({ '$**$': 'text' });

// Create the Player model
var Player = mongoose.model("Player", PlayerSchema);

// Export the Player model
module.exports = Player;