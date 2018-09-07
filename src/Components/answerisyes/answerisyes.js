import React, { Component } from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import './Answerisyes.css';
import arrows from '../../../images/arrows.png';
import Yesdashboard from '../yesdashboard/Yesdashboard';

const Reveal = posed.div({
  hidden: {
    opacity: 0,
    x: 0,
    y: -10
  },
  visible: {
    opacity: 1,
    transition: { duration: 1000 },
    x: 0,
    y: 0
  }
});

const Reveal2 = posed.div({
  hidden: {
    opacity: 0,
    x: 0,
    y: 10
  },
  visible: {
    opacity: 1,
    transition: { duration: 1000 },
    x: 0,
    y: 0,
    delay: 200
  }
});

const Hover = posed.div({
  idle: { scale: 1 },
  hovered: { scale: 1.3 }
});

class Answerisyes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showComponent: false,
      isVisible: false,
      text: '',
      hovering: false
    };
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  componentDidMount() {
    this.setMood();
    this.setState({ isVisible: 'true' });
  }

  onButtonClick() {
    this.setState({ showComponent: true }, () => {
      this.scrollToBottom();
    });
  }

  setMood() {
    const { data } = this.props;

    if (Number(data[0].percent_change_24h) > 5) {
      this.setState({ text: 'yes.' });
    }
    else {
      this.setState({ text: 'probably' });
    }
  }

  scrollToBottom() {
    window.scrollBy({
      left: 0,
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }

  render() {
    const { isVisible } = this.state;
    const { text } = this.state;
    const { data } = this.props;
    const { historythirty } = this.props;
    const { historysixty } = this.props;
    const { historyninety } = this.props;
    const { showComponent } = this.state;
    const { hovering } = this.state;


    return (
      <div className="Answeryesbackground">
        <div className="Answeryes">
          <div className="Answerboxyes">
            <Reveal pose={isVisible ? 'visible' : 'hidden'}>
              {text}
            </Reveal>
          </div>
          <Hover
            className="unlockbody"
            pose={hovering ? 'hovered' : 'idle'}
            onMouseEnter={() => this.setState({ hovering: true })}
            onMouseLeave={() => this.setState({ hovering: false })}
          >
            <div
              onClick={this.onButtonClick}
              onKeyDown={this.onButtonClick}
              role="button"
              tabIndex={0}
            >
              <Reveal2 pose={isVisible ? 'visible' : 'hidden'}>
                <div>
                  <img alt="" src={arrows} />
                </div>
              </Reveal2>
            </div>
          </Hover>
        </div>
        <div>
          {showComponent ? (
            <Yesdashboard
              historythirty={historythirty}
              historysixty={historysixty}
              historyninety={historyninety}
              data={data}
            />
          )
            : null
          }
        </div>
      </div>
    );
  }
}


Answerisyes.propTypes = {
  historythirty: PropTypes.array,
  historysixty: PropTypes.array,
  historyninety: PropTypes.array,
  data: PropTypes.array
};

Answerisyes.defaultProps = {
  historythirty: 'historythirty',
  historysixty: 'historysixty',
  historyninety: 'historyninety',
  data: 'data'
};


export default Answerisyes;
