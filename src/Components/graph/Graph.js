import React, { Component } from 'react';
import './Graph.css';
import 'react-moment';
import posed from 'react-pose';
import {
  Button, ButtonGroup, Form, Label, Input, FormGroup
} from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const Resize1 = posed.div({
  initial: {
    fontSize: '15px',
    height: '142px',
    transform: 'translate(-11.5%, -98.7%)'
  },
  resized: {
    fontSize: '13px',
    height: '124px',
    transform: 'translate(-14.0%, -113.5%)'
  }
});

const Resize3 = posed.div({
  initial: {
    fontSize: '4vw',
    transform: 'translate(-21%, -70%)'
  },
  resized: {
    fontSize: '3vw',
    transform: 'translate(-54%, -74%)'
  }
});

const Resize2 = posed.div({
  initial: {
    width: '30vw'
  },
  resized: {
    width: '20vw'
  }
});

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rSelected2: 5
    };
  }

  render() {
    const {
      dateRangeChange, dateRangeChange2, answer, handleChange, handleSubmit, handleSubmit3, isEnabled, onHistoryChange, freshReveal,
      dataNew, graphData, cryptoImage, changeCurrency, curr, dataToBTC, value, toggleCurr, days, days2, addSidebar, sideBarOpener, inputValue
    } = this.props;
    const rSelected = curr === 'USD' ? 1 : 2;
    const { name } = dataNew[0];
    const Image = `https://www.cryptocompare.com/${cryptoImage[1]}`;
    const Image2 = `https://www.cryptocompare.com/${cryptoImage[0]}`;
    const Image3 = `https://www.cryptocompare.com/${cryptoImage[2]}`;
    const Image4 = `https://www.cryptocompare.com/${cryptoImage[3]}`;
    const Image5 = `https://www.cryptocompare.com/${cryptoImage[4]}`;
    const options = {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: false
      },
      tooltips: {
        displayColors: false,
        mode: 'index'
      },
      scales: {
        yAxes: [{
          display: false,
          type: 'logarithmic',
          id: 'y-axis-1',
          ticks: {
            fontColor: 'black',

            max: 1000000000000
          }
        }, {
          type: 'logarithmic',
          display: false,
          id: 'y-axis-2',
          ticks: {
            fontColor: 'black',
            min: 0
          }
        }
        ],
        xAxes: [{
          barPercentage: 1.0,
          categoryPercentage: 1.0,
          maxBarThickness: 10,
          barThickness: 'flex',
          ticks: {
            autoSkip: true,
            maxTicksLimit: 15,
            fontColor: 'black',
            min: 0
          }
        }]
      }
    };
    let button;


    if (value === 'BTC' && toggleCurr === false) {
      button = null;
    }
    else if (toggleCurr === true) {
      button = (
        <ButtonGroup>
          <Button
            className="currButton"
            onClick={() => {
              changeCurrency('USD');
            }
         }
            active={rSelected === 1}
          >
          USD
          </Button>
          <Button
            className="currButton"
            onClick={() => {
              changeCurrency('BTC');
            }
         }
            active={rSelected === 2}
          >
          BTC
          </Button>
        </ButtonGroup>
      );
    }
    let rSelected2;
    if (days === 31) {
      rSelected2 = 3;
    }
    else if (days === 90) {
      rSelected2 = 4;
    }
    else if (days === 180) {
      rSelected2 = 5;
    }
    else if (days === 365) {
      rSelected2 = 6;
    }
    else if (days === 1500) {
      rSelected2 = 7;
    }


    return (
      <div className={`${answer ? 'Yes' : 'No'}GraphChild`}>
        <div className="cryptoImageContainer">
          <img alt="" className="cryptoImage2" src={Image2} />
          <div className="cryptoInput">
            <Form inline onSubmit={handleSubmit}>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="Name">
                  <Input className="textField" value={inputValue} onFocus={addSidebar} type="text" onChange={handleChange} placeholder="ex. ETH" maxLength="7" />
                </Label>
              </FormGroup>
              <Button className="cryptoSubmit" disabled={!isEnabled}>
                GO
              </Button>
            </Form>
          </div>
        </div>

          <img alt="" className="cryptoImageBackground" src={Image2} />

        <Resize3 className={`${answer ? 'Yes' : 'No'}Name`}>
          { `${name} / ${curr}`}
        </Resize3>
        <div className="NoChartActual">
          <Bar
            data={graphData}
            options={options}
          />
        </div>
        <img alt="" className="cryptoImage" cursor="pointer" src={Image} onClick={(e) => {handleSubmit3(e, 1)}}/>
        <img alt="" className="cryptoImage3" src={Image3} onClick={(e) => {handleSubmit3(e, 2)}}/>
        <img alt="" className="cryptoImage4" src={Image4} onClick={(e) => {handleSubmit3(e, 3)}}/>
        <img alt="" className="cryptoImage5" src={Image5} onClick={(e) => {handleSubmit3(e, 4)}}/>
        <div className="daysselector">
          <Button
            className="selectorButtons"
            color="primary"
            onClick={() => {

              onHistoryChange(30);
            }
          }
            active={rSelected2 === 3}
          >
            { '1m' }
          </Button>
          { ' \u00A0 '}
          { ' \u00A0 '}
          <Button
            className="selectorButtons"
            color="primary"
            onClick={() => {

              onHistoryChange(60);
            }
          }
            active={rSelected2 === 4}
          >
            { '3m' }
          </Button>
          { ' \u00A0 '}
          { ' \u00A0 '}
          <Button
            className="selectorButtons"
            color="primary"
            onClick={() => {

              onHistoryChange(180);
            }
          }
            active={rSelected2 === 5}
          >
            { '6m' }
          </Button>
          { ' \u00A0 '}
          { ' \u00A0 '}
          <Button
            className="selectorButtons"
            color="primary"
            onClick={() => {

              onHistoryChange(365);
            }
          }
            active={rSelected2 === 6}
          >
            { 'YTD' }
          </Button>
          { ' \u00A0 '}
          { ' \u00A0 '}
          <Button
            className="selectorButtons"
            color="primary"
            onClick={() => {

              onHistoryChange(1000);
            }
          }
            active={rSelected2 === 7}
          >
            { 'All' }
          </Button>
        </div>
        <div className="currSelector">
          <div>
            {button}
          </div>
        </div>
      </div>
    );
  }
}


Graph.propTypes = {
  freshReveal: PropTypes.bool,
  onHistoryChange: PropTypes.func,
  dataNew: PropTypes.array,
  graphData: PropTypes.object,
  answer: PropTypes.bool,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isEnabled: PropTypes.bool,
  changeCurrency: PropTypes.func,
  curr: PropTypes.string,
  dataToBTC: PropTypes.object,
  toggleCurr: PropTypes.bool,
  value: PropTypes.string
};

Graph.defaultProps = {
  freshReveal: PropTypes.bool,
  onHistoryChange: PropTypes.func,
  dataNew: PropTypes.array,
  graphData: PropTypes.object,
  answer: PropTypes.bool,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isEnabled: PropTypes.bool,
  changeCurrency: PropTypes.func,
  curr: PropTypes.string,
  dataToBTC: PropTypes.object,
  toggleCurr: PropTypes.bool,
  value: PropTypes.string
};


export default Graph;
