import React from 'react';
import './Graph.css';
import 'react-moment';
import posed from 'react-pose';
import {
  Button, ButtonGroup, Form, Label, Input, FormGroup
} from 'reactstrap';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const Resize2 = posed.div({
  initial: {
    width: '30vw'
  },
  resized: {
    width: '20vw'
  }
});

const Graph = (props) => {
  const {
    answer, handleChange, handleSubmit, isEnabled, onHistoryChange, freshReveal,
    dataNew, graphData, cryptoImage, changeCurrency, value, curr
  } = props;

  const { name } = dataNew[0];
  const currentPrice = parseFloat(dataNew[0].price_usd).toFixed(2);
  const { rank } = dataNew[0];
  const seven = dataNew[0].percent_change_7d;
  const Image = `https://www.cryptocompare.com/${cryptoImage}`;

  return (
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
      <div className="currSelector">
        <ButtonGroup>
          <Button className="currButton" onClick={() => {
            changeCurrency('USD');
          }
        }>
            USD
          </Button>
          <Button className="currButton" onClick={() => {
            changeCurrency('BTC');
          }
        }>
            BTC
          </Button>
        </ButtonGroup>
      </div>
      <div className="Nochartheader">
        <div className="name">
          { `${name} / ${curr}`}
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
  );
};


Graph.propTypes = {
  freshReveal: PropTypes.bool,
  onHistoryChange: PropTypes.func,
  dataNew: PropTypes.array,
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
  graphData: PropTypes.object,
  answer: PropTypes.bool,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isEnabled: PropTypes.bool
};


export default Graph;
