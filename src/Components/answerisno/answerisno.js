import React, { Component } from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import axios from 'axios';
import './Answerisno.css';
import lockbody from '../../../images/lockbody.png';
import arrows from '../../../images/arrows.png';
import Nodashboard from '../nodashboard/Nodashboard';

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

class Answerisno extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coin: 'BTC',
      dataNew: [],
      showComponent: false,
      isVisible: false,
      text: '',
      hovering: false
    };
    this.getCoin = this.getCoin.bind(this);
    this.fetchCryptocurrencyData = this.fetchCryptocurrencyData.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  componentDidMount() {
    this.fetchCryptocurrencyData();
    this.setMood();
    this.setState({ isVisible: 'true' });
  }

  onButtonClick() {
    this.setState({ showComponent: true }, () => {
      this.scrollToBottom();
    });
  }

  setMood() {
    const { data } = this.props;

    if (parseInt(data[0].percent_change_24h) < -5) {
      this.setState({ text: 'no.' });
    }
    else if (parseInt(data[0].percent_change_24h) > 5) {
      this.setState({ text: 'yes.' });
    }
    else if (parseInt(data[0].percent_change_24h) > 0) {
      this.setState({ text: 'probably' });
    }
    else if (parseInt(data[0].percent_change_24h) < 0) {
      this.setState({ text: 'meh' });
    }
  }

  getCoin(coinNew) {
    this.setState({ coin: coinNew }, () => {
      this.fetchCryptocurrencyData();
    });
  }

  scrollToBottom() {
    window.scrollBy({
      left: 0,
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }

  fetchCryptocurrencyData() {
    const { coin } = this.state;

    axios.get('https://api.coinmarketcap.com/v1/ticker/')
      .then((response) => {
        const wanted = [`${coin}`];
        const result = response.data.filter(currency => wanted.includes(currency.symbol));
        this.setState({ dataNew: result });
      });
  }

  render() {
    const { answer } = this.props;
    const { data } = this.props;
    const { isVisible } = this.state;
    const { text } = this.state;
    const { dataNew } = this.state;
    const { showComponent } = this.state;
    const { hovering } = this.state;


    return (
      <div className="Answernobackground">
        <div className={`Answerno${answer ? 'yes' : 'no'}`}>
          <div className="Answerboxno">
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
            <Nodashboard
              fetchCryptocurrencyData={this.fetchCryptocurrencyData}
              dataNew={dataNew}
              data={data}
              sendCoin={this.getCoin}
              answer={answer}
            />
          )
            : null
          }
        </div>
      </div>
    );
  }
}


Answerisno.propTypes = {
  data: PropTypes.array,
  answer: PropTypes.bool
};

Answerisno.defaultProps = {
  data: 'data',
  answer: 'answer'
};


export default Answerisno;
