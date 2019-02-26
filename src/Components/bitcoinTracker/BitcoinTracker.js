import React from 'react';
import './BitcoinTracker.css';

const BitcoinTracker = ({currentBTCPrice}) => {
    const price = parseFloat(currentBTCPrice).toFixed(2);
    return (
        <div className="bitcoinCurrentPrice">
          <img alt="" className="currentBTCImage" src="https://www.cryptocompare.com//media/19633/btc.png" />
          $
          {price}
        </div>
    );
}

export default BitcoinTracker;
