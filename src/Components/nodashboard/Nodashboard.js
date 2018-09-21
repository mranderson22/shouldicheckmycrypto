import React, { Component } from 'react';
import './Nodashboard.css';
import 'react-moment';
import axios from 'axios';
import posed from 'react-pose';
import { Button, Container, Row } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import moment from 'moment';
import plus from '../../../images/plus-button.png';

const Hover = posed.div({
  idle: { scale: 1 },
  hovered: { scale: 1.3 }
});

const Reveal = posed.div({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 500 },
    delay: 400
  }
});

const Reveal2 = posed.div({
  hidden: {
    opacity: 0,
    scale: 0
  },
  visible: {
    scale: 1,
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

const Resize = posed.div({
  initial: {
    width: '75vw',
    left: '50%'
  },
  resized: {
    width: '45vw',
    left: '26%'
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
          backgroundColor: 'black',
          borderColor: 'black',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'black',
          pointBackgroundColor: 'black',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
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
      (pos).time = moment.unix(time).format('MMMM DD');
    });
    historysixty.forEach((pos) => {
      const { time } = pos;
      (pos).time = moment.unix(time).format('MMMM DD');
    });
    historyninety.forEach((pos) => {
      const { time } = pos;
      (pos).time = moment.unix(time).format('MMMM DD');
    });
  }

  addGraph() {
    this.setState({ freshReveal: true }, () => {
      this.setState({ secondGraphVisible: true });
    });
  }


  render() {
    const { isEnabled } = this.state;
    const { freshReveal } = this.state;
    const { hovering } = this.state;
    const { secondGraphVisible } = this.state;
    const { isGraphVisible } = this.state;
    const { dataNew } = this.props;
    const { graphData } = this.state;
    const { name } = dataNew[0];
    const currentPrice = parseFloat(dataNew[0].price_usd).toFixed(2);
    const { rank } = dataNew[0];
    const seven = dataNew[0].percent_change_7d;
    const { cryptoImage } = this.state;
    const Image = `https://www.cryptocompare.com/${cryptoImage}`;


    return (
      <div id="dashboard" className="Nodashboardcontainer">
        <div className="Nodashboard">
          <Container>
            <Row>
              <Reveal pose={isGraphVisible ? 'visible' : 'hidden'}>
                <Resize className="NoGraph" pose={freshReveal ? 'resized' : 'initial'}>
                  <div className="Nochartheader">
                    <img alt="" className="cryptoImage" src={Image} />
                    <div className="name">
                      { name }
                    </div>
                    <p>
                      { `Rank: ${rank}` }
                      { ' \u00A0 '}
                      { `Current Price: $${currentPrice}` }
                      { ' \u00A0 ' }
                      { `Last 7 Days: ${seven}%` }
                    </p>
                  </div>
                  <div className="NoChartActual">
                    <Line
                      data={graphData}
                      maintainAspectRatio={false}
                      options={{
                        legend: {
                          display: false
                        },
                        tooltips: {
                          displayColors: false
                        },
                        scales: {
                          yAxes: [{
                            ticks: {
                              fontColor: 'black'
                            }
                          }],
                          xAxes: [{
                            ticks: {
                              maxTicksLimit: 15,
                              fontColor: 'black'
                            }
                          }]
                        }
                      }}
                    />
                  </div>

                  <div className="daysselector">
                    <Button
                      color="primary"
                      onClick={() => {
                        this.onHistoryChange(30);
                      }
                    }
                    >
                      { 30 }
                    </Button>
                    { ' \u00A0 '}
                    { ' \u00A0 '}
                    <Button
                      color="primary"
                      onClick={() => {
                        this.onHistoryChange(60);
                      }
                    }
                    >
                      { 60 }
                    </Button>
                    { ' \u00A0 '}
                    { ' \u00A0 '}
                    <Button
                      color="primary"
                      onClick={() => {
                        this.onHistoryChange(90);
                      }
                    }
                    >
                      { 90 }
                    </Button>
                  </div>
                </Resize>
              </Reveal>
              <div>
                {freshReveal ? (
                  <Reveal3 className="NoGraphNew" pose={secondGraphVisible ? 'visible' : 'hidden'}>
                    <div className="Nochartheader">
                      <img alt="" className="cryptoImage" src={Image} />
                      <div className="name">
                        { name }
                      </div>
                      <p>
                        { `Rank: ${rank}` }
                        { ' \u00A0 '}
                        { `Current Price: $${currentPrice}` }
                        { ' \u00A0 ' }
                        { `Last 7 Days: ${seven}%` }
                      </p>
                    </div>

                    <div className="NoChartActual">
                      <Line
                        data={graphData}
                        responsive="false"
                        maintainAspectRatio="false"
                        options={{
                          legend: {
                            display: false
                          },
                          tooltips: {
                            displayColors: false
                          },
                          scales: {
                            yAxes: [{
                              ticks: {
                                fontColor: 'black'
                              }
                            }],
                            xAxes: [{
                              ticks: {
                                maxTicksLimit: 15,
                                fontColor: 'black'
                              }
                            }]
                          }
                        }}
                      />
                    </div>

                    <div className="daysselector">
                      <Button
                        color="primary"
                        onClick={() => {
                          this.onHistoryChange(30);
                        }
                      }
                      >
                        { 30 }
                      </Button>
                      { ' \u00A0 '}
                      { ' \u00A0 '}
                      <Button
                        color="primary"
                        onClick={() => {
                          this.onHistoryChange(60);
                        }
                      }
                      >
                        { 60 }
                      </Button>
                      { ' \u00A0 '}
                      { ' \u00A0 '}
                      <Button
                        color="primary"
                        onClick={() => {
                          this.onHistoryChange(90);
                        }
                      }
                      >
                        { 90 }
                      </Button>
                    </div>
                  </Reveal3>
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
                  <form onSubmit={this.handleSubmit}>
                    <label htmlFor="Name">
                      { 'Symbol:' }
                      <input type="text" onChange={this.handleChange} />
                    </label>
                    <input disabled={!isEnabled} type="submit" value="Submit" />
                  </form>
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
  dataNew: PropTypes.array

};

Nodashboard.defaultProps = {
  data: 'data',
  sendCoin: 'sendCoin',
  dataNew: 'dataNew'

};

export default Nodashboard;
