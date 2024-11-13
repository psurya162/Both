// components/Loader.js
import React from 'react';
import './Loader.css'

const Loader = () => {
  const quotes = [
    "Loading... Please wait.",
    "Patience is a virtue.",
    "Good things come to those who wait.",
    "Preparing your dashboard...",
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="loader-wrapperrrrrr">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p className="quote">{randomQuote}</p>
    </div>
  );
};

export default Loader;
