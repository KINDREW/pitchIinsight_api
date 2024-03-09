const express = require("express");
const mongoose = require("mongoose");
const Match = require("./models/match");
const Player = require("./models/player");
const PORT = process.env.PORT || 3000;

//express app
const app = express();

//connect to db

const dbURI =
  "mongodb+srv://andy:Pen0lkhqSJHqxRRI@clusterv2.uyqrygz.mongodb.net/pitchinsight?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then((results) =>
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err));

// Create a new Match instance
app.get("/add_matches", (req, res) => {
  const match = new Match(req.body);

  // Save the match instance to the database
  match
    .save()
    .then((savedMatch) => {
      // console.log("Match saved:", savedMatch);
      res.status(201).redirect("/all_matches");
    })
    .catch((error) => {
      // console.error("Error saving match:", error);
      res.status(500).json({ error: "Failed to save match" });
    });
});

//retrieving matches from db
app.get("/all_matches", (req, res) => {
  Match.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Create a new Player instance
app.get("/add_players", (req, res) => {
  const player = new Player(req.body);

  // Save the player instance to the database
  player
    .save()
    .then((savedPlayer) => {
      // console.log("Player saved:", savedPlayer);
      res.status(201).redirect("/all_players");
    })
    .catch((error) => {
      // console.error("Error saving player:", error);
      res.status(500).json({ error: "Failed to save player" });
    });
});

//retrieving matches from db
app.get("/all_players", (req, res) => {
  Player.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});
