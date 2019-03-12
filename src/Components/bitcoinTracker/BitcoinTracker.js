import React from 'react';
import './BitcoinTracker.css';

const BitcoinTracker = ({currentBTCPrice}) => {
  const price = parseFloat(currentBTCPrice).toFixed(2);
  return (
    <div className="bitcoinCurrentPrice">
      <span className="bitcoinCurrentPriceLabel">{'1 BTC = '}</span>
      <img alt="" className="currentBTCImage" src="https://www.cryptocompare.com//media/19633/btc.png" />
      <span className="bitcoinCurrentPriceActual">{`$${price}`}</span>
    </div>
  );
};

export default BitcoinTracker;
