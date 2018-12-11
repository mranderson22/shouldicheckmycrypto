import React, { Component } from 'react';
import './Graph.css';
import 'react-moment';
import posed from 'react-pose';
import {
  Button, ButtonGroup, Form, Label, Input, FormGroup
} from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import ChartInfo from '../chartInfo/ChartInfo';

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
      rSelected: 1,
      rSelected2: 5
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
      dateRangeChange, dateRangeChange2, answer, handleChange, handleSubmit, handleSubmit3, isEnabled, onHistoryChange, freshReveal,
      dataNew, graphData, cryptoImage, changeCurrency, curr, dataToBTC, value, toggleCurr, days, days2, addSidebar, sideBarOpener
    } = this.props;
    let { rSelected } = this.state;
    const { rSelected2 } = this.state;
    const { name } = dataNew[0];
    const currentPrice = parseFloat(dataNew[0].price_usd).toFixed(2);
    const currentPrice2 = Number(dataToBTC.price).toFixed(10);
    const { rank } = dataNew[0];
    const oneHour = parseFloat(dataNew[0].percent_change_1h);
    const oneHour2 = parseFloat(dataToBTC.percent_change_1h);
    const oneDay = parseFloat(dataNew[0].percent_change_24h);
    const oneDay2 = parseFloat(dataToBTC.percent_change_24h);
    const seven = parseFloat(dataNew[0].percent_change_7d);
    const seven2 = parseFloat(dataToBTC.percent_change_7d);
    const maxSupply = dataNew[0].max_supply;
    const availableSupply = dataNew[0].available_supply;
    const marketCap = dataNew[0].market_cap_usd;
    let oneDayVolume;
    const oneDayVolumeKeys = Object.keys(dataNew[0]).map((key) => {
      const tempdata = dataNew[0];
      if (key === '24h_volume_usd') {
        oneDayVolume = tempdata[key];
      }
    });
    const Image = `https://www.cryptocompare.com/${cryptoImage[1]}`;
    const Image2 = `https://www.cryptocompare.com/${cryptoImage[0]}`;
    const Image3 = `https://www.cryptocompare.com/${cryptoImage[2]}`;
    const Image4 = `https://www.cryptocompare.com/${cryptoImage[3]}`;
    const Image5 = `https://www.cryptocompare.com/${cryptoImage[4]}`;
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
                  <Input className="textField" onFocus={sideBarOpener ? null : addSidebar} type="text" onChange={handleChange} placeholder="ex. ETH" maxLength="7" />
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
        <Resize3 className={`${answer ? 'Yes' : 'No'}Name`} pose={freshReveal ? 'resized' : 'initial'}>
          { `${name} / ${curr}`}
        </Resize3>
        <Resize1 pose={freshReveal ? 'resized' : 'initial'} className="Nochartheader">
          <ChartInfo
            rank={rank}
            currentPrice={currentPrice}
            currentPrice2={currentPrice2}
            maxSupply={maxSupply}
            availableSupply={availableSupply}
            marketCap={marketCap}
            oneDayVolume={oneDayVolume}
            oneHour={oneHour}
            oneHour2={oneHour2}
            seven={seven}
            seven2={seven2}
            oneDay={oneDay}
            oneDay2={oneDay2}
            curr={curr}
            dateRangeChange={dateRangeChange}
            dateRangeChange2={dateRangeChange2}
            days={days}
            days2={days2}
          />
        </Resize1>
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
              this.onRadioBtnClick2(6);
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
              this.onRadioBtnClick2(7);
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
