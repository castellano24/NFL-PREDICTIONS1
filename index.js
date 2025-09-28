// index.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

// Use your Railway API Key from environment variables
const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.sportsgameodds.com/v1/nfl/predictions";

app.get("/", async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}`);
    if (!response.ok) throw new Error("Failed to fetch predictions.");
    const data = await response.json();

    let html = `
      <html>
        <head>
          <title>NFL Predictions</title>
          <style>
            body { font-family: Arial, sans-serif; background: #f4f4f4; text-align: center; }
            h1 { color: #6A0DAD; }
            .game { margin: 20px; padding: 15px; background: #fff; border-radius: 10px; display: inline-block; }
            .team { font-weight: bold; }
            .prob { color: green; }
          </style>
        </head>
        <body>
          <h1>NFL Predictions</h1>
    `;

    data.games.forEach(game => {
      html += `
        <div class="game">
          <div class="team">${game.home_team} vs ${game.away_team}</div>
          <div>Home Win Probability: <span class="prob">${game.home_win_prob}%</span></div>
          <div>Away Win Probability: <span class="prob">${game.away_win_prob}%</span></div>
          <div>Vegas Spread: ${game.spread}</div>
          <div>Over/Under: ${game.over_under}</div>
        </div>
      `;
    });

    html += `</body></html>`;
    res.send(html);

  } catch (err) {
    res.send(`<h1>Error: Unable to load predictions.</h1><p>${err.message}</p>`);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
