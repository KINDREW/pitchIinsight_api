"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Define the Shots embedded schema
var shotSchema = new Schema({
  shot_number: Number,
  shooter: String,
  key_passer: String,
  assist_type: String,
  goal: Boolean,
  xGoal: Number,
  xThreat: Number,
  on_target: Boolean,
  x_position: Number,
  y_position: Number,
  timestamp: Number
});

// Define the pass embedded schema
var passSchema = new Schema({
  pass_number: Number,
  passer: String,
  reciever: String,
  on_target: Boolean,
  x_position: Number,
  y_position: Number,
  timestamp: Number
});

// Define the Match Metrics embedded schema
var matchMetricsSchema = new Schema({
  possession_percentage: Number,
  shots: [shotSchema],
  passes: [passSchema] // Array of shots embedded documents
});

// Define the main Matches schema
var matchSchema = new Schema({
  date: Date,
  opponent: String,
  location: String,
  metrics: matchMetricsSchema // Embedded document for match metrics
});

// Create a model for the Matches collection
var Match = mongoose.model("Match", matchSchema);
module.exports = Match;