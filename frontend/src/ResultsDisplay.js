// frontend/src/ResultsDisplay.js
import React from 'react';

function ResultsDisplay({ results }) {
  return (
    <div>
      <h2>Results:</h2>
      <p>Daily Profit: ${results.daily.toFixed(2)}</p>
      <p>Monthly Profit: ${results.monthly.toFixed(2)}</p>
      <p>Yearly Profit: ${results.yearly.toFixed(2)}</p>
    </div>
  );
}

export default ResultsDisplay;
