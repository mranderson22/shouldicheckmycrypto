import React, {Component} from 'react';
import style from './Answerisno.css';
import lockbody from '../../../images/lockbody.png';
import posed from "react-pose";



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

    const scrollToBottom = () => {
      window.scroll({
      top: 2500,
      left: 0,
      behavior: 'smooth'
    });
      document.body.style.overflow = 'visible';
    }

    const Hidden = posed.div(config);


    return (
      <div className="Answernobackground">
        <div className="Answerno">
          <div className="Answerboxno">
            <Hidden initialPose='hidden' pose='visible'>  {text}  </Hidden>
          </div>
        <img className="lockbody" src={lockbody} onClick={scrollToBottom} />
      </div>
    </div>
    );
  }
}

export default Answerisno;
