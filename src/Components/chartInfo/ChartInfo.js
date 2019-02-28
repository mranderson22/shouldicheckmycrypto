import React from 'react';
import './ChartInfo.css';

const ChartInfo = ({
 rank, currentPrice, currentPrice2, maxSupply, availableSupply, marketCap,
oneDayVolume, oneHour, oneDay, seven, oneHour2, oneDay2, seven2, curr,
dateRangeChange, dateRangeChange2, days, days2, name, cryptoImage, value, coinInfo
}) => {
  return (
    <div>
    <nav className="nav nav-pills nav-fill">
    <a className={"nav-item nav-link nav-chartInfo"}>{`${value} Details`}</a>
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
            <span>Rank</span>
            <span className="right black">{coinInfo.rank}</span>
          </li>
          <li>
            <span>Current Price</span>
            <span className={oneDay <= 0 ? 'redText right' : 'greenText right'}>${curr === 'USD' ? parseFloat(coinInfo.price).toFixed(2) : parseFloat(coinInfo.price).toFixed(8)}</span>
          </li>
          <li>
            <span>1 Hour Change</span>
            <span className={oneHour <= 0 ? 'redText right' : 'greenText right'}>{coinInfo.change1h}%</span>
          </li>
          <li>
            <span>1 Day Change</span>
            <span className={oneDay <= 0 ? 'redText right' : 'greenText right'}>{coinInfo.change24h}%</span>
          </li>
          <li>
            <span>7 Day Change</span>
            <span className={seven <= 0 ? 'redText right' : 'greenText right'}>{coinInfo.change7d}%</span>
          </li>
          <li>
            <span>{days} Day Change </span>
            <span className={dateRangeChange <= 0 ? 'redText right' : 'greenText right'}>{dateRangeChange}%</span>
          </li>
          </div>
    </div>
    </div>
  );
};

export default ChartInfo;
