import React, { Component } from 'react';
import './dashboard.css';
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

const Reveal = posed.div({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 500 },
    delay: 600
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


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEnabled: false,
      isEnabled2: false,
      value: 'BTC',
      value2: 'ETH',
      historythirty: [],
      historysixty: [],
      historyninety: [],
      historythirty2: [],
      historysixty2: [],
      historyninety2: [],
      freshReveal: false,
      hovering: false,
      secondGraphVisible: false,
      isGraphVisible: false,
      cryptoImage: [],
      cryptoImage2: [],
      history: [],
      history2: [],
      graphData: {
        labels: [],
        datasets: [
          {
            data: []
          }
        ]
      },
      graphData2: {
        labels: [],
        datasets: [
          {
            data: []
          }
        ]
      }
    };
    this.onHistoryChange = this.onHistoryChange.bind(this);
    this.onHistoryChange2 = this.onHistoryChange2.bind(this);
    this.findSymbol = this.findSymbol.bind(this);
    this.addGraph = this.addGraph.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
  }

  componentDidMount() {
    const { isGraphVisible } = this.state;
    this.fetchCryptocurrencyHistory(1);
    this.fetchCryptocurrencyHistory(2);
    this.fetchCryptocurrencyImage(1);
    this.fetchCryptocurrencyImage(2);
    this.getPoints(1);
    this.getPoints(2);
    this.setState({ isGraphVisible: !isGraphVisible });
  }


  onHistoryChange(num = 30) {
    const { historythirty } = this.state;
    const { historysixty } = this.state;
    const { historyninety } = this.state;

    if (num === 30) {
      this.setState({ history: historythirty }, () => {
        this.getPoints(1);
      });
    }
    else if (num === 60) {
      this.setState({ history: historysixty }, () => {
        this.getPoints(1);
      });
    }
    else if (num === 90) {
      this.setState({ history: historyninety }, () => {
        this.getPoints(1);
      });
    }
  }

  onHistoryChange2(num = 30) {
    const { historythirty2 } = this.state;
    const { historysixty2 } = this.state;
    const { historyninety2 } = this.state;
    if (num === 30) {
      this.setState({ history2: historythirty2 }, () => {
        this.getPoints(2);
      });
    }
    else if (num === 60) {
      this.setState({ history2: historysixty2 }, () => {
        this.getPoints(2);
      });
    }
    else if (num === 90) {
      this.setState({ history2: historyninety2 }, () => {
        this.getPoints(2);
      });
    }
  }

  getPoints(num = 1) {
    if (num === 1) {
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
} else if (num === 2) {
  const newGraphData2 = {
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

  const { history2 } = this.state;

  for (let historyIndex = 0; historyIndex < history2.length; historyIndex++) {
    const label = history2[historyIndex].time;
    const labeldata = history2[historyIndex].close;

    newGraphData2.labels.push(label);
    newGraphData2.datasets[0].data.push(labeldata);
  }
  this.setState({ graphData2: newGraphData2 });
}
}

  fetchCryptocurrencyHistory(num = 1) {
    const { value } = this.state;
    const { value2 } = this.state;
    if (num === 1) {
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
        this.formatDate(1);
        this.onHistoryChange(30);
      }));
    } else if (num === 2) {
      axios.all([
        axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${value2}&tsym=USD&limit=30`),
        axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${value2}&tsym=USD&limit=60`),
        axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${value2}&tsym=USD&limit=90`)
      ])
        .then(axios.spread((responsethirty, responsesixty, responseninety) => {
          const historythirty2 = responsethirty.data.Data;
          const historysixty2 = responsesixty.data.Data;
          const historyninety2 = responseninety.data.Data;
          this.setState({ historythirty2, historysixty2, historyninety2 });
          this.formatDate(2);
          this.onHistoryChange2(30);
        }));
    }
  }


  handleChange1(event) {
    this.setState({ value: event.target.value });
    this.setState({ coin: event.target.value });
    if (event.target.value !== '') {
      this.setState({ isEnabled: true });
      return true;
    }
    return false;
  }

  handleChange2(event) {
    this.setState({ value2: event.target.value });
    this.setState({ coin2: event.target.value });
    if (event.target.value !== '') {
      this.setState({ isEnabled2: true });
      return true;
    }
    return false;
  }

  handleSubmit1(e) {
    this.findSymbol(1);
    e.preventDefault();
  }

  handleSubmit2(e) {
    this.setState({ graph2: 'active' }, () => {
      this.findSymbol(2);
    })
    e.preventDefault();
  }

  findSymbol(num) {
    const { sendCoin } = this.props;
    const { sendCoin2 } = this.props;
    const { coin } = this.state;
    const { data } = this.props;
    const { value } = this.state;
    const { value2 } = this.state;
    const { coin2 } = this.state;

    let hits = false;
    if (num === 1) {
    data.forEach((coins) => {
      if (!hits) {
        if (coins.symbol === value) {
          sendCoin(coin);
          this.fetchCryptocurrencyHistory(1);
          this.fetchCryptocurrencyImage(1);
          this.getPoints(1);
          hits = true;
        }
        else {
          return false;
        }
      }
    });
  } else if (num === 2) {
    data.forEach((coins) => {
      if (!hits) {
        if (coins.symbol === value2) {
          sendCoin2(coin2);
          this.fetchCryptocurrencyHistory(2);
          this.fetchCryptocurrencyImage(2);
          this.getPoints(2);
          hits = true;
        }
        else {
          return false;
        }
      }
    });
  }
  }

  fetchCryptocurrencyImage(num = 1) {
    const { value } = this.state;
    const { value2 } = this.state;
    if (num === 1) {
    axios.get(`https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${value}&tsym=USD`)
      .then((response) => {
        const cryptoImage = response.data.Data[0].CoinInfo.ImageUrl;
        this.setState({ cryptoImage });
      });
    } else if (num === 2) {
      axios.get(`https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${value2}&tsym=USD`)
        .then((response) => {
          const cryptoImage2 = response.data.Data[0].CoinInfo.ImageUrl;
          this.setState({ cryptoImage2 });
        });
    }
  }

  formatDate(num = 1) {
    if (num === 1) {
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
  } else if (num === 2) {
    const { historythirty2 } = this.state;
    const { historysixty2 } = this.state;
    const { historyninety2 } = this.state;
    historythirty2.forEach((pos) => {
      const { time } = pos;
      (pos).time = moment.unix(time).format('MMM DD');
    });
    historysixty2.forEach((pos) => {
      const { time } = pos;
      (pos).time = moment.unix(time).format('MMM DD');
    });
    historyninety2.forEach((pos) => {
      const { time } = pos;
      (pos).time = moment.unix(time).format('MMM DD');
    });
  }
}

  addGraph() {

      this.setState({ freshReveal: true }, () => {
        this.setState({ secondGraphVisible: true });
      });
  }


  render() {
    const { answer } = this.props;
    const { isEnabled } = this.state;
    const { isEnabled2 } = this.state;
    const { freshReveal } = this.state;
    const { hovering } = this.state;
    const { secondGraphVisible } = this.state;
    const { isGraphVisible } = this.state;
    const { dataNew } = this.props;
    const { dataNew2 } = this.props;
    const { graphData } = this.state;
    const { graphData2 } = this.state;
    const { cryptoImage } = this.state;
    const { cryptoImage2 } = this.state;


    return (
      <div id="dashboard" className="Nodashboardcontainer">
        <div className={`${answer ? 'Yes' : 'No'}dashboard`}>
          <Container>
            <Row>
              <Reveal pose={isGraphVisible ? 'visible' : 'hidden'}>
                <Resize className="NoGraph" pose={freshReveal ? 'resized' : 'initial'}>
                  <Graph
                    dataNew={dataNew}
                    graphData={graphData}
                    isGraphVisible={isGraphVisible}
                    isEnabled={isEnabled}
                    freshReveal={freshReveal}
                    cryptoImage={cryptoImage}
                    onHistoryChange={this.onHistoryChange}
                    handleSubmit={this.handleSubmit1}
                    handleChange={this.handleChange1}
                    answer={answer}
                  />
                </Resize>
              </Reveal>

              <div>
                {freshReveal ? (
                  <Reveal3 className="NoGraphNew" pose={secondGraphVisible ? 'visible' : 'hidden'}>
                    <Graph
                      isEnabled={isEnabled2}
                      dataNew={dataNew2}
                      graphData={graphData2}
                      isGraphVisible={isGraphVisible}
                      freshReveal={freshReveal}
                      cryptoImage={cryptoImage2}
                      secondGraphVisible={secondGraphVisible}
                      onHistoryChange={this.onHistoryChange2}
                      handleSubmit={this.handleSubmit2}
                      handleChange={this.handleChange2}
                      answer={answer}
                    />
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
                </Reveal2>
              </div>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}


Dashboard.propTypes = {
  data: PropTypes.array,
  sendCoin: PropTypes.func,
  dataNew: PropTypes.array,
  answer: PropTypes.bool

};

Dashboard.defaultProps = {
  data: 'data',
  sendCoin: 'sendCoin',
  dataNew: 'dataNew',
  answer: 'answer'

};

export default Dashboard;
