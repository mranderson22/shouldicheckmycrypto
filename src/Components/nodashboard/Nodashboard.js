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
    this.addGraph = this.addGraph.bind(this);
  }

  componentWillMount() {
    this.fetchCryptocurrencyImage();
  }

  componentDidMount() {
    const { historythirty } = this.props;
    const { isGraphVisible } = this.state;
    this.setState({ history: historythirty }, () => {
      this.formatDate();
      this.getPoints();
      this.setState({ isGraphVisible: !isGraphVisible });
    });
  }

  onHistoryChange(num) {
    const { historythirty } = this.props;
    const { historysixty } = this.props;
    const { historyninety } = this.props;
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

  fetchCryptocurrencyImage() {
    axios.get('https://min-api.cryptocompare.com/data/all/coinlist')
      .then((response) => {
        const cryptoImage = response.data.Data.BTC.ImageUrl;
        this.setState({ cryptoImage });
      });
  }

  formatDate() {
    const { historythirty } = this.props;
    const { historysixty } = this.props;
    const { historyninety } = this.props;
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
    const { freshReveal } = this.state;
    const { hovering } = this.state;
    const { secondGraphVisible } = this.state;
    const { isGraphVisible } = this.state;
    const { data } = this.props;
    const { graphData } = this.state;
    const { name } = data[0];
    const currentPrice = parseFloat(data[0].price_usd).toFixed(2);
    const { rank } = data[0];
    const seven = data[0].percent_change_7d;
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
  historythirty: PropTypes.array,
  historysixty: PropTypes.array,
  historyninety: PropTypes.array,
  data: PropTypes.array
};

Nodashboard.defaultProps = {
  historythirty: 'historythirty',
  historysixty: 'historysixty',
  historyninety: 'historyninety',
  data: 'data'
};

export default Nodashboard;
