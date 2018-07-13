import React, {Component} from 'react';
import style from './answerisyes.css';
import lockbody from '../../../images/unlockbody.png';




class answerisyes extends Component {
  render() {
    const data = this.props.packet;


    let text = '';

    if (Number(data[0].percent_change_24h) > 5) {
      text = 'yes.';
    } else {
      text = 'probably';
    }
    return (
      <div>
        <div className="answeryes">
          <div className="answerboxyes">
              {text}
          </div>
        <img className="unlockbody" src={lockbody} />
      </div>
    </div>
    );
  }
}

export default answerisyes;
