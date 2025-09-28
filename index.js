// index.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Your API key (set as Railway environment variable)
const API_KEY = process.env.API_KEY;

// Base URL for SportsGameOdds NFL predictions
const BASE_URL = 'https://api.sportsgameodds.com/nfl/predictions';

// Helper function to fetch multiple markets
async function fetchMarket(market) {
  try {
    const res = await fetch(`${BASE_URL}?market=${market}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error(`Failed to fetch ${market}: ${res.status}`);

    const data = await res.json();
    return { [market]: data };
  } catch (err) {
    console.error(err.message);
    return { [market]: { error: `Failed to fetch ${market}` } };
  }
}

// Endpoint to fetch all prediction markets
app.get('/predictions', async (req, res) => {
  const markets = ['moneyline', 'spread', 'over_under', 'win_probability', 'team_stats']; // add more if available
  const results = await Promise.all(markets.map(fetchMarket));

  // Merge all market objects into one
  const merged = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
  res.json(merged);
});

// Simple homepage
app.get('/', (req, res) => {
  res.send('<h1>NFL Predictions API is running!</h1><p>Go to <code>/predictions</code> for all markets.</p>');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
