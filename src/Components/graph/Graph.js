import React, { Component } from 'react';
import './Graph.css';
import 'react-moment';
import posed from 'react-pose';
import {
  Button, Form, Label, Input, FormGroup
} from 'reactstrap';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const Reveal = posed.div({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 500 },
    delay: 600
  }
});

const Resize = posed.div({
  initial: {
    width: '75vw',
    left: '50%'
  },
  resized: {
    width: '45vw',
    left: '26%'
  }
});

const Resize2 = posed.div({
  initial: {
    width: '30vw'
  },
  resized: {
    width: '20vw'
  }
});

class Graph extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  render() {
    const { answer } = this.props;
    const { handleChange } = this.props;
    const { handleSubmit } = this.props;
    const { isEnabled } = this.props;
    const { onHistoryChange } = this.props;
    const { freshReveal } = this.props;
    const { isGraphVisible } = this.props;
    const { dataNew } = this.props;
    const { graphData } = this.props;
    const { name } = dataNew[0];
    const currentPrice = parseFloat(dataNew[0].price_usd).toFixed(2);
    const { rank } = dataNew[0];
    const seven = dataNew[0].percent_change_7d;
    const { cryptoImage } = this.props;
    const Image = `https://www.cryptocompare.com/${cryptoImage}`;

    return (
      <Reveal pose={isGraphVisible ? 'visible' : 'hidden'}>
        <Resize className="NoGraph" pose={freshReveal ? 'resized' : 'initial'}>
          <div className={`${answer ? 'Yes' : 'No'}GraphChild`}>
            <div className="cryptoImageContainer">
              <img alt="" className="cryptoImage" src={Image} />
              <div className="cryptoInput">
                <Form inline onSubmit={handleSubmit}>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="Name">
                      <Input type="text" onChange={handleChange} placeholder="ex. ETH" />
                    </Label>
                  </FormGroup>
                  <Button className="cryptoSubmit" disabled={!isEnabled}>
                    GO
                  </Button>
                </Form>
              </div>
            </div>
            <Resize2 pose={freshReveal ? 'resized' : 'initial'}>
              <img alt="" className="cryptoImageBackground" src={Image} />
            </Resize2>
            <div className="Nochartheader">
              <div className="name">
                { name }
              </div>
              <p className="coinInfo">
                { `Rank: ${rank}` }
                { ' \u00A0 '}
                { `Current Price: $${currentPrice}` }
                { ' \u00A0 ' }
                { `Last 7 Days: ${seven}%` }
              </p>
            </div>
            <div className="NoChartActual">
              <Line
                data={graphData}
                maintainAspectRatio={false}
                options={{
                  legend: {
                    display: false
                  },
                  tooltips: {
                    displayColors: false
                  },
                  scales: {
                    yAxes: [{
                      ticks: {
                        fontColor: 'black'
                      }
                    }],
                    xAxes: [{
                      ticks: {
                        maxTicksLimit: 15,
                        fontColor: 'black'
                      }
                    }]
                  }
                }}
              />
            </div>

            <div className="daysselector">
              <Button
                className="selectorButtons"
                color="primary"
                onClick={() => {
                  onHistoryChange(30);
                }
              }
              >
                { 30 }
              </Button>
              { ' \u00A0 '}
              { ' \u00A0 '}
              <Button
                className="selectorButtons"
                color="primary"
                onClick={() => {
                  onHistoryChange(60);
                }
              }
              >
                { 60 }
              </Button>
              { ' \u00A0 '}
              { ' \u00A0 '}
              <Button
                className="selectorButtons"
                color="primary"
                onClick={() => {
                  onHistoryChange(90);
                }
              }
              >
                { 90 }
              </Button>
            </div>
          </div>
        </Resize>
      </Reveal>
    );
  }
}

Graph.propTypes = {
  freshReveal: PropTypes.bool,
  onHistoryChange: PropTypes.func,
  dataNew: PropTypes.array,
  isGraphVisible: PropTypes.bool,
  graphData: PropTypes.object,
  answer: PropTypes.bool,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isEnabled: PropTypes.bool
};

Graph.defaultProps = {
  freshReveal: PropTypes.bool,
  onHistoryChange: PropTypes.func,
  dataNew: PropTypes.array,
  isGraphVisible: PropTypes.bool,
  graphData: PropTypes.object,
  answer: PropTypes.bool,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isEnabled: PropTypes.bool
};


export default Graph;
