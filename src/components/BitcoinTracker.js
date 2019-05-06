import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/_bitcoinTracker.scss';

const BitcoinTracker = ({ currentBTCPrice, answer, handleExternalComponentSubmit }) => {
  const price = parseFloat(currentBTCPrice).toFixed(2);
  return (
    <div
      className={answer === true ? 'col-sm-2 bitcoinTrackerWrapper yesBackgroundColor'
        : 'col-sm-2 bitcoinTrackerWrapper noBackgroundColor'
      }
      onClick={(e) => {
        handleExternalComponentSubmit(e, 'BTC');
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

BitcoinTracker.propTypes = {
  currentBTCPrice: PropTypes.number,
  answer: PropTypes.bool,
  handleExternalComponentSubmit: PropTypes.func
};

BitcoinTracker.defaultProps = {
  currentBTCPrice: PropTypes.number,
  answer: PropTypes.bool,
  handleExternalComponentSubmit: PropTypes.func
};
