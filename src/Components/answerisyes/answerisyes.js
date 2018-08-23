import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import './Answerisyes.css';
import arrows from '../../../images/arrows.png';


const Answerisyes = ({ packet }) => {
  Answerisyes.propTypes = {
    packet: PropTypes.string
  };

  Answerisyes.defaultProps = {
    packet: 'test'
  };

  const data = (packet);

  let text = '';

  if (Number(data[0].percent_change_24h) > 5) {
    text = 'yes.';
  }
  else {
    text = 'probably';
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

  const scrollToBottom = () => window.scroll({
    top: 2500,
    left: 0,
    behavior: 'smooth'
  });

  const Hidden = posed.div(config);


  return (
    <div className="Answeryesbackground">
      <div className="Answeryes">
        <div className="Answerboxyes">
          <Hidden initialPose="hidden" pose="visible">
            {text}
          </Hidden>
        </div>
        <div onClick={scrollToBottom} onKeyDown={scrollToBottom} role="button" tabIndex={0}>
          <img alt="" className="unlockbody" src={arrows} />
        </div>
      </div>
    </div>
  );
};


export default Answerisyes;
