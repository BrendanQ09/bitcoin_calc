// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API endpoint for Bitcoin mining calculation
app.post('/api/calculate', (req, res) => {
  const { hashrate, powerConsumption, electricityCost, bitcoinPrice, networkDifficulty } = req.body;
  
  // Use your own calculation logic here.
  const dailyProfit = computeDailyProfit(hashrate, powerConsumption, electricityCost, bitcoinPrice, networkDifficulty);

  res.json({
    daily: dailyProfit,
    monthly: dailyProfit * 30,
    yearly: dailyProfit * 365
  });
});

// Example calculation function (replace with actual logic)
function computeDailyProfit(hashrate, power, cost, price, difficulty) {
  // Placeholder formula: adjust this formula as needed.
  return (hashrate * price) / (difficulty + cost);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
