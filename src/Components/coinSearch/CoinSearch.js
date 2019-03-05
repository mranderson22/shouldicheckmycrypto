import React from 'react';
import './coinSearch.css';
import {
  Button, Form, Label, Input, FormGroup
} from 'reactstrap';

const CoinSearch = ({ setUserInput, inputValue, handleChange, isEnabled }) => (
  <div className="cryptoImageContainer">
    <div className="cryptoInput">
      <Form inline onSubmit={setUserInput}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="Name">
            <Input name="userInput" className="textField" value={inputValue} type="text" onChange={handleChange} placeholder="ex. ETH" maxLength="12" />
          </Label>
        </FormGroup>
        <Button className="cryptoSubmit" disabled={!isEnabled}>GO</Button>
      </Form>
    </div>
  </div>
);

export default CoinSearch;
