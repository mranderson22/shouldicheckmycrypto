import React from 'react';
import './ChartInfo.css';
import home from '../../../images/home_icon.png';
import reddit from '../../../images/reddit_icon.png';
import facebook from '../../../images/facebook_icon.png';
import twitter from '../../../images/twitter_icon.png';
import github from '../../../images/github_icon.png';

const ChartInfo = ({
 curr, dateRangeChange, days, cryptoImage, value, coinInfo
}) => (
  <div>
    <nav className="nav nav-pills nav-fill">
      <span className="nav-item nav-link nav-chartInfo">
        {`${value} Details`}
      </span>
    </nav>
    <div className="chartInfoChild">
      <img
        alt=""
        className="cryptoImageBackgroundChartInfo"
        src={cryptoImage}
        id={`cryptoImageBackgroundChartInfo ${value}`}
      />
      <div
        className="coinInfo"
        id={`coinInfo ${value}`}
      >
        <li>
          <span>
          Rank
          </span>
          <span className="right black">
            {coinInfo.rank}
          </span>
        </li>
        <li>
          <span>
          1 Hour
          </span>
          <span className={coinInfo.change1h <= 0 ? 'redText right' : 'greenText right'}>
            {coinInfo.change1h}
            %
            {coinInfo.change1h <= 0 ? '↓' : '↑'}
          </span>
        </li>
        <li>
          <span>
          7 Day
          </span>
          <span className={coinInfo.change7d <= 0 ? 'redText right' : 'greenText right'}>
            {coinInfo.change7d}
          %
          {coinInfo.change7d <= 0 ? '↓' : '↑'}
          </span>
        </li>
        {days !== 1500 ? (
          <li>
            <span>
              {`${days} Day`}
            </span>
            <span className={dateRangeChange <= 0 ? 'redText right' : 'greenText right'}>
              {dateRangeChange}
        %
        {dateRangeChange <= 0 ? '↓' : '↑'}
            </span>
          </li>
        ) : null}
        <li>
          <span>
          ATH Diff
          </span>
          <span className={coinInfo.athChange <= 0 ? 'redText right' : 'greenText right'}>
            {coinInfo.athChange}
          %
          {coinInfo.athChange <= 0 ? '↓' : '↑'}
          </span>
        </li>
        <div className="iconsContainer">
          <span className="tags flex-item">
            <a href={coinInfo.homepage} target="_blank" rel="noopener noreferrer">
              <img className="tagIcons" src={home} alt="home" />
            </a>
          </span>
          <span className="tags flex-item">
            <a href={`https://www.twitter.com/${coinInfo.twitter_handle}`} target="_blank" rel="noopener noreferrer">
              <img className="tagIcons" src={twitter} alt="home" />
            </a>
          </span>
          <span className="tags flex-item">
            <a href={`https://www.facebook.com/${coinInfo.facebook_username}`} target="_blank" rel="noopener noreferrer">
              <img className="tagIcons" src={facebook} alt="home" />
            </a>
          </span>
          <span className="tags flex-item">
            <a href={coinInfo.subreddit} target="_blank" rel="noopener noreferrer">
              <img className="tagIcons" src={reddit} alt="home" />
            </a>
          </span>
          <span className="tags flex-item">
            <a href={coinInfo.github} target="_blank" rel="noopener noreferrer">
              <img className="tagIcons" src={github} alt="home" />
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
);


export default ChartInfo;
