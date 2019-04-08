import React from 'react';
import PropTypes from 'prop-types';
import './coinSearch.css';
import {
  Button, Form, Label, Input, FormGroup
} from 'reactstrap';

const CoinSearch = ({
  setUserInput, inputValue, handleInputChange, coin1, graphID
}) => (
  <div className="cryptoInputContainer">
    <div className="cryptoInput">
      <Form inline onSubmit={setUserInput}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="Name">
            <Input name="userInput" autoComplete="off" className="textField" value={inputValue} type="text" onChange={event => handleInputChange(graphID, event)} placeholder="ex. XMR" maxLength="12" />
            <div className="coinSearchTooltip">
              <span id={`userInput ${coin1}`} className="tooltipText">
                {'Coin not found!'}
              </span>
            </div>
          </Label>
        </FormGroup>
        <Button className="cryptoSubmit" disabled={!inputValue}>
          {'GO'}
        </Button>
      </Form>
    </div>
  </div>
);

CoinSearch.propTypes = {
  graphID: PropTypes.any,
  setUserInput: PropTypes.func,
  inputValue: PropTypes.string,
  handleInputChange: PropTypes.func,
  coin1: PropTypes.string
};

CoinSearch.defaultProps = {
  graphID: PropTypes.any,
  setUserInput: PropTypes.func,
  inputValue: PropTypes.string,
  handleInputChange: PropTypes.func,
  coin1: PropTypes.string
};

export default CoinSearch;
