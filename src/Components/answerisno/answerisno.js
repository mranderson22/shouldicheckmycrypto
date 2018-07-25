import React, {Component} from 'react';
import style from './Answerisno.css';
import lockbody from '../../../images/lockbody.png';



class Answerisno extends Component {
  render() {
    document.body.style.overflow = 'hidden';
    const data = this.props.packet;
    let text = '';

    if (Number(data[0].percent_change_24h) > -5) {
      text = 'meh';
    } else {
      text = 'nope.';
    }

    function hideScrollbar() {
      document.body.style.overflow = 'visible';
    }

    return (
        <div className="Answerno">
          <div className="Answerboxno">
            {text}
          </div>
        <img className="lockbody" src={lockbody} onClick={hideScrollbar} />
      </div>
    );
  }
}

export default Answerisno;
