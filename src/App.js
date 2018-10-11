import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import Answerisno from './Components/answerisno/Answerisno';
import './app.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      answer: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
    this.fetchCryptocurrencyData();
  }


  fetchCryptocurrencyData() {
    axios.get('https://api.coinmarketcap.com/v1/ticker/')
      .then((response) => {
        const result = response.data;
        this.setState({ data: result }, () => {
          this.answer();
        });
      });
  }

  answer() {
    const { data } = this.state;
    if (Number((data)[0].percent_change_24h) > 0) {
      this.setState({ answer: true });
    }
  }

  render() {
    // React destructuring assignment
    const { data } = this.state;
    const { loading } = this.state;
    const { answer } = this.state;


    if ((loading) === true) {
      return (
        <div className="spinnercontainer">
          <div className="spinner">
            <Loader type="Ball-Triangle" color="yellow" height={120} width={120} />
          </div>
        </div>
      );
    }

    return (
      <div>
        <Answerisno
          data={data}
          answer={answer}
        />
      </div>
    );
  }
}


export default App;
