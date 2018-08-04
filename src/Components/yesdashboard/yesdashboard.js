import React from 'react';
import './Yesdashboard.css';
import 'react-moment';
import moment from 'moment';
import PropTypes from 'prop-types';
import { LineChart } from 'react-chartkick';
import 'chart.js';


const Yesdashboard = ({ packet }) => {
  Yesdashboard.propTypes = {
    packet: PropTypes.string
  };

  Yesdashboard.defaultProps = {
    packet: 'test'
  };

  const data = (packet);

  data.forEach((pos) => {
    const { time } = pos;
    (pos).time = moment.unix(time).format('YYYY-MM-DD');
  });

  /*
    data.forEach(pos => {
    const close = pos.close;
    pos['close'] = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(close);
    })
*/

  const points = {};

  for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
    const stringTime = data[dataIndex].time;

    points[stringTime] = data[dataIndex].close;
  }


  return (
    <div className="Yesdashboardcontainer">
      <div className="Yesdashboard">
        <div className="Graph">
          <LineChart xtitle="Last 10 Days" ytitle="USD" colors={['#2e96249e', '#2e96249e']} curve={false} width="70vw" height="40vh" min={null} data={points} />
        </div>
      </div>
    </div>
  );
};


export default Yesdashboard;
