// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  // --- State for Mining Calculator ---
  const [hashrate, setHashrate] = useState('50');              // TH/s
  const [powerConsumption, setPowerConsumption] = useState('3000'); // Watts
  const [electricityCost, setElectricityCost] = useState('0.12');   // $/kWh
  const [networkDifficulty, setNetworkDifficulty] = useState('30000000000000');
  const [bitcoinPrice, setBitcoinPrice] = useState('');

  const [results, setResults] = useState(null);

  // --- Fetch Real-Time BTC Price (Optional) ---
  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        );
        const data = await response.json();
        if (data?.bitcoin?.usd) {
          setBitcoinPrice(data.bitcoin.usd.toString());
        } else {
          setBitcoinPrice('27000'); // fallback default
        }
      } catch (error) {
        console.error('Error fetching BTC price:', error);
        setBitcoinPrice('27000');
      }
    };
    fetchBtcPrice();
  }, []);

  // --- Bitcoin Mining Calculation ---
  const handleSubmit = (e) => {
    e.preventDefault();

    const hashrateNum = parseFloat(hashrate);
    const powerNum = parseFloat(powerConsumption);
    const elecCostNum = parseFloat(electricityCost);
    const btcPriceNum = parseFloat(bitcoinPrice) || 0;
    const difficultyNum = parseFloat(networkDifficulty);

    // Convert TH/s -> H/s
    const hashrateHs = hashrateNum * 1e12;

    // Constants
    const blockReward = 6.25;
    const blocksPerDay = 144;
    const twoPow32 = 4294967296;

    // Daily BTC mined = (hashrate / (difficulty * 2^32)) * blockReward * blocksPerDay
    const dailyBTC = (hashrateHs / (difficultyNum * twoPow32)) * blockReward * blocksPerDay;
    // Daily revenue in USD
    const dailyRevenue = dailyBTC * btcPriceNum;
    // Electricity cost: convert Watts to kW, multiply by 24 hours
    const dailyElecCost = (powerNum / 1000) * 24 * elecCostNum;
    // Profit = Revenue - Electricity Cost
    const dailyProfit = dailyRevenue - dailyElecCost;
    const monthlyProfit = dailyProfit * 30;
    const yearlyProfit = dailyProfit * 365;

    setResults({
      dailyProfit,
      monthlyProfit,
      yearlyProfit,
      dailyBTC,
      dailyRevenue,
      dailyElecCost
    });
  };

  return (
    <div className="app">
      {/* HERO HEADER */}
      <header className="hero-header">
        <div className="hero-content">
          <h1>Bitcoin Mining Profitability Calculator</h1>
          <p>
            Estimate your potential mining returns based on real-time Bitcoin prices and your rig’s specifications.
          </p>
        </div>
      </header>

      {/* CALCULATOR SECTION */}
      <main className="calc-layout">
        {/* Left Column (Input Form) */}
        <section className="card left-col">
          <h2>Enter Mining Parameters</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="hashrate">Hashrate (TH/s):</label>
              <input
                id="hashrate"
                type="number"
                placeholder="e.g., 50"
                value={hashrate}
                onChange={(e) => setHashrate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="powerConsumption">Power Consumption (Watts):</label>
              <input
                id="powerConsumption"
                type="number"
                placeholder="e.g., 3000"
                value={powerConsumption}
                onChange={(e) => setPowerConsumption(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="electricityCost">Electricity Cost ($/kWh):</label>
              <input
                id="electricityCost"
                type="number"
                placeholder="e.g., 0.12"
                step="0.01"
                value={electricityCost}
                onChange={(e) => setElectricityCost(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bitcoinPrice">Bitcoin Price ($):</label>
              <input
                id="bitcoinPrice"
                type="number"
                placeholder="Fetched automatically"
                value={bitcoinPrice}
                onChange={(e) => setBitcoinPrice(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="networkDifficulty">
                Network Difficulty 
                <span className="tooltip">(A measure of how hard it is to mine a block)</span>
              </label>
              <input
                id="networkDifficulty"
                type="number"
                placeholder="e.g., 30000000000000"
                value={networkDifficulty}
                onChange={(e) => setNetworkDifficulty(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="calculate-btn">Calculate</button>
          </form>
        </section>

        {/* Right Column (Results) */}
        <section className="card right-col">
          <h2>Results</h2>
          {results ? (
            <div className="results">
              <div className="result-row">
                <span>Daily Profit:</span>
                <strong>${results.dailyProfit.toFixed(2)}</strong>
              </div>
              <div className="result-row">
                <span>Monthly Profit:</span>
                <strong>${results.monthlyProfit.toFixed(2)}</strong>
              </div>
              <div className="result-row">
                <span>Yearly Profit:</span>
                <strong>${results.yearlyProfit.toFixed(2)}</strong>
              </div>
              <hr />
              <div className="result-row">
                <span>Daily BTC Mined:</span>
                <strong>{results.dailyBTC.toFixed(8)} BTC</strong>
              </div>
              <div className="result-row">
                <span>Daily Revenue:</span>
                <strong>${results.dailyRevenue.toFixed(2)}</strong>
              </div>
              <div className="result-row">
                <span>Daily Electricity Cost:</span>
                <strong>${results.dailyElecCost.toFixed(2)}</strong>
              </div>
            </div>
          ) : (
            <p>Enter your mining parameters to see estimated profits.</p>
          )}
        </section>
      </main>

      {/* INFORMATIONAL SECTION (Bitcoin Mining Focus) */}
      <section className="info-section">
        <div className="info-container">
          <h2>Understanding Bitcoin Mining</h2>
          <ul>
            <li><strong>What is Network Difficulty?</strong> Network difficulty is a measure of how hard it is to find a new block. It adjusts every 2016 blocks (approximately every two weeks) to maintain a 10-minute block interval.</li>
            <li><strong>How Does Hashrate Impact Earnings?</strong> A higher hashrate means your mining hardware can perform more calculations per second, increasing your chance to earn rewards, assuming network difficulty remains constant.</li>
            <li><strong>Role of Electricity Costs:</strong> Electricity is one of the major expenses in Bitcoin mining. Lower electricity costs can significantly boost profit margins.</li>
            <li><strong>Block Reward and Fees:</strong> Currently, miners earn 6.25 BTC per block (plus transaction fees), though this reward halves approximately every four years.</li>
          </ul>

          <h2>Bitcoin Mining FAQs</h2>
          <ul>
            <li>How is mining profitability calculated?</li>
            <li>What factors affect network difficulty?</li>
            <li>How do hardware specifications influence returns?</li>
            <li>What risks are associated with Bitcoin mining?</li>
            <li>Where can I find real-time mining data?</li>
          </ul>

          <h2>Resources</h2>
          <ul>
            <li><a href="https://www.blockchain.com" target="_blank" rel="noopener noreferrer">Blockchain Explorer</a></li>
            <li><a href="https://www.coinmarketcap.com" target="_blank" rel="noopener noreferrer">CoinMarketCap</a></li>
            <li><a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer">CoinGecko API</a></li>
          </ul>

          <p className="disclaimer">
            Disclaimer: This calculator provides estimates only. Network difficulty, Bitcoin price, and other factors are subject to change. Please do your own research before investing in mining.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Bitcoin Mining Calculator</p>
      </footer>
    </div>
  );
}

export default App;
