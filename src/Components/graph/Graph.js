/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import './Graph.css';
import 'react-moment';
import posed from 'react-pose';
import {
  Button, ButtonGroup, Form, Label, Input, FormGroup
} from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import exit from '../../../images/exiticon.png';
import heart from '../../../images/heart.png';
import heartFilled from '../../../images/heartFilled.png';
import reload from '../../../images/reload.png';
import ChartInfo from '../chartInfo/ChartInfo';

const ResizeNoChartActual = posed.div({
  initial: {
    height: '55vh'
  },
  resized: {
    height: '37.5vh'
  }
});

class Graph extends Component {
  state = {
    // hovered: false,
    loading: false
  };

  componentDidMount() {
    // window.addEventListener('wheel', this.scrollEvent);
    this.loadSpinner();
  }

  onReload = (e) => {
    const { value } = this.props;
    const { handleSubmit5 } = this.props;
    const element = document.getElementById(value);
    element.classList.toggle('spun');
    handleSubmit5(e, value);
    this.loadSpinner();
  }

  onFavorite = () => {
    const { value } = this.props;
    const { addToFavorites } = this.props;
    const element = document.getElementById(`heartFilled ${value}`);
    element.classList.add('pulse');
    setTimeout(() => {
      element.classList.remove('pulse');
    }, 1000);
    addToFavorites();
  }

  loadSpinner = () => {
    const { value } = this.props;
    const element2 = document.getElementById(`NoChartActual ${value}`);
    const element3 = document.getElementById(`coinInfo ${value}`);
    element2.classList.add('flash');
    element3.classList.add('flash');
    this.setState(() => ({ loading: true }));
    setTimeout(() => {
      element2.classList.toggle('flash');
      element3.classList.toggle('flash');
      this.setState(() => ({ loading: false }));
    }, 1500);
  }

  // scrollEvent(e) {
  //   const { onHistoryChange } = this.props;
  //   const { days } = this.props;
  //   const { graphFocus } = this.props;
  //   const { hovered } = this.props;
  //   if (graphFocus === 1 && hovered) {
  //     if (e.deltaY > 0) {
  //       if (days === 1500) {
  //         onHistoryChange(365);
  //       }
  //       else if (days === 365) {
  //         onHistoryChange(180);
  //       }
  //       else if (days === 180) {
  //         onHistoryChange(60);
  //       }
  //       else if (days === 90) {
  //         onHistoryChange(30);
  //       }
  //     }
  //     else if (e.deltaY < 0) {
  //       if (days === 31) {
  //         onHistoryChange(60);
  //       }
  //       else if (days === 90) {
  //         onHistoryChange(180);
  //       }
  //       else if (days === 180) {
  //         onHistoryChange(365);
  //       }
  //       else if (days === 365) {
  //         onHistoryChange(1000);
  //       }
  //     }
  //   }
  //   else if (graphFocus === 2) {
  //     return null;
  //   }
  // }


  render() {
    const {
      answer, handleChange, handleSubmit3,
      isEnabled, onHistoryChange, dataNew, graphData, cryptoImage, changeCurrency,
      curr, dataToBTC, value, toggleCurr, setUserInput, inputValue, coinInfo,
      // eslint-disable-next-line react/prop-types
      secondGraphVisible, addGraph, favorites, days, days2, dateRangeChange, dateRangeChange2
    } = this.props;
    const rSelected = curr === 'USD' ? 1 : 2;
    const { loading } = this.state;
    const Image = `https://www.cryptocompare.com/${cryptoImage[1]}`;
    const Image2 = `https://www.cryptocompare.com/${cryptoImage[0]}`;
    const Image3 = `https://www.cryptocompare.com/${cryptoImage[2]}`;
    const Image4 = `https://www.cryptocompare.com/${cryptoImage[3]}`;
    const Image5 = `https://www.cryptocompare.com/${cryptoImage[4]}`;
    let oneDayVolume;
    const options = {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: false
      },
      tooltips: {
        displayColors: false,
        mode: 'index',
        backgroundColor: 'rgb(24, 33, 44)'
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
      <div
        className="NoGraphChild"
      >
        <img alt="" className="cryptoImageBackground" src={Image2} />
        <div className={`${answer ? 'Yes' : 'No'}Name`}>
          { `${coinInfo.name} / ${curr}`}
        </div>
        {loading ? (
          <div className="spinnerContainerGraph">
            <div className="spinner">
              <Loader type="Grid" color="#0d0c0c" height={60} width={60} />
            </div>
          </div>
        ) : null }
        <ResizeNoChartActual
          className="NoChartActual"
          pose="resized"
          id={`NoChartActual ${value}`}
        >
          <Bar
            data={graphData}
            options={options}
          />
        </ResizeNoChartActual>
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
        <div
          className="col-sm-2 Nochartheader"
        >
          {loading ? (
            <div className="spinnerContainerChartInfo">
              <div className="spinner">
                <Loader type="Grid" color="rgb(24, 33, 44)" height={60} width={60} />
              </div>
            </div>
          ) : null }
          <ChartInfo
            value={value}
            curr={curr}
            dateRangeChange={dateRangeChange}
            dateRangeChange2={dateRangeChange2}
            days={days}
            days2={days2}
            cryptoImage={Image2}
            coinInfo={coinInfo}
          />
        </div>
        <div className="cryptoImageContainer">
          <div className="cryptoInput">
            <Form inline onSubmit={setUserInput}>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="Name">
                  <Input name="userInput" className="textField" value={inputValue} type="text" onChange={handleChange} placeholder="ex. ETH" maxLength="7" />
                </Label>
              </FormGroup>
              <Button className="cryptoSubmit" disabled={!isEnabled}>
                  GO
              </Button>
            </Form>
          </div>
        </div>
        <div className="col-sm-2 coinButtonBank">
          { cryptoImage[1]
              && (
                <div className="quickButtonContainer" id="firstCoinButton">
                  <img
                    alt=""
                    className="cryptoImage"
                    cursor="pointer"
                    src={Image}
                    onClick={(e) => {
                      handleSubmit3(e, 1);
                    }}
                  />
                </div>
              )
              }
          { cryptoImage[2]
              && (
                <div className="quickButtonContainer" id="secondCoinButton">
                  <img
                    alt=""
                    className="cryptoImage"
                    src={Image3}
                    onClick={(e) => {
                      handleSubmit3(e, 2);
                    }}
                  />
                </div>
              )
              }
          { cryptoImage[3]
              && (
                <div className="quickButtonContainer" id="thirdCoinButton">
                  <img
                    alt=""
                    className="cryptoImage"
                    src={Image4}
                    onClick={(e) => {
                      handleSubmit3(e, 3);
                    }}
                  />
                </div>
              )
              }
          { cryptoImage[4]
              && (
                <div className="quickButtonContainer" id="fourthCoinButton">
                  <img
                    alt=""
                    className="cryptoImage"
                    src={Image5}
                    onClick={(e) => {
                      handleSubmit3(e, 4);
                    }}
                  />
                </div>
              )
              }
        </div>
        <div className="optionsBank">
          <div
            className="favoriteButton"
            role="button"
            tabIndex="0"
            onClick={this.onFavorite}
          >
            <img
              id={`heartFilled ${value}`}
              className="optionsImage large"
              alt=""
              src={
                favorites.indexOf(value) === -1 ? heart : heartFilled
              }
            />
          </div>
          <div
            className="reloadButton"
            onClick={this.onReload
            }

            onKeyDown={() => {
              '';
            }
          }
            role="button"
            tabIndex={0}
          >
            <img className="optionsImage" id={value} alt="" src={reload} />
          </div>
          {secondGraphVisible ? (
            <div
              className="exitButton"
              onClick={() => {
                addGraph(1);
              }
              }
              onKeyDown={() => {
                '';
              }
              }
              role="button"
              tabIndex={0}
            >
              <img className="optionsImage" alt="" src={exit} />
            </div>) : null }
        </div>
      </div>
    );
  }
}


Graph.propTypes = {
  onHistoryChange: PropTypes.func,
  graphData: PropTypes.object,
  answer: PropTypes.bool,
  handleChange: PropTypes.func,
  isEnabled: PropTypes.bool,
  changeCurrency: PropTypes.func,
  curr: PropTypes.string,
  toggleCurr: PropTypes.bool,
  handleSubmit5: PropTypes.func,
  addToFavorites: PropTypes.func,
  handleSubmit3: PropTypes.func,
  favorites: PropTypes.array,
  addGraph: PropTypes.func,
  setUserInput: PropTypes.func,
  value: PropTypes.string,
  cryptoImage: PropTypes.array,
  inputValue: PropTypes.string
};

Graph.defaultProps = {
  onHistoryChange: PropTypes.func,
  graphData: PropTypes.object,
  answer: PropTypes.bool,
  handleChange: PropTypes.func,
  isEnabled: PropTypes.bool,
  changeCurrency: PropTypes.func,
  curr: PropTypes.string,
  toggleCurr: PropTypes.bool,
  handleSubmit5: PropTypes.func,
  addToFavorites: PropTypes.func,
  handleSubmit3: PropTypes.func,
  favorites: PropTypes.array,
  addGraph: PropTypes.func,
  setUserInput: PropTypes.func,
  value: PropTypes.string,
  cryptoImage: PropTypes.array,
  inputValue: PropTypes.string
};


export default Graph;
