import React from 'react';
import './Yesdashboard.css';
import 'react-moment';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';


const Yesdashboard = ({ packet, data }) => {
  Yesdashboard.propTypes = {
    packet: PropTypes.string,
    data: PropTypes.string
  };

  Yesdashboard.defaultProps = {
    packet: 'test',
    data: 'test'
  };


  const history = (packet);

  const { name } = data[0];

  const currentPrice = parseFloat(data[0].price_usd).toFixed(2);

  const { rank } = data[0];

  const seven = data[0].percent_change_7d;

  const points = {};

  history.forEach((pos) => {
    const { time } = pos;
    (pos).time = moment.unix(time).format('YYYY-MM-DD');
  });

  for (let historyIndex = 0; historyIndex < history.length; historyIndex++) {
    const stringTime = history[historyIndex].time;

    points[stringTime] = history[historyIndex].close;
  }


  return (
    <div className="Yesdashboardcontainer">
      <div className="Yesdashboard">
        <div>
          <div className="Yeschartheader">
            <h2>
              { name }
            </h2>
            <p>
              { `Rank: ${rank}` }
              { ' \u00A0 '}
              { `Current Price: ${currentPrice}` }
              { ' \u00A0 ' }
              { `Last 7 Days: ${seven}` }
            </p>
          </div>
        </div>
        <div className="YesGraph">
          <LineChart library={{ scales: { xAxes: [{ ticks: { display: false } }], yAxes: [{ ticks: { display: false } }] } }} dataset={{ borderWidth: 2, pointBackgroundColor: 'grey' }} colors={['black', '#2e96249e']} discrete={false} curve={false} width="75vw" height="30vh" min={null} data={points} />
        </div>
      </div>
    </div>
  );
};

ReactChartkick.addAdapter(Chart);
export default Yesdashboard;
