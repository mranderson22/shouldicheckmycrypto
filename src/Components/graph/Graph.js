/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import './Graph.css';
import 'react-moment';
import 'chartjs-plugin-zoom';
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
    const { graphID } = this.props;
    loadSpinner(graphID);
  }

  /**
   * @func onReload
   * On reload triggers re-fetching of coin data
   */
  onReload = (e) => {
    const {
      loadSpinner, graphID, coin1, handleExternalComponentSubmit
    } = this.props;
    const element = document.getElementById(`optionsImage${graphID}`);
    const graphPrice = document.getElementById(`graphPrice${graphID}`);

    graphPrice.classList.add('flash');
    element.classList.toggle('spun');
    handleExternalComponentSubmit(e, coin1, false);
    loadSpinner(graphID);
    this.resetZoom();
  }

  onFavorite = () => {
    const { graphID, toggleFavorites } = this.props;
    const element = document.getElementById(`heartFilled ${graphID}`);

    element.classList.add('pulse');
    setTimeout(() => {
      element.classList.remove('pulse');
    }, 1000);
    toggleFavorites();
  }

  resetZoom = () => {
    this.chartReference.chartInstance.resetZoom();
  }

  render() {
    const {
      handleInputChange,
      isEnabled, onHistoryChange, graphData, changeCurrency, graphID, loading,
      curr, coin1, setUserInput, inputValue, coinInfo, graphFocus,
      // eslint-disable-next-line react/prop-types
      secondGraphVisible, addSecondGraph, favorites, days, days2, dateRangeChange, dateRangeChange2
    } = this.props;

    let yAxisType;
    let showYAxis;
    if (curr === 'BTC' && coinInfo.price < 0.00001) {
      yAxisType = 'logarithmic';
      showYAxis = false;
    }
    else {
      yAxisType = 'linear';
      showYAxis = true;
    }

    const options = {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: false
      },
      tooltips: {
        displayColors: false,
        position: 'nearest',
        mode: 'label',
        intersect: 'false',
        backgroundColor: 'rgba(135, 144, 149, 0.9)',
        titleFontColor: 'black',
        bodyFontColor: 'black'
      },
      pan: {
        enabled: true,
        mode: 'x'
      },
      zoom: {
        enabled: true,
        mode: 'x',
        sensitivity: 0.00005,
        speed: 0.00005
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
          type: yAxisType,
          display: showYAxis,
          id: 'y-axis-2',
          ticks: {
            fontColor: 'rgba(175, 188, 194, 0.5)'
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
            maxTicksLimit: 10,
            fontColor: 'rgba(175, 188, 194, 0.5)'
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
          id={`cryptoImageBackground${graphID}`}
          alt=""
          className={graphFocus === 1 ? 'cryptoImageBackground saturated' : 'cryptoImageBackground'}
          src={coinInfo.image}
        />
        <div className="graphName">
          { `${coinInfo.name} / ${curr} `}
          <span id={`graphPrice${graphID}`}>
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
          id={`NoChartActual ${graphID}`}
        >
          <Bar
            data={graphData}
            options={options}
            // eslint-disable-next-line no-return-assign
            ref={reference => this.chartReference = reference}
          />
        </animations.ResizeNoChartActual>
        <div className="daysselector">
          <DaysSelectorDropdown
            onHistoryChange={onHistoryChange}
            resetZoom={this.resetZoom}
          />
          <DaysSelectorSpread
            onHistoryChange={onHistoryChange}
            days={days}
            resetZoom={this.resetZoom}
          />
        </div>
        {coin1 !== 'BTC'
          && <CurrSelector changeCurrency={changeCurrency} graphID={graphID} curr={curr} />
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
          graphID={graphID}
          graphFocus={graphFocus}
          secondGraphVisible={secondGraphVisible}
        />
        <CoinSearch
          graphFocus={graphFocus}
          setUserInput={setUserInput}
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          isEnabled={isEnabled}
          coin1={coin1}
          graphID={graphID}
        />
        <OptionsBank
          onFavorite={this.onFavorite}
          favorites={favorites}
          coin1={coin1}
          onReload={this.onReload}
          graphID={graphID}
          addSecondGraph={addSecondGraph}
        />
      </div>
    );
  }
}


Graph.propTypes = {
  onHistoryChange: PropTypes.func,
  graphData: PropTypes.object,
  handleInputChange: PropTypes.func,
  isEnabled: PropTypes.bool,
  changeCurrency: PropTypes.func,
  curr: PropTypes.string,
  handleExternalComponentSubmit: PropTypes.func,
  toggleFavorites: PropTypes.func,
  favorites: PropTypes.array,
  addSecondGraph: PropTypes.func,
  setUserInput: PropTypes.func,
  inputValue: PropTypes.string,
  loadSpinner: PropTypes.func,
  graphID: PropTypes.string,
  coin1: PropTypes.string,
  loading: PropTypes.any,
  coinInfo: PropTypes.object,
  graphFocus: PropTypes.any
};

Graph.defaultProps = {
  onHistoryChange: PropTypes.func,
  graphData: PropTypes.object,
  handleInputChange: PropTypes.func,
  isEnabled: PropTypes.bool,
  changeCurrency: PropTypes.func,
  curr: PropTypes.string,
  handleExternalComponentSubmit: PropTypes.func,
  toggleFavorites: PropTypes.func,
  favorites: PropTypes.array,
  addSecondGraph: PropTypes.func,
  setUserInput: PropTypes.func,
  inputValue: PropTypes.string,
  loadSpinner: PropTypes.func,
  graphID: PropTypes.string,
  coin1: PropTypes.string,
  loading: PropTypes.any,
  coinInfo: PropTypes.object,
  graphFocus: PropTypes.any
};


export default Graph;
