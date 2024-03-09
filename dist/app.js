"use strict";

var express = require("express");
var mongoose = require("mongoose");
var Match = require("./models/match");
var Player = require("./models/player");
var PORT = process.env.PORT || 3000;

//express app
var app = express();

//connect to db

var dbURI = "mongodb+srv://andy:Pen0lkhqSJHqxRRI@clusterv2.uyqrygz.mongodb.net/pitchinsight?retryWrites=true&w=majority";
mongoose.connect(dbURI).then(function (results) {
  return app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
  });
})["catch"](function (err) {
  return console.log(err);
});

// Create a new Match instance
app.get("/add_matches", function (req, res) {
  var match = new Match(req.body);

  // Save the match instance to the database
  match.save().then(function (savedMatch) {
    // console.log("Match saved:", savedMatch);
    res.status(201).redirect("/all_matches");
  })["catch"](function (error) {
    // console.error("Error saving match:", error);
    res.status(500).json({
      error: "Failed to save match"
    });
  });
});

//retrieving matches from db
app.get("/all_matches", function (req, res) {
  Match.find().sort({
    createdAt: -1
  }).then(function (result) {
    res.json(result);
  })["catch"](function (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal server error"
    });
  });
});

// Create a new Player instance
app.get("/add_players", function (req, res) {
  var player = new Player(req.body);

  // Save the player instance to the database
  player.save().then(function (savedPlayer) {
    // console.log("Player saved:", savedPlayer);
    res.status(201).redirect("/all_players");
  })["catch"](function (error) {
    // console.error("Error saving player:", error);
    res.status(500).json({
      error: "Failed to save player"
    });
  });
});

//retrieving matches from db
app.get("/all_players", function (req, res) {
  Player.find().sort({
    createdAt: -1
  }).then(function (result) {
    res.json(result);
  })["catch"](function (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal server error"
    });
  });
});