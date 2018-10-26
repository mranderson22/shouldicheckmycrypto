import React, { Component } from 'react';
import './Graph.css';
import 'react-moment';
import posed from 'react-pose';
import {
  Button, ButtonGroup, Form, Label, Input, FormGroup
} from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

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
      rSelected: 1,
      rSelected2: 3
    };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  onRadioBtnClick2(rSelected2) {
    this.setState({ rSelected2 });
  }

  render() {
    const {
      answer, handleChange, handleSubmit, handleSubmit3, isEnabled, onHistoryChange, freshReveal,
      dataNew, graphData, cryptoImage, changeCurrency, curr, dataToBTC, value, toggleCurr
    } = this.props;
    const { rSelected, rSelected2 } = this.state;
    const { name } = dataNew[0];
    const currentPrice = parseFloat(dataNew[0].price_usd).toFixed(2);
    const currentPrice2 = Number(dataToBTC.price).toFixed(10);
    const { rank } = dataNew[0];
    const seven = dataNew[0].percent_change_7d;
    const seven2 = dataToBTC.percent_change_7d;
    const Image = `https://www.cryptocompare.com/${cryptoImage[1]}`;
    const Image2 = `https://www.cryptocompare.com/${cryptoImage[0]}`;
    const options = {
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
            min: 0,
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
            fontColor: 'black'
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
              this.onRadioBtnClick(1);
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
              this.onRadioBtnClick(2);
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


    return (
      <div className={`${answer ? 'Yes' : 'No'}GraphChild`}>
        <div className="cryptoImageContainer">
          <img alt="" className="cryptoImage2" src={Image2} />
          <div className="cryptoInput">
            <Form inline onSubmit={handleSubmit}>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="Name">
                  <Input className="textField" type="text" onChange={handleChange} placeholder="ex. ETH" maxLength="7" />
                </Label>
              </FormGroup>
              <Button className="cryptoSubmit" disabled={!isEnabled}>
                GO
              </Button>
            </Form>
          </div>
        </div>
        <Resize2 pose={freshReveal ? 'resized' : 'initial'}>
          <img alt="" className="cryptoImageBackground" src={Image2} />
        </Resize2>
        <div className="currSelector">
          <div>
            {button}
          </div>
        </div>
        <div className="Nochartheader">
          <div className="name">
            { `${name} / ${curr}`}
          </div>
          <div>
            {curr === 'USD' ? (
              <div className="coinInfo">
                { `Rank: ${rank}` }
                { ' \u00A0 '}
                { `Current Price: $${currentPrice}` }
                { ' \u00A0 ' }
                { `Last 7 Days: ${seven}%` }
              </div>) : (
                <div className="coinInfo">
                  { `Rank: ${rank}` }
                  { ' \u00A0 '}
                  { `Current Price: ${currentPrice2}` }
                  { ' \u00A0 ' }
                  { `Last 7 Days: ${seven2}%` }
                </div>)}
          </div>
        </div>
        <div className="NoChartActual">
          <Bar
            data={graphData}
            options={options}
          />
        </div>
        <img alt="" className="cryptoImage" src={Image} onClick={handleSubmit3}/>
        <div className="daysselector">
          <Button
            className="selectorButtons"
            color="primary"
            onClick={() => {
              this.onRadioBtnClick2(3);
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
              this.onRadioBtnClick2(4);
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
              this.onRadioBtnClick2(5);
              onHistoryChange(90);
            }
          }
            active={rSelected2 === 5}
          >
            { 'YTD' }
          </Button>
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
