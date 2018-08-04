import React from 'react';
import posed from 'react-pose';
import PropTypes from 'prop-types';
import './Answerisno.css';
import lockbody from '../../../images/lockbody.png';


const Answerisno = ({ packet }) => {
  Answerisno.propTypes = {
    packet: PropTypes.string
  };

  Answerisno.defaultProps = {
    packet: 'test'
  };


  document.body.style.overflow = 'hidden';

  const data = (packet);

  let text = '';

  if (Number(data[0].percent_change_24h) > -5) {
    text = 'meh';
  }
  else {
    text = 'nope.';
  }

  const config = {
    visible: {
      opacity: 1,
      transition: { duration: 600 }
    },
    hidden: {
      opacity: 0,
      transition: { duration: 600 }
    }
  };

  const scrollToBottom = () => {
    window.scroll({
      top: 2500,
      left: 0,
      behavior: 'smooth'
    });
    document.body.style.overflow = 'visible';
  };

  const Hidden = posed.div(config);


  return (
    <div className="Answernobackground">
      <div className="Answerno">
        <div className="Answerboxno">
          <Hidden initialPose="hidden" pose="visible">
            {text}
          </Hidden>
        </div>
        <div onClick={scrollToBottom} onKeyDown={scrollToBottom} role="button" tabIndex={0}>
          <img alt="" className="lockbody" src={lockbody} />
        </div>
      </div>
    </div>
  );
};


export default Answerisno;
