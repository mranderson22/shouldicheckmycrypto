/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import './Graph.css';
import 'react-moment';
import {
  Button, ButtonGroup
} from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import * as animations from '../../animations';
import exit from '../../../images/exiticon.png';
import dollarIcon from '../../../images/dollar-symbol.png';
import bitcoinIcon from '../../../images/bitcoin-logo.png';
import heart from '../../../images/heart.png';
import heartFilled from '../../../images/heartFilled.png';
import reload from '../../../images/reload.png';
import CoinSearch from '../coinSearch/CoinSearch';
import ChartInfo from '../chartInfo/ChartInfo';

class Graph extends Component {
  state = {
    // hovered: false,
    loading: false
  };

  componentDidMount() {
    // window.addEventListener('wheel', this.scrollEvent);
    this.loadSpinner();
  }

  /**
   * @func onReload
   * On reload triggers re-fetching of coin data
   */
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
      handleChange, handleSubmit3,
      isEnabled, onHistoryChange, graphData, cryptoImage, changeCurrency,
      curr, value, toggleCurr, setUserInput, inputValue, coinInfo, graphFocus, 
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
    const options = {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: false
      },
      tooltips: {
        displayColors: false,
        position: 'nearest',
        mode: 'index',
        backgroundColor: 'rgb(24, 33, 44)'
        // callbacks: {
        //   label: (tooltipItems) => {
        //     if (curr === 'USD') {
        //       return `${graphData.datasets[tooltipItems.datasetIndex].label} : $ ${tooltipItems.yLabel}`;
        //     }
        //     return `${graphData.datasets[tooltipItems.datasetIndex].label} : Ƀ ${tooltipItems.yLabel}`;
        //   }
        // }
      },
      scales: {
        yAxes: [{
          display: false,
          type: 'linear',
          id: 'y-axis-1',
          ticks: {
            fontColor: 'black'
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
            <img src={dollarIcon} className="currIcons" alt="dollar" />
          </Button>
          <Button
            className="currButton"
            onClick={() => {
              changeCurrency('BTC');
            }
         }
            active={rSelected === 2}
          >
            <img src={bitcoinIcon} className="currIcons" alt="bitcoin" />
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

    let processPrice;
    if (curr === 'USD') {
      if (coinInfo.price < 0.01) {
        processPrice = parseFloat(coinInfo.price).toFixed(6);
      } else {
        processPrice = parseFloat(coinInfo.price).toFixed(2);
      }
    }
    else {
      processPrice = parseFloat(coinInfo.price).toFixed(8);
    }


    return (
      <div
        className="NoGraphChild"
      >
        <img alt="" className={graphFocus === 1 ? 'cryptoImageBackground saturated' : 'cryptoImageBackground'} src={coinInfo.image} />
        <div className="graphName">
          { `${coinInfo.name} / ${curr} `}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="graphPrice">
            {curr === 'USD' ? '$' : 'Ƀ'}
            {processPrice}
          </span>
          <span className={coinInfo.change24h <= 0 ? 'redText graphPercentage' : 'greenText graphPercentage'}>
            {` ${coinInfo.change24h}%`}
            {coinInfo.change24h <= 0 ? '↓' : '↑'}
          </span>
        </div>
        {loading ? (
          <div className="spinnerContainerGraph">
            <div className="spinner">
              <Loader type="Grid" color="#0d0c0c" height={60} width={60} />
            </div>
          </div>
        ) : null }
        <animations.ResizeNoChartActual
          className="NoChartActual"
          pose="resized"
          id={`NoChartActual ${value}`}
        >
          <Bar
            data={graphData}
            options={options}
          />
        </animations.ResizeNoChartActual>
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
        <CoinSearch
          setUserInput={setUserInput}
          inputValue={inputValue}
          handleChange={handleChange}
          isEnabled={isEnabled}
        />
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
