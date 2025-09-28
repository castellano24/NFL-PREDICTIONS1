// index.js
const express = require('express');
const fetch = require('node-fetch'); // Railway supports this
const app = express();
const PORT = process.env.PORT || 3000;

// Make sure you have added your API key in Railway environment variables:
// Key: API_KEY
// Value: 75c0908d8c539174a69c04cd7d70e2ac
const API_KEY = process.env.API_KEY;

// Replace this with the exact SportsGameOdds NFL endpoint from their docs
const API_URL = 'https://api.sportsgameodds.com/nfl/predictions';

async function getPredictions() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: 'Failed to fetch predictions.' };
  }
}

// Endpoint to serve predictions
app.get('/predictions', async (req, res) => {
  const data = await getPredictions();
  res.json(data);
});

// Simple homepage
app.get('/', (req, res) => {
  res.send('<h1>NFL Predictions API is running!</h1><p>Go to <code>/predictions</code> to see live predictions.</p>');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
