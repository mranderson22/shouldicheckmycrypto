import React from 'react';
import './ChartInfo.css';

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
          1 Hour Change
          </span>
          <span className={coinInfo.change1h <= 0 ? 'redText right' : 'greenText right'}>
            {coinInfo.change1h}
            %
          </span>
        </li>
        <li>
          <span>
          7 Day Change
          </span>
          <span className={coinInfo.change7d <= 0 ? 'redText right' : 'greenText right'}>
            {coinInfo.change7d}
          %
          </span>
        </li>
        {days !== 1500 ? (
          <li>
          <span>
            {days}
          Day Change
          </span>
            <span className={dateRangeChange <= 0 ? 'redText right' : 'greenText right'}>
              {dateRangeChange}
        %
            </span>
          </li>
        ) : null}
        <li>
          <span>
          Website
          </span>
          <span className="tags badge badge-light">
            <a href={coinInfo.homepage} target="_blank" rel="noopener noreferrer">
            Home
            </a>
          </span>
        </li>
      </div>
    </div>
  </div>
);


export default ChartInfo;
