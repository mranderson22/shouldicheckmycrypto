import React, { Component } from 'react';
import './BitcoinTracker.css';

class BitcoinTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentBTCPrice } = this.props;
    const price = parseFloat(currentBTCPrice).toFixed(2);
    return (
        <div className="bitcoinCurrentPrice">
          <img alt="" className="currentBTCImage" src="https://www.cryptocompare.com//media/19633/btc.png" />
          $
          {price}
        </div>
    );
  }
}
export default BitcoinTracker;
