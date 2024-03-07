const express = require("express");
const mongoose = require("mongoose");
const Match = require("./models/match");
const Player = require("./models/player");
const PORT = process.env.PORT || 3000; // Use the port provided by the environment or default to 3000

//express app
const app = express();

//connect to db

const dbURI =
  "mongodb+srv://andy:Pen0lkhqSJHqxRRI@clusterv2.uyqrygz.mongodb.net/pitchinsight?retryWrites=true&w=majority";

const URI =
  "mongodb+srv://andy:Pen0lkhqSJHqxRRI@clusterv2.uyqrygz.mongodb.net/?retryWrites=true&w=majority&appName=clusterv2";

mongoose
  .connect(dbURI)
  .then((results) =>
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err));

app.get("/add_matches", (req, res) => {
  // Create a new Match instance
  const match = new Match({
    date: new Date(), // Example: Current date
    opponent: "Eleven Wise",
    location: "Home", // or "Away"
    metrics: {
      possession_percentage: 60, // Example possession percentage
      shots: [
        {
          shot_number: 1,
          shooter: "Player 1",
          key_passer: "Player 2",
          assist_type: "Direct",
          goal: true,
          xGoal: 0.8,
          xThreat: 0.9,
          on_target: true,
          x_position: 10,
          y_position: 5,
          timestamp: 15,
        },
        {
          shot_number: 2,
          shooter: "Player 1",
          key_passer: "Player 2",
          assist_type: "Header",
          goal: false,
          xGoal: 0.0,
          xThreat: 0.0,
          on_target: false,
          x_position: 50,
          y_position: 10,
          timestamp: 35,
        },
      ],
      passes: [
        {
          pass_number: 1,
          passer: "player1",
          reciever: "player2",
          on_target: true,
          x_position: 10,
          y_position: 5,
          timestamp: 2,
        },
      ],
    },
  });

  // Save the match instance to the database
  match
    .save()
    .then((savedMatch) => {
      console.log("Match saved:", savedMatch);
      res.status(201).json(savedMatch);
    })
    .catch((error) => {
      console.error("Error saving match:", error);
      res.status(500).json({ error: "Failed to save match" });
    });
});

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

app.get("/add_players", (req, res) => {
  // Create a new Player instance
  const player = new Player({
    name: "Lionel Messi", // Example: Player's name
    jersey_number: 10,
    club: "Inter Miami",
    match_stats: [
      {
        match_id: new mongoose.Types.ObjectId(),
        opponent: "LA Galaxy",
        date: new Date(), // Example: Valid match ID
        goals_scored: 2,
        assists: 1,
        yellow_cards: 0,
        red_cards: 0,
      },
      // Add more match stats if needed
    ],
  });

  // Save the player instance to the database
  player
    .save()
    .then((savedPlayer) => {
      console.log("Player saved:", savedPlayer);
      res.status(201).json(savedPlayer);
    })
    .catch((error) => {
      console.error("Error saving player:", error);
      res.status(500).json({ error: "Failed to save player" });
    });
});

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
