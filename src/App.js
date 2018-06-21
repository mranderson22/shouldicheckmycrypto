import React, {Component} from 'react';
import Header from './Components/Header';
import Answer from './Components/Answer';
import style from './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Answer />
      </div>
    );
  }
}

export default App;
