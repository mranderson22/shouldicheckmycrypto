import React from 'react';
import './ChartInfo.css';

const ChartInfo = ({
 rank, currentPrice, currentPrice2, maxSupply, availableSupply, marketCap,
oneDayVolume, oneHour, oneDay, seven, oneHour2, oneDay2, seven2, curr,
dateRangeChange, dateRangeChange2, days, days2, name, cryptoImage
}) => {
  return (
    <div className="chartInfoChild">
      <img alt="" className="cryptoImageBackgroundChartInfo" src={cryptoImage} />
      {curr === 'USD' ? (
        <div className="coinInfo">
          <li>
            <span>Coin</span>
            <span className="right">{name}</span>
          </li>
          <li>
            <span>Rank</span>
            <span className="right">{rank}</span>
          </li>
          <li>
            <span>Current Price</span>
            <span className="black right">${currentPrice}</span>
          </li>
          <li>
            <span>1 Hour Change</span>
            <span className={oneHour <= 0 ? 'redText right' : 'greenText right'}>{oneHour}%</span>
          </li>
          <li>
            <span>1 Day Change</span>
            <span className={oneDay <= 0 ? 'redText right' : 'greenText right'}>{oneDay}%</span>
          </li>
          <li>
            <span>7 Day Change</span>
            <span className={seven <= 0 ? 'redText right' : 'greenText right'}>{seven}%</span>
          </li>
          <li>
            <span>{days} Day Change </span>
            <span className={dateRangeChange <= 0 ? 'redText right' : 'greenText right'}>{dateRangeChange}%</span>
          </li>
          </div>) : (
            <div className="coinInfo">
              <li>
                <span>Coin</span>
                <span className="right">{name}</span>
              </li>
              <li>
                <span>Rank</span>
                <span className="right">{rank}</span>
              </li>
              <li>
                <span>Current Price</span>
                <span className="black right">${currentPrice2}</span>
              </li>
              <li>
                <span>1 Hour Change</span>
                <span className={oneHour2 <= 0 ? 'redText right' : 'greenText right'}>{oneHour2}%</span>
              </li>
              <li>
                <span>1 Day Change</span>
                <span className={oneDay2 <= 0 ? 'redText right' : 'greenText right'}>{oneDay2}%</span>
              </li>
              <li>
                <span>7 Day Change</span>
                <span className={seven2 <= 0 ? 'redText right' : 'greenText right'}>{seven2}%</span>
              </li>
              <li>
                <span>{days} Day Change </span>
                <span className={dateRangeChange <= 0 ? 'redText right' : 'greenText right'}>{dateRangeChange}%</span>
              </li>
              </div>)}
    </div>
  );
};

export default ChartInfo;
