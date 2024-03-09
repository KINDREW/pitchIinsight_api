"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var matchStatsSchema = new Schema({
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match"
  },
  // Reference to the Match document
  opponent: String,
  date: Date,
  goals_scored: Number,
  assists: Number,
  yellow_cards: Number,
  red_cards: Number
}, {
  _id: false
});
var playerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  jersey_number: {
    type: Number,
    required: true
  },
  club: {
    type: String,
    required: true
  },
  match_stats: [matchStatsSchema] // Array of match stats embedded documents
});
var Player = mongoose.model("Player", playerSchema);
module.exports = Player;