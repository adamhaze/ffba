// Require mongoose
const mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

var StatTrackerSchema = new Schema({
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
    projReceptions7day: { type: Number, default: 0}
});

StatTrackerSchema.index({ '$**$': 'text' });

// Create the Player model
var StatTracker = mongoose.model("StatTracker", StatTrackerSchema);

// Export the Player model
module.exports = StatTracker;