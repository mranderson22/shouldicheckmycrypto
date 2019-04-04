import React from 'react';
import PropTypes from 'prop-types';
import './coinSearch.css';
import {
  Button, Form, Label, Input, FormGroup
} from 'reactstrap';

const CoinSearch = ({
  setUserInput, inputValue, handleChange, coin1
}) => (
  <div className="cryptoInputContainer">
    <div className="cryptoInput">
      <Form inline onSubmit={setUserInput}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="Name">
            <Input name="userInput" autoComplete="off" className="textField" value={inputValue} type="text" onChange={handleChange} placeholder="ex. XMR" maxLength="12" />
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
  setUserInput: PropTypes.func,
  inputValue: PropTypes.string,
  handleChange: PropTypes.func,
  coin1: PropTypes.string
};

CoinSearch.defaultProps = {
  setUserInput: PropTypes.func,
  inputValue: PropTypes.string,
  handleChange: PropTypes.func,
  coin1: PropTypes.string
};

export default CoinSearch;
