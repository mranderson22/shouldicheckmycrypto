import React from 'react';

const ChartInfo = ({rank, currentPrice, currentPrice2, maxSupply, availableSupply, marketCap,
oneDayVolume, oneHour, oneDay, seven, oneHour2, oneDay2, seven2, curr,
dateRangeChange, dateRangeChange2, days, days2 }) => {
  return (
    <div>
      {curr === 'USD' ? (
        <div className="coinInfo">
          <li>
            { `Rank: ${rank}` }
            { ' \u00A0 '}
          </li>
          <li>
            { `Current Price: $${currentPrice}` }
            { ' \u00A0 ' }
          </li>
          <div className="percentageWrapper">
            <li>
            1 Hour Change:
              <span className={oneHour <= 0 ? 'redText' : 'greenText'}>
                {` ${oneHour}`}
              %
              </span>
            </li>
            <li>
            1 Day Change:
              <span className={oneDay <= 0 ? 'redText' : 'greenText'}>
                {` ${oneDay}`}
              %
              </span>
            </li>
            <li>
            7 Day Change:
              <span className={seven <= 0 ? 'redText' : 'greenText'}>
                {` ${seven}`}
              %
              </span>
            </li>
            <li>
            {` ${days} Day Change: `}
              <span className={dateRangeChange <= 0 ? 'redText' : 'greenText'}>
                {` ${dateRangeChange}`}
              %
              </span>
            </li>
          </div>
        </div>) : (
          <div className="coinInfo">
            <li>
              { `Rank: ${rank}` }
              { ' \u00A0 '}
            </li>
            <li>
              { `Current Price: ${currentPrice2} BTC` }
              { ' \u00A0 ' }
            </li>
            <div className="percentageWrapper">
              <li>
              1 Hour Change:
                <span className={oneHour <= 0 ? 'redText' : 'greenText'}>
                  {` ${oneHour2}`}
                %
                </span>
              </li>
              <li>
              1 Day Change:
                <span className={oneDay <= 0 ? 'redText' : 'greenText'}>
                  {` ${oneDay2}`}
                %
                </span>
              </li>
              <li>
              7 Day Change:
                <span className={seven <= 0 ? 'redText' : 'greenText'}>
                  {` ${seven2}`}
                %
                </span>
              </li>
              <li>
              {` ${days} Day Change: `}
                <span className={dateRangeChange <= 0 ? 'redText' : 'greenText'}>
                  {` ${dateRangeChange}`}
                %
                </span>
              </li>
            </div>
          </div>)}
    </div>
);
};

export default ChartInfo;
