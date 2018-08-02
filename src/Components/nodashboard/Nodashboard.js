import React, {Component} from 'react';
import style from './Nodashboard.css';
import Moment from 'react-moment';
import moment from 'moment';
import ReactChartKick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';



class Nodashboard extends Component {

  render() {

    const data = this.props.packet;

    data.forEach(pos => {
      const time = pos.time;
      pos['time'] = moment.unix(time).format('YYYY-MM-DD');
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
      <div className="Nodashboardcontainer">
        <div className="Nodashboard">
          <div className="Graph">
            <LineChart xtitle="Last 10 Days" ytitle="USD" colors={["#880410b5", "#880410b5"]} curve={false} width="70vw" height="40vh" min={null} data={points} />
          </div>
        </div>
      </div>
    );
  }
}

export default Nodashboard;
