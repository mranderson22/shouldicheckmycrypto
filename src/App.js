import React, { Component } from 'react';
import axios from 'axios';
import posed from 'react-pose';
import Loader from 'react-loader-spinner';
import lockbody from '../images/lockbody.png';
import arrows from '../images/arrows.png';
import Dashboard from './Components/dashboard/Dashboard';
import './app.css';

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

const Hover = posed.div({
  idle: { scale: 1 },
  hovered: { scale: 1.3 }
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      answer: false,
      coin: 'BTC',
      coin2: 'ETH',
      dataNew: [],
      dataNew2: [],
      showComponent: false,
      isVisible: false,
      text: '',
      hovering: false
    };
    this.getCoin = this.getCoin.bind(this);
    this.getCoin2 = this.getCoin2.bind(this);
    this.fetchCryptocurrencyData = this.fetchCryptocurrencyData.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

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


  onButtonClick() {
    this.setState({ showComponent: true }, () => {
      this.scrollToBottom();
    });
  }

  setMood() {
    const { dataNew } = this.state;

    if (parseFloat(dataNew[0].percent_change_24h) < -5) {
      this.setState({ text: 'no.' });
    }
    else if (parseFloat(dataNew[0].percent_change_24h) > 5) {
      this.setState({ text: 'yes.' });
      this.setState({ answer: true });
    }
    else if (parseFloat(dataNew[0].percent_change_24h) > 0) {
      this.setState({ text: 'probably' });
      this.setState({ answer: true });
    }
    else if (parseFloat(dataNew[0].percent_change_24h) < 0) {
      this.setState({ text: 'meh' });
    }
  }

  getCoin(coinNew) {
    this.setState({ coin: coinNew }, () => {
      this.fetchCryptocurrencyData(1);
    });
  }

  getCoin2(coinNew) {
    this.setState({ coin2: coinNew }, () => {
      this.fetchCryptocurrencyData(2);
    });
  }

  scrollToBottom() {
    window.scrollBy({
      left: 0,
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }

  fetchCryptocurrencyData(num = 1) {
    const { coin } = this.state;
    const { coin2 } = this.state;
    axios.get('https://api.coinmarketcap.com/v1/ticker/')
      .then((response) => {
        if (num === 1) {
          const wanted = [`${coin}`];
          const result = response.data.filter(currency => wanted.includes(currency.symbol));
          const result2 = response.data;
          this.setState({ dataNew: result });
          this.setState({ data: result2 });
        }
        else if (num === 2) {
          const wanted = [`${coin2}`];
          const result = response.data.filter(currency => wanted.includes(currency.symbol));
          const result2 = response.data;
          this.setState({ dataNew2: result });
          this.setState({ data: result2 });
        }
      });
  }

  render() {
    // React destructuring assignment
    const { data } = this.state;
    const { loading } = this.state;
    const { answer } = this.state;
    const { isVisible } = this.state;
    const { text } = this.state;
    const { dataNew } = this.state;
    const { dataNew2 } = this.state;
    const { showComponent } = this.state;
    const { hovering } = this.state;


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
