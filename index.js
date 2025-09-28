const fetch = require('node-fetch');

const API_KEY = process.env.API_KEY; // gets your API key from Railway
const API_URL = 'https://api.sportsgameodds.com/nfl/predictions'; // example, confirm exact endpoint

async function getPredictions() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
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

// Example route if using Express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/predictions', async (req, res) => {
  const data = await getPredictions();
  res.json(data);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
