// frontend/src/CalculatorForm.js
import React, { useState } from 'react';
import './App.css'; // Or import a dedicated CalculatorForm.css if you create one

function CalculatorForm({ onCalculate }) {
  const [hashrate, setHashrate] = useState('');
  const [powerConsumption, setPowerConsumption] = useState('');
  const [electricityCost, setElectricityCost] = useState('');
  const [bitcoinPrice, setBitcoinPrice] = useState('');
  const [networkDifficulty, setNetworkDifficulty] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate({
      hashrate: Number(hashrate),
      powerConsumption: Number(powerConsumption),
      electricityCost: Number(electricityCost),
      bitcoinPrice: Number(bitcoinPrice),
      networkDifficulty: Number(networkDifficulty)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="calculator-form">
      <div className="form-group">
        <label htmlFor="hashrate">Hashrate (TH/s):</label>
        <input
          id="hashrate"
          type="number"
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
          value={bitcoinPrice}
          onChange={(e) => setBitcoinPrice(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="networkDifficulty">Network Difficulty:</label>
        <input
          id="networkDifficulty"
          type="number"
          value={networkDifficulty}
          onChange={(e) => setNetworkDifficulty(e.target.value)}
          required
        />
      </div>
      <button type="submit">Calculate</button>
    </form>
  );
}

export default CalculatorForm;
