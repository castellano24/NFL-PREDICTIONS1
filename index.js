const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

// Use your Railway API Key from environment variables
const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.sportsgameodds.com/v2/events";

// Serve the predictions as JSON
app.get("/predictions", async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&league=nfl`);
    if (!response.ok) throw new Error("Failed to fetch predictions.");
    const data = await response.json();

    // Extract and format the necessary data
    const predictions = data.events.map(event => ({
      homeTeam: event.home_team,
      awayTeam: event.away_team,
      homeLogo: `https://example.com/logos/${event.home_team}.png`, // Replace with actual logo URLs
      awayLogo: `https://example.com/logos/${event.away_team}.png`, // Replace with actual logo URLs
      homeRecord: "3-1", // Placeholder, replace with actual data
      awayRecord: "2-2", // Placeholder, replace with actual data
      predictedWinner: event.home_team, // Placeholder, replace with actual prediction
      prediction: 0.65, // Placeholder, replace with actual prediction
      spread: "-3.5", // Placeholder, replace with actual spread
      overUnder: "45.5" // Placeholder, replace with actual over/under
    }));

    res.json(predictions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
