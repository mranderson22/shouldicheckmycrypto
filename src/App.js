/* eslint-disable no-console */
import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import * as animations from './animations';
import lockbody from '../images/lockbody.png';
import arrows from '../images/arrows.png';
import Dashboard from './Components/dashboard/Dashboard';
import './app.css';
import 'babel-polyfill';

class App extends Component {
  state = {
    coin1: 'BTC',
    coin2: 'ETH',
    loading: true,
    answer: false,
    isDashboardVisible: false,
    isAnswerBoxVisible: false
  };

  // Initial timeOut for loading screen on mount, while fetching crypto data to
  // determine if answer is "yes" or "no", then sets accordingly.
  async componentDidMount() {
    await this.fetchCryptoData(1);
    await this.fetchCryptoData(2);
    await this.fetchCryptoData(3);
    await setTimeout(() => {
      this.setState(() => ({ loading: false }));
      this.setState(() => ({ isAnswerBoxVisible: 'true' }));
      this.setMood();
    }, 2000);
    setInterval(() => {
      this.fetchCryptoData(3);
    }, 10000);
    await setTimeout(() => {
      this.revealDashboard();
    }, 3300);
  }

  // click function for lock on main screen. First loads dashboard component
  // with "showComponent" then reveals said component.
  onLockClick = () => {
    this.setState(() => ({ isAnswerBoxVisible: false }), () => {
      this.setState(() => ({ isDashboardVisible: true }));
    });
  }

  // determines what main page text displays as "yes" or "no" depending on current %
  // change of Bitcoin. (data was gathered on mount with fetchCryptocurrencyData)
  setMood = () => {
    const { coin1Info } = this.state;
    const change7d = parseFloat(coin1Info.change7d);

    if (change7d <= -5) {
      this.setState(() => ({ text: 'absolutely not.' }));
    }
    else if (change7d >= 5) {
      this.setState(() => ({ text: 'absolutely!', answer: true }));
    }
    else if (change7d >= 0) {
      this.setState(() => ({ text: 'looks good', answer: true }));
    }
    else if (change7d < 0) {
      this.setState(() => ({ text: 'probably not' }));
    }
    else {
      this.setState(() => ({ text: 'try again' }));
    }
  }


  // receiving data from dashboard component and sets the state accordingly in order
  // for the fetchCryptoData function to grab the correct data.
  updateCoin = (num, updatedCoin, curr) => {
    if (num === 1) {
      this.setState(() => ({
        coin1: updatedCoin
      }), () => {
        this.fetchCryptoData(1, curr);
      });
    }
    else if (num === 2) {
      this.setState(() => ({
        coin2: updatedCoin
      }), () => {
        this.fetchCryptoData(2, curr);
      });
    }
  }

  // Waits for yes or no answer on splash page before displaying the Dashboard onMount
  revealDashboard = () => {
    const { answer } = this.state;

    if (answer) {
      this.setState(() => ({ isAnswerBoxVisible: false, isDashboardVisible: true }));
    }
  }

  // Main API call to populate the coinInfo object with the apropriate data
  fetchCryptoData = async (num, curr = 'usd') => {
    const { coin1 } = this.state;
    const { coin2 } = this.state;
    const { isDashboardVisible } = this.state;
    let wanted;
    if (num !== 3) {
      if (num === 1) {
        wanted = coin1.toLowerCase();
      }
      else if (num === 2) {
        wanted = coin2.toLowerCase();
      }
      try {
        const response = await axios(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${curr.toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`);
        const allCoins = response.data;
        const specificCoin = response.data.filter(currency => currency.symbol === wanted);
        const x = specificCoin[0];
        const coin = {
          name: x.name,
          symbol: x.symbol,
          price: x.current_price,
          image: x.image,
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

        const response2 = await axios(`https://api.coingecko.com/api/v3/coins/${specificCoin[0].id.toLowerCase()}`);
        coin.description = response2.data.description.en;
        [coin.homepage] = response2.data.links.homepage;
        coin.twitter_handle = response2.data.links.twitter_screen_name;
        coin.facebook_username = response2.data.links.facebook_username;
        coin.subreddit = response2.data.links.subreddit_url;
        [coin.github] = response2.data.links.repos_url.github;

        if (num === 1) {
          this.setState(() => ({ coin1Info: coin, allCoins }), () => {
            if (isDashboardVisible) {
              const bgImage = document.getElementById('cryptoImageBackgroundgraph1');
              const bgImageChartInfo = document.getElementById('cryptoImageBackgroundChartInfograph1');
              const element2 = document.getElementById('NoChartActual graph1');
              const element3 = document.getElementById('coinInfo graph1');
              const graphPrice = document.getElementById('graphPricegraph1');
              const spinner = document.getElementById('spinner');
              const spinner2 = document.getElementById('spinner2');
              setTimeout(() => {
                graphPrice.classList.remove('flash');
                bgImageChartInfo.classList.remove('fade');
                bgImage.classList.remove('fade');
                element2.classList.remove('flash');
                element3.classList.remove('flash');
                if (spinner) {
                  spinner.classList.add('flash');
                }
                if (spinner2) {
                  spinner2.classList.add('flash');
                }
              }, 0);
            }
          });
        }
        else if (num === 2) {
          this.setState(() => ({ coin2Info: coin, allCoins }), () => {
            if (isDashboardVisible) {
              const bgImage2 = document.getElementById('cryptoImageBackgroundgraph2');
              const bgImageChartInfo2 = document.getElementById('cryptoImageBackgroundChartInfograph2');
              const element4 = document.getElementById('NoChartActual graph2');
              const element5 = document.getElementById('coinInfo graph2');
              const graphPrice2 = document.getElementById('graphPricegraph2');
              const spinner = document.getElementById('spinner');
              const spinner2 = document.getElementById('spinner2');
              setTimeout(() => {
                graphPrice2.classList.remove('flash');
                bgImageChartInfo2.classList.remove('fade');
                bgImage2.classList.remove('fade');
                element4.classList.remove('flash');
                element5.classList.remove('flash');
                if (spinner) {
                  spinner.classList.add('flash');
                }
                if (spinner2) {
                  spinner2.classList.add('flash');
                }
              }, 0);
            }
          });
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
      loading, answer, isAnswerBoxVisible, text, coin1Info, coin2Info, allCoins,
      isDashboardVisible, currentBTCPrice
    } = this.state;

    return (
      <div>
        <animations.Reveal3
          className="shouldIHeader"
          pose={isDashboardVisible ? 'hidden' : 'visible'}
        >
          <span>
            {'Should I check my crypto?'}
          </span>
        </animations.Reveal3>
        <div className="answerBackground">
          <div className="answerWrapper">
            {loading ? (
              <div className="spinner">
                <Loader type="Oval" color="#dfe2e680" height={120} width={120} />
              </div>
            ) : null}
            <h1 className="answerBox">
              <animations.Reveal pose={isAnswerBoxVisible ? 'visible' : 'hidden'} className="animations_reveal">
                {text}
              </animations.Reveal>
            </h1>
            {
          answer === true ? null : (
            <div className="lockbody">
              <div
                onClick={this.onLockClick}
                onKeyDown={this.onLockClick}
                role="button"
                tabIndex={0}
              >
                <animations.Reveal2 pose={isAnswerBoxVisible ? 'visible' : 'hidden'} className="animations_reveal2">
                  <div>
                    {answer ? null : (<img className="lockImage" alt="" src={lockbody} />)}
                  </div>
                </animations.Reveal2>
              </div>
            </div>)
        }
          </div>
          <div>
            {isDashboardVisible ? (
              <Dashboard
                sendCoin={this.updateCoin}
                fetchData={this.fetchCryptoData}
                answer={answer}
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
      </div>
    );
  }
}


export default App;
