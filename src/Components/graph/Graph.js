/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import './Graph.css';
import 'react-moment';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import * as animations from '../../animations';
import CoinSearch from '../coinSearch/CoinSearch';
import ChartInfo from '../chartInfo/ChartInfo';
import { GraphSpinner } from '../loadingSpinners/LoadingSpinners';
import {
  OptionsBank, DaysSelectorDropdown, DaysSelectorSpread, CurrSelector
} from '../iconsUI/IconsUI';

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
    const {
      loadSpinner, id, coin1, handleSubmit5 
    } = this.props;
    const element = document.getElementById(`optionsImage${id}`);
    const graphPrice = document.getElementById(`graphPrice${id}`);

    graphPrice.classList.add('flash');
    element.classList.toggle('spun');
    handleSubmit5(e, coin1, false);
    loadSpinner(id);
  }

  onFavorite = () => {
    const { id, toggleFavorites } = this.props;
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
      curr, coin1, setUserInput, inputValue, coinInfo, graphFocus,
      // eslint-disable-next-line react/prop-types
      secondGraphVisible, addGraph, favorites, days, days2, dateRangeChange, dateRangeChange2
    } = this.props;
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
        backgroundColor: 'rgba(135, 144, 149, 0.99)',
        titleFontColor: 'black',
        bodyFontColor: 'black'
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
            fontColor: '#879095'
          }
        }]
      }
    };

    let processPrice;
    if (coinInfo.price < 0.10) {
      processPrice = parseFloat(coinInfo.price).toFixed(8);
    }
    else {
      processPrice = parseFloat(coinInfo.price).toFixed(2);
    }

    return (
      <div className="NoGraphChild">
        <img
          id={`cryptoImageBackground${id}`}
          alt=""
          className={graphFocus === 1 ? 'cryptoImageBackground saturated' : 'cryptoImageBackground'}
          src={coinInfo.image}
        />
        <div className="graphName">
          { `${coinInfo.name} / ${curr} `}
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
        {loading && (
          <GraphSpinner />
        )}
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
          <DaysSelectorDropdown onHistoryChange={onHistoryChange} />
          <DaysSelectorSpread onHistoryChange={onHistoryChange} days={days} />
        </div>
        {coin1 !== 'BTC'
          && <CurrSelector changeCurrency={changeCurrency} id={id} curr={curr} />
        }
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
          graphFocus={graphFocus}
          secondGraphVisible={secondGraphVisible}
        />
        <CoinSearch
          setUserInput={setUserInput}
          inputValue={inputValue}
          handleChange={handleChange}
          isEnabled={isEnabled}
          coin1={coin1}
        />
        <OptionsBank
          onFavorite={this.onFavorite}
          favorites={favorites}
          coin1={coin1}
          onReload={this.onReload}
          id={id}
          addGraph={addGraph}
        />
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
  handleSubmit5: PropTypes.func,
  toggleFavorites: PropTypes.func,
  favorites: PropTypes.array,
  addGraph: PropTypes.func,
  setUserInput: PropTypes.func,
  inputValue: PropTypes.string
};


export default Graph;
