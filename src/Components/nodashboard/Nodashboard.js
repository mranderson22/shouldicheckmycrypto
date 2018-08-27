import React, { Component } from 'react';
import './Nodashboard.css';
import 'react-moment';
import { Button } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import moment from 'moment';

class Nodashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  componentDidMount() {
    const { historythirty } = this.props;
    this.setState({ history: historythirty }, () => {
      this.formatDate();
      this.getPoints();
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


  render() {
    const { data } = this.props;
    const { graphData } = this.state;
    const { name } = data[0];
    const currentPrice = parseFloat(data[0].price_usd).toFixed(2);
    const { rank } = data[0];
    const seven = data[0].percent_change_7d;

    return (
      <div className="Nodashboardcontainer">
        <div className="Nodashboard">
          <div className="NoGraph">
            <div className="Nochartheader">
              <h2>
                { name }
              </h2>
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
                height={600}
                width={1200}
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
                        fontColor: '#989898'
                      }
                    }],
                    xAxes: [{
                      ticks: {
                        maxTicksLimit: 15,
                        fontColor: '#989898'
                      }
                    }]
                  }
                }}
              />
            </div>
            <div className="daysselector">
              <Button
                className="btn"
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
                className="btn"
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
                className="btn"
                color="primary"
                onClick={() => {
                  this.onHistoryChange(90);
                }
              }
              >
                { 90 }
              </Button>
            </div>
          </div>
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
