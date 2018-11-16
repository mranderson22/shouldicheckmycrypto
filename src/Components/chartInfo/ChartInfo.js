import React from 'react';

const ChartInfo = ({rank, currentPrice, currentPrice2, maxSupply, availableSupply, marketCap,
oneDayVolume, oneHour, oneDay, seven, oneHour2, oneDay2, seven2, curr}) => {
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
          {maxSupply
            ?
            (
              <li>
                { `Max Supply: ${maxSupply}` }
                { ' \u00A0 ' }
              </li>
            )
            :
            (
              <li>
                { 'Max Supply: Not Available' }
                { ' \u00A0 ' }
              </li>
            )
        }
          <li>
            { `Available Supply: ${availableSupply}` }
            { ' \u00A0 ' }
          </li>
          <li>
            { `Market Cap: $${marketCap}` }
            { ' \u00A0 ' }
          </li>
          <li>
            { `24 Hour Volume: ${oneDayVolume}` }
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
            {maxSupply
              ?
              (
                <li>
                  { `Max Supply: ${maxSupply}` }
                  { ' \u00A0 ' }
                </li>
              )
              :
              (
                <li>
                  { 'Max Supply: Not Available' }
                  { ' \u00A0 ' }
                </li>
              )
          }
            <li>
              { `Available Supply: ${availableSupply}` }
              { ' \u00A0 ' }
            </li>
            <li>
              { `Market Cap: ${marketCap}` }
              { ' \u00A0 ' }
            </li>
            <li>
              { `24 Hour Volume: $${oneDayVolume}` }
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
            </div>
          </div>)}
    </div>
);
};

export default ChartInfo;
