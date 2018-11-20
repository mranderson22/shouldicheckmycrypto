import React, { Component } from 'react';
import axios from 'axios';
import posed from 'react-pose';
import Loader from 'react-loader-spinner';
import lockbody from '../images/lockbody.png';
import arrows from '../images/arrows.png';
import Dashboard from './Components/dashboard/Dashboard';
import './app.css';

// Reveal "yes" or "no" animation
const Reveal = posed.div({
  hidden: {
    opacity: 0,
    x: 0,
    y: -10
  },
  visible: {
    opacity: 1,
    transition: { duration: 1000 },
    x: 0,
    y: 0
  }
});

// Reveal lock or arrows on main page animation
const Reveal2 = posed.div({
  hidden: {
    opacity: 0,
    x: 0,
    y: 10
  },
  visible: {
    opacity: 1,
    transition: { duration: 1000 },
    x: 0,
    y: 0,
    delay: 200
  }
});

// hover animation for lock or arrows
const Hover = posed.div({
  idle: { scale: 1 },
  hovered: { scale: 1.3 }
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'BTC',
      value2: 'ETH',
      coin: 'BTC',
      coin2: 'ETH',
      loading: true,
      answer: false,
      showComponent: false,
      isVisible: false,
      hovering: false
    };
    this.getCoin = this.getCoin.bind(this);
    this.fetchCryptocurrencyData = this.fetchCryptocurrencyData.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  // Initial timeOut for loading screen on mount, while fetching crypto data to
  // determine if answer is "yes" or "no", then sets accordingly.
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false }, () => {
        this.setMood();
        this.setState({ isVisible: 'true' });
      });
    }, 2000);
    this.fetchCryptocurrencyData(1);
    this.fetchCryptocurrencyData(2);
  }

  // click function for lock or arrow on main screen. First loads dashboard component
  // with "showComponent" then scrolls to said component.
  onButtonClick() {
    this.setState({ showComponent: true }, () => {
      this.scrollToBottom();
    });
  }

  // determines what main page text displays as "yes" or "no" depending on current %
  // change of Bitcoin. (data was gathered on mount with fetchCryptocurrencyData)
  setMood() {
    const { dataNew } = this.state;
    const data = dataNew[0].percent_change_24h;

    if (parseFloat(data) <= -5) {
      this.setState({ text: 'absolutely not.' });
    }
    else if (parseFloat(data) >= 5) {
      this.setState({ text: 'rejoice!' });
      this.setState({ answer: true });
    }
    else if (parseFloat(data) >= 0) {
      this.setState({ text: 'probably' });
      this.setState({ answer: true });
    }
    else if (parseFloat(data) < 0) {
      this.setState({ text: 'if you must' });
    }
  }

  // receiving data from dashboard component and sets the state accordingly in order
  // for the fetchCryptocurrencyData function to grab the correct data.
  getCoin(num, coinNew) {
    if (num === 1) {
      this.setState({ coin: coinNew }, () => {
        this.fetchCryptocurrencyData(1);
      });
    }
    else if (num === 2) {
      this.setState({ coin2: coinNew }, () => {
        this.fetchCryptocurrencyData(2);
      });
    }
  }

  scrollToBottom() {
    window.scrollBy({
      left: 0,
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }

  // Fetches main data for all coins, as well as specific coin that the user inputs.
  // Then retrieves id from api so it can convert all info to BTC via converToBTC().
  fetchCryptocurrencyData(num = 1) {
    const { coin } = this.state;
    const { coin2 } = this.state;
    let wanted;
    if (num === 1) {
      wanted = coin;
    }
    else {
      wanted = coin2;
    }
    axios.all([
      axios.get('https://api.coinmarketcap.com/v1/ticker/'),
      axios.get('https://api.coinmarketcap.com/v2/listings/')
    ])
      .then(axios.spread((response, response2) => {
        const result = response.data.filter(currency => wanted.includes(currency.symbol));
        const result1 = response2.data.data.filter(currency => wanted.includes(currency.symbol));
        const result2 = response.data;
        if (num === 1) {
          this.setState({ dataNew: result, dataToBTCid: result1, data: result2 }, () => {
            this.convertToBTC(1);
          });
        }
        else if (num === 2) {
          this.setState({ dataNew2: result, dataToBTCid2: result1, data: result2 }, () => {
            this.convertToBTC(2);
          });
        }
      }));
  }

  // Separate api call to retrieve all information converted from USD to BTC for
  // USD/BTC toggle button on graph.
  convertToBTC(num = 1) {
    const { dataToBTCid } = this.state;
    const { dataToBTCid2 } = this.state;
    let wanted;
    if (num === 1) {
      wanted = dataToBTCid[0].id;
    }
    else {
      wanted = dataToBTCid2[0].id;
    }
    axios.get(`https://api.coinmarketcap.com/v2/ticker/${wanted}/?convert=BTC`)
      .then(((response3) => {
        const result3 = response3.data.data.quotes.BTC;
        if (num === 1) {
          this.setState({ dataToBTC: result3 });
        }
        else {
          this.setState({ dataToBTC2: result3 });
        }
      }));
  }

  // Grabs the image URL data for specific coin
  fetchCryptocurrencyImage(num = 1) {
    const { value } = this.state;
    const { value2 } = this.state;
    const { cryptoImage } = this.state;
    const { cryptoImage2 } = this.state;
    let wanted;
    if (num === 1) {
      wanted = value;
    }
    else {
      wanted = value2;
    }
    axios.get(`https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${wanted}&tsym=USD`)
      .then((response) => {
        if (num === 1) {
          const cryptoImageData = response.data.Data[0].CoinInfo.ImageUrl;
          cryptoImage.unshift(cryptoImageData);
        }
        else if (num === 2) {
          const cryptoImage2Data = response.data.Data[0].CoinInfo.ImageUrl;
          cryptoImage2.unshift(cryptoImage2Data);
        }
      });
    this.setState({ cryptoImage });
  }

  render() {
    const {
      data, loading, answer, isVisible, text,
      dataNew, dataNew2, showComponent, hovering, dataToBTC, dataToBTC2
    } = this.state;


    if ((loading) === true) {
      return (
        <div className="spinnercontainer">
          <div className="spinner">
            <Loader type="Ball-Triangle" color="white" height={120} width={120} />
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="Answernobackground">
          <div className={`Answerno${answer ? 'yes' : 'no'}`}>
            <div className={`Answerbox${answer ? 'yes' : 'no'}`}>
              <Reveal pose={isVisible ? 'visible' : 'hidden'}>
                {text}
              </Reveal>
            </div>
            <Hover
              className="lockbody"
              pose={hovering ? 'hovered' : 'idle'}
              onMouseEnter={() => this.setState({ hovering: true })}
              onMouseLeave={() => this.setState({ hovering: false })}
            >
              <div
                onClick={this.onButtonClick}
                onKeyDown={this.onButtonClick}
                role="button"
                tabIndex={0}
              >
                <Reveal2 pose={isVisible ? 'visible' : 'hidden'}>
                  <div>
                    {answer ? (<img className="downArrows" alt="" src={arrows} />) : (<img className="lockImage" alt="" src={lockbody} />)}
                  </div>
                </Reveal2>
              </div>
            </Hover>
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
                sendCoin={this.getCoin}
                sendCoin2={this.getCoin2}
                answer={answer}
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
