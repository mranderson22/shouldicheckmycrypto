import React, {Component} from 'react';
import style from './Answerisyes.css';
import lockbody from '../../../images/unlockbody.png';
import posed from "react-pose";



class Answerisyes extends Component {

  render() {

    const data = this.props.packet;

    let text = '';

    if (Number(data[0].percent_change_24h) > 5) {
      text = 'yes.';
    } else {
      text = 'probably';
    }

    let config = {
      visible: {
        opacity: 1,
        transition: { duration: 600 }
      },
      hidden: {
        opacity: 0,
        transition: { duration: 600 }
      },

    }

    const scrollToBottom = () => window.scroll({
      top: 2500,
      left: 0,
      behavior: 'smooth'
    });

    const Hidden = posed.div(config);






    return (
      <div className='Answeryesbackground'>
        <div className="Answeryes">
          <div className="Answerboxyes">
            <Hidden initialPose='hidden' pose='visible'>  {text}  </Hidden>
          </div>
        <img className="unlockbody" src={lockbody} onClick={scrollToBottom} />
      </div>
    </div>
    );
  }
}

export default Answerisyes;
