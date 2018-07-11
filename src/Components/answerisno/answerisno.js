import React, {Component} from 'react';
import style from './answerisno.css';
import lockbody from '../../../images/lockbody.png';



class answerisno extends Component {
  render() {
    const data = this.props.packet;
    let text = '';

    if (Number(data[0].percent_change_24h) > -5) {
      text = 'meh';
    } else {
      text = 'nope.';
    }
    return (
        <div className="answerno">
          <div className="answerboxno">
            {text}
          </div>
        <img className="lockbody" src={lockbody} />
      </div>
    );
  }
}

export default answerisno;
