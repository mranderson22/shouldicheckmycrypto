/* eslint-disable no-console */
import React, { Component } from 'react';
import axios from 'axios';
import * as animations from './animations';
import Loader from 'react-loader-spinner';
import lockbody from '../images/lockbody.png';
import arrows from '../images/arrows.png';
import Dashboard from './Components/dashboard/Dashboard';
import './app.css';
import 'babel-polyfill';

class App extends Component {
  state = {
    topList: [],
    coin: 'BTC',
    coin2: 'ETH',
    loading: true,
    answer: false,
    showComponent: false,
    isVisible: false,
    hovering: false
  };

  // Initial timeOut for loading screen on mount, while fetching crypto data to
  // determine if answer is "yes" or "no", then sets accordingly.
  componentDidMount() {
    this.fetchCryptoData(1);
    this.fetchCryptoData(2);
    this.fetchCryptoData(3);
    // this.fetchCryptocurrencyData(1);
    // this.fetchCryptocurrencyData(2);
    setTimeout(() => {
      this.setState(() => ({ loading: false }));
      this.setState(() => ({ isVisible: 'true' }));
      this.setMood();
    }, 2000);
    setInterval(() => {
      this.fetchCryptoData(3);
    }, 10000);
    setTimeout(() => {
      this.revealDashboard();
    }, 3300);
  }

  // click function for lock or arrow on main screen. First loads dashboard component
  // with "showComponent" then scrolls to said component.
  onButtonClick = () => {
    this.setState(() => ({ isVisible: false }));
    this.setState(() => ({ showComponent: true }));
  }

  // determines what main page text displays as "yes" or "no" depending on current %
  // change of Bitcoin. (data was gathered on mount with fetchCryptocurrencyData)
  setMood = () => {
    const { coin1Info } = this.state;
    const data = coin1Info.change24h;

    if (parseFloat(data) <= -5) {
      this.setState(() => ({ text: 'absolutely not.' }));
    }
    else if (parseFloat(data) >= 5) {
      this.setState(() => ({ text: 'absolutely!', answer: true }));
    }
    else if (parseFloat(data) >= 0) {
      this.setState(() => ({ text: 'looks good', answer: true }));
    }
    else if (parseFloat(data) < 0) {
      this.setState(() => ({ text: 'probably not' }));
    }
  }

  // receiving data from dashboard component and sets the state accordingly in order
  // for the fetchCryptocurrencyData function to grab the correct data.
  updateCoin = (num, coinNew, curr) => {
    const { allCoins } = this.state;
    const index = allCoins.findIndex(coin => coin.id === coinNew.toString().toLowerCase());
    if (index === -1) {
      if (num === 1) {
        this.setState(() => ({
          value: coinNew,
          coin: coinNew
        }), () => {
          this.fetchCryptoData(1, curr);
        });
      }
      else if (num === 2) {
        this.setState(() => ({
          value2: coinNew,
          coin2: coinNew
        }), () => {
          this.fetchCryptoData(2, curr);
        });
      }
    }
    else if (index !== -1) {
      const symbol = allCoins[index].symbol.toString().toLowerCase();
      if (num === 1) {
        this.setState(() => ({
          value: symbol,
          coin: symbol
        }), () => {
          this.fetchCryptoData(1, curr);
        });
      }
      else if (num === 2) {
        this.setState(() => ({
          value2: symbol,
          coin2: symbol
        }), () => {
          this.fetchCryptoData(2, curr);
        });
      }
    }
  }

  revealDashboard = () => {
    const { answer } = this.state;
    if (answer) {
      this.setState(() => ({ isVisible: false, showComponent: true }));
    }
  }

  fetchCryptoData = async (num, curr = 'usd') => {
    const { coin } = this.state;
    const { coin2 } = this.state;
    let wanted;
    if (num !== 3) {
      if (num === 1) {
        wanted = coin.toLowerCase();
      }
      else if (num === 2) {
        wanted = coin2.toLowerCase();
      }
      try {
        const response = await axios(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${curr.toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`);
        const allCoins = response.data;
        const specificCoin = response.data.filter(currency => currency.symbol === wanted);
        const x = specificCoin[0];
        const coin1 = {
          name: x.name,
          symbol: x.symbol,
          image: x.image,
          price: x.current_price,
          rank: x.market_cap_rank,
          mktCap: parseFloat(x.market_cap).toFixed(2),
          high24: parseFloat(x.high_24h).toFixed(2),
          low24: parseFloat(x.low_24h).toFixed(2),
          change1h: parseFloat(x.price_change_percentage_1h_in_currency).toFixed(2),
          change24h: parseFloat(x.price_change_percentage_24h_in_currency).toFixed(2),
          change7d: parseFloat(x.price_change_percentage_7d_in_currency).toFixed(2),
          ath: parseFloat(x.ath).toFixed(2),
          athChange: parseFloat(x.ath_change_percentage).toFixed(2),
          athDate: x.ath_date
        };
        if (num === 1) {
          this.setState(() => ({ coin1Info: coin1, allCoins }));
        }
        else if (num === 2) {
          this.setState(() => ({ coin2Info: coin1, allCoins }));
        }
      }
      catch (error) {
        console.log('cannot get data!');
      }
    }
    else if (num === 3) {
      const response2 = await axios('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const result = response2.data.bitcoin.usd;
      this.setState(() => ({ currentBTCPrice: result }));
    }
  };

  render() {
    const {
      data, loading, answer, isVisible, text, coin1Info, coin2Info, allCoins,
      dataNew, dataNew2, showComponent, hovering, dataToBTC, dataToBTC2, topList, currentBTCPrice
    } = this.state;


    if ((loading) === true) {
      return (
        <div className="spinnercontainer">
          <div className="spinner">
            <Loader type="Oval" color="#dfe2e680" height={120} width={120} />
          </div>
        </div>
      );
    }

    return (
      <div className="Answernobackground">
        <div className={`Answerno${answer ? 'yes' : 'no'}`}>
          <div className={`Answerbox${answer ? 'yes' : 'no'}`}>
            <animations.Reveal pose={isVisible ? 'visible' : 'hidden'}>
              {text}
            </animations.Reveal>
          </div>
          {
            answer === true ? null : (
              <animations.Hover
                className="lockbody"
                pose={hovering ? 'hovered' : 'idle'}
                onMouseEnter={() => this.setState(() => ({ hovering: true }))}
                onMouseLeave={() => this.setState(() => ({ hovering: false }))}
              >
                <div
                  onClick={this.onButtonClick}
                  onKeyDown={this.onButtonClick}
                  role="button"
                  tabIndex={0}
                >
                  <animations.Reveal2 pose={isVisible ? 'visible' : 'hidden'}>
                    <div>
                      {answer ? (<img className="downArrows" alt="" src={arrows} />) : (<img className="lockImage" alt="" src={lockbody} />)}
                    </div>
                  </animations.Reveal2>
                </div>
              </animations.Hover>)
          }
        </div>
        <div>
          {showComponent ? (
            <Dashboard
              fetchCryptocurrencyData={this.fetchCryptocurrencyData}
              dataNew={dataNew}
              dataNew2={dataNew2}
              dataToBTC={dataToBTC}
              dataToBTC2={dataToBTC2}
              data={data}
              sendCoin={this.updateCoin}
              sendCoin2={this.updateCoin2}
              fetchData={this.fetchCryptoData}
              answer={answer}
              topList={topList}
              currentBTCPrice={currentBTCPrice}
              coin1Info={coin1Info}
              coin2Info={coin2Info}
              allCoins={allCoins}
            />
          )
            : null
          }
        </div>
      </div>
    );
  }
}


export default App;
