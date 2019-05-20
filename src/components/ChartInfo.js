/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Scrollbars from 'react-custom-scrollbars';
import home from '../../images/home_icon.png';
import reddit from '../../images/reddit_icon.png';
import facebook from '../../images/facebook_icon.png';
import twitter from '../../images/twitter_icon.png';
import github from '../../images/github_icon.png';
import { ChartInfoSpinner } from './LoadingSpinners';

const ChartInfo = ({
  dateRangeChange, days, coin1, coinInfo, loading, graphID, graphFocus, secondGraphVisible, curr
}) => (
  <div
    className={graphFocus === 1 && secondGraphVisible ? ('col-sm-2 chartInfo shadowGraph') : ('col-sm-2 chartInfo')}
  >
    <div className="chartInfo__overlay">
      <div className="chartInfo__header">
        <img className="chartInfo__header--image" src={coinInfo.image} alt="" />
        <span className="chartInfo__header--label">
          {`${coin1} Details`}
        </span>
      </div>
      <img
        alt="coin icon"
        className="chartInfo__Bg-Image"
        src={coinInfo.image}
        id={`cryptoImageBackgroundChartInfo${graphID}`}
      />
      {loading && (
        <ChartInfoSpinner />
      )}
      <div
        className="chartInfo__coinData"
        id={`coinInfo ${graphID}`}
      >
        <Scrollbars
          renderThumbVertical={props => <div {...props} className="thumb-vertical2" />}
          renderView={props => <div {...props} className="view2" />}
        >
          <li>
            <span>
              {'Rank'}
            </span>
            <span className="chartInfoRight black">
              {coinInfo.rank}
            </span>
          </li>
          <li>
            <span>
              {'Price'}
            </span>
            <span className="chartInfoRight black">
              {curr === 'USD' ? '$' : 'Ƀ'}
              {coinInfo.price < 0.10 ? `${parseFloat(coinInfo.price).toFixed(8)}` : `${parseFloat(coinInfo.price).toFixed(2)}`}
            </span>
          </li>
          <li>
            <span>
              {'1 Hour'}
            </span>
            <span className={coinInfo.change1h <= 0 ? 'redText chartInfoRight' : 'greenText chartInfoRight'}>
              {coinInfo.change1h}
              {'%'}
              {coinInfo.change1h <= 0 ? '↓' : '↑'}
            </span>
          </li>
          <li>
            <span>
              {'1 Day'}
            </span>
            <span className={coinInfo.change24h <= 0 ? 'redText chartInfoRight' : 'greenText chartInfoRight'}>
              {coinInfo.change24h}
              {'%'}
              {coinInfo.change24h <= 0 ? '↓' : '↑'}
            </span>
          </li>
          <li>
            <span>
              {'7 Day'}
            </span>
            <span className={coinInfo.change7d <= 0 ? 'redText chartInfoRight' : 'greenText chartInfoRight'}>
              {coinInfo.change7d}
              {'%'}
              {coinInfo.change7d <= 0 ? '↓' : '↑'}
            </span>
          </li>
          <li>
            <span>
              {`${days} Day`}
            </span>
            {isFinite(dateRangeChange) ? (
              <span className={dateRangeChange <= 0 ? 'redText chartInfoRight' : 'greenText chartInfoRight'}>
                {dateRangeChange}
                {'%'}
                {dateRangeChange <= 0 ? '↓' : '↑'}
              </span>
            ) : (
              <span className="chartInfoRight black">
                {'N/A'}
              </span>
            )}
          </li>
          <li>
            <span>
              {'24 High'}
            </span>
            <span className="chartInfoRight black">
              {curr === 'USD' ? '$' : 'Ƀ'}
              {coinInfo.high24 < 0.10 ? `${parseFloat(coinInfo.high24).toFixed(8)}` : `${parseFloat(coinInfo.high24).toFixed(2)}`}
            </span>
          </li>
          <li>
            <span>
              {'24 Low'}
            </span>
            <span className="chartInfoRight black">
              {curr === 'USD' ? '$' : 'Ƀ'}
              {coinInfo.low24 < 0.10 ? `${parseFloat(coinInfo.low24).toFixed(8)}` : `${parseFloat(coinInfo.low24).toFixed(2)}`}
            </span>
          </li>
          <li>
            <span>
              {'ATH'}
            </span>
            <span className="chartInfoRight black">
              {curr === 'USD' ? '$' : 'Ƀ'}
              {coinInfo.ath < 0.10 ? `${parseFloat(coinInfo.ath).toFixed(8)}` : `${parseFloat(coinInfo.ath).toFixed(2)}`}
            </span>
          </li>
          <li>
            <span>
              {'ATH Diff'}
            </span>
            <span className={coinInfo.athChange <= 0 ? 'redText chartInfoRight' : 'greenText chartInfoRight'}>
              {coinInfo.athChange}
              {'%'}
              {coinInfo.athChange <= 0 ? '↓' : '↑'}
            </span>
          </li>
          <li>
            <span>
              {'ATH Date'}
            </span>
            <span className="chartInfoRight black">
              {moment(coinInfo.athDate).format('MM/DD/YYYY')}
            </span>
          </li>
          <li>
            <span>
              {'Mkt Cap'}
            </span>
            <span className="chartInfoRight black">
              {curr === 'USD' ? '$' : 'Ƀ'}
              {coinInfo.mktCap}
            </span>
          </li>
        </Scrollbars>
      </div>
      <div className="chartInfo__linkHub">
        {coinInfo.homepage
          && (
            <a href={coinInfo.homepage} target="_blank" rel="noopener noreferrer">
              <img src={home} alt="home" />
            </a>
          )
        }
        {coinInfo.twitter_handle
          && (
            <a href={`https://www.twitter.com/${coinInfo.twitter_handle}`} target="_blank" rel="noopener noreferrer">
              <img src={twitter} alt="home" />
            </a>
          )
        }
        {coinInfo.facebook_username
          && (
            <a href={`https://www.facebook.com/${coinInfo.facebook_username}`} target="_blank" rel="noopener noreferrer">
              <img src={facebook} alt="home" />
            </a>
          )
        }
        {coinInfo.subreddit
          && (
            <a href={coinInfo.subreddit} target="_blank" rel="noopener noreferrer">
              <img src={reddit} alt="home" />
            </a>
          )
        }
        {coinInfo.github
          && (
            <a href={coinInfo.github} target="_blank" rel="noopener noreferrer">
              <img src={github} alt="home" />
            </a>
          )
        }
      </div>
    </div>
  </div>
);

ChartInfo.propTypes = {
  dateRangeChange: PropTypes.any,
  days: PropTypes.any,
  coin1: PropTypes.string,
  coinInfo: PropTypes.object,
  loading: PropTypes.any,
  graphID: PropTypes.string,
  graphFocus: PropTypes.any,
  secondGraphVisible: PropTypes.bool,
  curr: PropTypes.string
};

ChartInfo.defaultProps = {
  dateRangeChange: PropTypes.any,
  days: PropTypes.any,
  coin1: PropTypes.string,
  coinInfo: PropTypes.object,
  loading: PropTypes.any,
  graphID: PropTypes.string,
  graphFocus: PropTypes.any,
  secondGraphVisible: PropTypes.bool,
  curr: PropTypes.string
};


export default ChartInfo;
