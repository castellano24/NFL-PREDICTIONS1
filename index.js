// index.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Define your API keys for each service
const API_KEYS = {
  oddsAPI: process.env.ODDS_API_KEY,
  sportsDataIO: process.env.SPORTSDATAIO_API_KEY,
  oddsAPI2: process.env.ODDS_API_KEY_2, // Example for a second API key
};

// Define base URLs for each API
const BASE_URLS = {
  oddsAPI: 'https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds',
  sportsDataIO: 'https://api.sportsdata.io/v3/nfl/scores/json/GamesBySeason/{season}/{week}',
  oddsAPI2: 'https://api.oddsmatrix.com/v1/odds/nfl', // Example for a second API
};

// Helper function to fetch data from an API
async function fetchData(url, headers) {
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Route to get predictions
app.get('/predictions', async (req, res) => {
  const headers = {
    'x-rapidapi-key': API_KEYS.oddsAPI,
    'Authorization': `Bearer ${API_KEYS.sportsDataIO}`,
  };

  // Fetch data from each API
  const oddsData = await fetchData(BASE_URLS.oddsAPI, headers);
  const sportsData = await fetchData(BASE_URLS.sportsDataIO, headers);
  const oddsData2 = await fetchData(BASE_URLS.oddsAPI2, headers);

  // Combine and process data as needed
  const predictions = {
    oddsAPI: oddsData,
    sportsDataIO: sportsData,
    oddsAPI2: oddsData2,
  };

  res.json(predictions);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
