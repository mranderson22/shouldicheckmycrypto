import React from 'react';
import './coinSearch.css';
import {
  Button, Form, Label, Input, FormGroup, Tooltip
} from 'reactstrap';

const CoinSearch = ({ setUserInput, inputValue, handleChange, value }) => (
  <div className="cryptoImageContainer">
    <div className="cryptoInput">
      <Form inline onSubmit={setUserInput}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="Name">
            <Input name="userInput" className="textField" value={inputValue} type="text" onChange={handleChange} placeholder="ex. LTC" maxLength="12" />
            <div className="coinSearchTooltip">
              <span id={`userInput ${value}`} className="tooltipText">
                {'Coin not found!'}
              </span>
            </div>
          </Label>
        </FormGroup>
        <Button className="cryptoSubmit" disabled={!inputValue}>GO</Button>
      </Form>
    </div>
  </div>
);

export default CoinSearch;
