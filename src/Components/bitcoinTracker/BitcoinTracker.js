import React from 'react';
import './BitcoinTracker.css';

const BitcoinTracker = ({ currentBTCPrice, answer, handleSubmit5 }) => {
  const price = parseFloat(currentBTCPrice).toFixed(2);
  return (
    <div
      className={answer === true ? 'col-sm-2 bitcoinTrackerWrapper yesBackgroundColor'
        : 'col-sm-2 bitcoinTrackerWrapper noBackgroundColor'
      }
      onClick={(e) => {
        handleSubmit5(e, 'BTC');
      }}
      role="button"
      tabIndex={0}
      onKeyDown={() => {
        '';
      }
    }
    >
      <div className="bitcoinCurrentPrice">
        <span className="bitcoinCurrentPriceLabel">
          {'1 BTC = '}
        </span>
        <img alt="" className="currentBTCImage" src="https://www.cryptocompare.com//media/19633/btc.png" />
        <span className="bitcoinCurrentPriceActual">
          {`$${price}`}
        </span>
      </div>
    </div>
  );
};

export default BitcoinTracker;
