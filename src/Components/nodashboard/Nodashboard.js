import React, { Component } from 'react';
import './Nodashboard.css';
import 'react-moment';
import axios from 'axios';
import posed from 'react-pose';
import {
  Container, Row
}
  from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import Graph from '../graph/Graph';
import GraphNew from '../graphNew/GraphNew';
import plus from '../../../images/plus-button.png';

const Hover = posed.div({
  idle: { scale: 1 },
  hovered: { scale: 1.3 }
});

const Reveal2 = posed.div({
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: { duration: 500 },
    delay: 600
  }
});

const Reveal3 = posed.div({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 500 },
    delay: 200
  }
});


class Nodashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEnabled: false,
      value: 'BTC',
      historythirty: [],
      historysixty: [],
      historyninety: [],
      freshReveal: false,
      hovering: false,
      secondGraphVisible: false,
      isGraphVisible: false,
      cryptoImage: [],
      history: [],
      graphData: {
        labels: [],
        datasets: [
          {
            data: []
          }
        ]
      }
    };
    this.onHistoryChange = this.onHistoryChange.bind(this);
    this.findSymbol = this.findSymbol.bind(this);
    this.addGraph = this.addGraph.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchCryptocurrencyHistory();
  }

  componentWillMount() {
    this.fetchCryptocurrencyImage();
  }

  componentDidMount() {
    const { isGraphVisible } = this.state;
    this.getPoints();
    this.setState({ isGraphVisible: !isGraphVisible });
  }


  onHistoryChange(num) {
    const { historythirty } = this.state;
    const { historysixty } = this.state;
    const { historyninety } = this.state;
    if (num === 30) {
      this.setState({ history: historythirty }, () => {
        this.getPoints();
      });
    }
    else if (num === 60) {
      this.setState({ history: historysixty }, () => {
        this.getPoints();
      });
    }
    else {
      this.setState({ history: historyninety }, () => {
        this.getPoints();
      });
    }
  }

  getPoints() {
    // Remove table point data
    const newGraphData = {
      history: [],
      labels: [],
      datasets: [
        {
          data: [],
          label: 'Closing Price',
          responsive: true,
          fill: false,
          lineTension: 0,
          backgroundColor: '#dad7d7',
          borderColor: '#dad7d7',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#dad7d7',
          pointBackgroundColor: '#dad7d7',
          pointBorderWidth: 1,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: 'black',
          pointHoverBorderColor: 'black',
          pointHoverBorderWidth: 3,
          pointRadius: 2,
          pointHitRadius: 10
        }
      ]
    };

    const { history } = this.state;

    for (let historyIndex = 0; historyIndex < history.length; historyIndex++) {
      const label = history[historyIndex].time;
      const labeldata = history[historyIndex].close;

      newGraphData.labels.push(label);
      newGraphData.datasets[0].data.push(labeldata);
    }
    this.setState({ graphData: newGraphData });
  }

  fetchCryptocurrencyHistory() {
    const { value } = this.state;
    axios.all([
      axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${value}&tsym=USD&limit=30`),
      axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${value}&tsym=USD&limit=60`),
      axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${value}&tsym=USD&limit=90`)
    ])
      .then(axios.spread((responsethirty, responsesixty, responseninety) => {
        const historythirty = responsethirty.data.Data;
        const historysixty = responsesixty.data.Data;
        const historyninety = responseninety.data.Data;
        this.setState({ historythirty, historysixty, historyninety });
        this.formatDate();
        this.onHistoryChange(30);
      }));
  }


  handleChange(event) {
    this.setState({ value: event.target.value });
    this.setState({ coin: event.target.value });
    if (event.target.value !== '') {
      this.setState({ isEnabled: true });
      return true;
    }
    return false;
  }

  handleSubmit(event) {
    this.findSymbol();
    event.preventDefault();
  }

  findSymbol() {
    const { sendCoin } = this.props;
    const { coin } = this.state;
    const { data } = this.props;
    const { value } = this.state;
    let hits = false;
    data.forEach((coins) => {
      if (!hits) {
        if (coins.symbol === value) {
          sendCoin(coin);
          this.fetchCryptocurrencyHistory();
          this.fetchCryptocurrencyImage();
          this.getPoints();
          hits = true;
        }
        else {
          return false;
        }
      }
    });
  }

  fetchCryptocurrencyImage() {
    const { value } = this.state;
    axios.get(`https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${value}&tsym=USD`)
      .then((response) => {
        const cryptoImage = response.data.Data[0].CoinInfo.ImageUrl;
        this.setState({ cryptoImage });
      });
  }

  formatDate() {
    const { historythirty } = this.state;
    const { historysixty } = this.state;
    const { historyninety } = this.state;
    historythirty.forEach((pos) => {
      const { time } = pos;
      (pos).time = moment.unix(time).format('MMM DD');
    });
    historysixty.forEach((pos) => {
      const { time } = pos;
      (pos).time = moment.unix(time).format('MMM DD');
    });
    historyninety.forEach((pos) => {
      const { time } = pos;
      (pos).time = moment.unix(time).format('MMM DD');
    });
  }

  addGraph() {
    this.setState({ freshReveal: true }, () => {
      this.setState({ secondGraphVisible: true });
    });
  }


  render() {
    const { answer } = this.props;
    const { isEnabled } = this.state;
    const { freshReveal } = this.state;
    const { hovering } = this.state;
    const { secondGraphVisible } = this.state;
    const { isGraphVisible } = this.state;
    const { dataNew } = this.props;
    const { graphData } = this.state;
    const { cryptoImage } = this.state;


    return (
      <div id="dashboard" className="Nodashboardcontainer">
        <div className={`${answer ? 'Yes' : 'No'}dashboard`}>
          <Container>
            <Row>
              <Graph
                dataNew={dataNew}
                graphData={graphData}
                isGraphVisible={isGraphVisible}
                isEnabled={isEnabled}
                freshReveal={freshReveal}
                cryptoImage={cryptoImage}
                onHistoryChange={this.onHistoryChange}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                answer={answer}
              />

              <div>
                {freshReveal ? (
                  <GraphNew
                    isEnabled={isEnabled}
                    dataNew={dataNew}
                    graphData={graphData}
                    isGraphVisible={isGraphVisible}
                    freshReveal={freshReveal}
                    cryptoImage={cryptoImage}
                    secondGraphVisible={secondGraphVisible}
                    onHistoryChange={this.onHistoryChange}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    answer={answer}
                  />
                ) : null
              }
              </div>
              <div className="imageContainer">
                <Reveal2 pose={isGraphVisible ? 'visible' : 'hidden'}>
                  <Reveal3 pose={secondGraphVisible ? 'hidden' : 'visible'}>
                    <div className="plus">
                      <Hover
                        pose={hovering ? 'hovered' : 'idle'}
                        onMouseEnter={() => this.setState({ hovering: true })}
                        onMouseLeave={() => this.setState({ hovering: false })}
                      >
                        <div
                          onClick={this.addGraph}
                          onKeyDown={this.addGraph}
                          role="button"
                          tabIndex={0}
                        >
                          <img alt="" src={plus} />
                        </div>
                      </Hover>
                    </div>
                  </Reveal3>
                </Reveal2>
              </div>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}


Nodashboard.propTypes = {
  data: PropTypes.array,
  sendCoin: PropTypes.func,
  dataNew: PropTypes.array,
  answer: PropTypes.bool

};

Nodashboard.defaultProps = {
  data: 'data',
  sendCoin: 'sendCoin',
  dataNew: 'dataNew',
  answer: 'answer'

};

export default Nodashboard;
