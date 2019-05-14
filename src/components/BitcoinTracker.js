import React from 'react';
import PropTypes from 'prop-types';

const BitcoinTracker = ({ currentBTCPrice, answer, handleExternalComponentSubmit }) => {
  const price = parseFloat(currentBTCPrice).toFixed(2);
  return (
    <div
      className={answer === true ? 'col-sm-2 bitcoinTracker yesBackgroundColor'
        : 'col-sm-2 bitcoinTracker noBackgroundColor'
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
      <div className="bitcoinTracker__Info">
        <span className="bitcoinTracker__Info-Legend">
          {'1 BTC = '}
        </span>
        <img alt="" className="bitcoinTracker__Info-Image" src="https://www.cryptocompare.com//media/19633/btc.png" />
        <span className="bitcoinTracker__Info-Price">
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
