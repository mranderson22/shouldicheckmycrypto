/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import './Graph.css';
import 'react-moment';
import {
  Button, ButtonGroup, Input
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
  componentDidMount() {
    const { loadSpinner } = this.props;
    const { id } = this.props;

    loadSpinner(id);
  }

  /**
   * @func onReload
   * On reload triggers re-fetching of coin data
   */
  onReload = (e) => {
    const { loadSpinner } = this.props;
    const { id } = this.props;
    const { coin1 } = this.props;
    const { handleSubmit5 } = this.props;
    const element = document.getElementById(`optionsImage${id}`);
    const graphPrice = document.getElementById(`graphPrice${id}`);

    graphPrice.classList.add('flash');
    element.classList.toggle('spun');
    handleSubmit5(e, coin1, false);
    loadSpinner(id);
  }

  onFavorite = () => {
    const { id } = this.props;
    const { toggleFavorites } = this.props;
    const element = document.getElementById(`heartFilled ${id}`);

    element.classList.add('pulse');
    setTimeout(() => {
      element.classList.remove('pulse');
    }, 1000);
    toggleFavorites();
  }

  render() {
    const {
      handleChange,
      isEnabled, onHistoryChange, graphData, changeCurrency, id, loading,
      curr, coin1, toggleCurr, setUserInput, inputValue, coinInfo, graphFocus,
      // eslint-disable-next-line react/prop-types
      secondGraphVisible, addGraph, favorites, days, days2, dateRangeChange, dateRangeChange2
    } = this.props;
    const rSelected = curr === 'USD' ? 1 : 2;
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


    if (coin1 === 'BTC' && toggleCurr === false) {
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
    if (coinInfo.price < 0.10) {
      processPrice = parseFloat(coinInfo.price).toFixed(8);
    }
    else {
      processPrice = parseFloat(coinInfo.price).toFixed(2);
    }

    return (
      <div
        // eslint-disable-next-line no-nested-ternary
        className="NoGraphChild"
      >
        <img id={`cryptoImageBackground${id}`} alt="" className={graphFocus === 1 ? 'cryptoImageBackground saturated' : 'cryptoImageBackground'} src={coinInfo.image} />
        <div className="graphName">
          { `${coinInfo.name} / ${curr} `}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span id={`graphPrice${id}`}>
            <span className="graphPrice">
              {curr === 'USD' ? '$' : 'Ƀ'}
              {processPrice}
            </span>
            <span className={coinInfo.change24h <= 0 ? 'redText graphPercentage' : 'greenText graphPercentage'}>
              {` ${coinInfo.change24h}%`}
              {coinInfo.change24h <= 0 ? '↓' : '↑'}
            </span>
          </span>
        </div>
        {loading ? (
          <div id="spinner" className="spinnerContainerGraph">
            <div className="spinner">
              <Loader type="Grid" color="#0d0c0c" height={60} width={60} />
            </div>
          </div>
        ) : null }
        <animations.ResizeNoChartActual
          className="NoChartActual"
          pose="resized"
          id={`NoChartActual ${id}`}
        >
          <Bar
            data={graphData}
            options={options}
          />
        </animations.ResizeNoChartActual>
        <div className="daysselector">
          <Input
            defaultValue="6M"
            type="select"
            className="daysselectorDropdown"
            onChange={(e) => {
              if (e.target.value === '1M') {
                onHistoryChange(30);
              }
              else if (e.target.value === '3M') {
                onHistoryChange(60);
              }
              else if (e.target.value === '6M') {
                onHistoryChange(180);
              }
              else if (e.target.value === 'YTD') {
                onHistoryChange(365);
              }
              else if (e.target.value === 'ALL') {
                onHistoryChange(1000);
              }
            }}
          >
            <option value="1M">1 Month</option>
            <option value="3M">3 Months</option>
            <option value="6M">6 Months</option>
            <option value="YTD">YTD</option>
            <option value="ALL">All</option>
          </Input>
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
          className={graphFocus === 1 && secondGraphVisible ? ('col-sm-2 Nochartheader shadowGraph') : ('col-sm-2 Nochartheader')}
        >
          <ChartInfo
            coin1={coin1}
            curr={curr}
            dateRangeChange={dateRangeChange}
            dateRangeChange2={dateRangeChange2}
            days={days}
            days2={days2}
            coinInfo={coinInfo}
            loading={loading}
            id={id}
          />
        </div>
        <CoinSearch
          setUserInput={setUserInput}
          inputValue={inputValue}
          handleChange={handleChange}
          isEnabled={isEnabled}
          coin1={coin1}
        />
        <div className="optionsBank">
          <div
            className="favoriteButton"
            role="button"
            tabIndex="0"
            onClick={this.onFavorite}
          >
            <img
              id={`heartFilled ${id}`}
              className="optionsImage large"
              alt=""
              src={
                favorites.indexOf(coin1) === -1 ? heart : heartFilled
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
            <img className="optionsImage" id={`optionsImage${id}`} alt="" src={reload} />
          </div>
          {id === 'graph2' ? (
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
  handleChange: PropTypes.func,
  isEnabled: PropTypes.bool,
  changeCurrency: PropTypes.func,
  curr: PropTypes.string,
  toggleCurr: PropTypes.bool,
  handleSubmit5: PropTypes.func,
  toggleFavorites: PropTypes.func,
  favorites: PropTypes.array,
  addGraph: PropTypes.func,
  setUserInput: PropTypes.func,
  inputValue: PropTypes.string
};

Graph.defaultProps = {
  onHistoryChange: PropTypes.func,
  graphData: PropTypes.object,
  handleChange: PropTypes.func,
  isEnabled: PropTypes.bool,
  changeCurrency: PropTypes.func,
  curr: PropTypes.string,
  toggleCurr: PropTypes.bool,
  handleSubmit5: PropTypes.func,
  toggleFavorites: PropTypes.func,
  favorites: PropTypes.array,
  addGraph: PropTypes.func,
  setUserInput: PropTypes.func,
  inputValue: PropTypes.string
};


export default Graph;
