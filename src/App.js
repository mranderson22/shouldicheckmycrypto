import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import Header from './Components/header/Header';
import Answerisyes from './Components/answerisyes/Answerisyes';
import Answerisno from './Components/answerisno/Answerisno';
import './app.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: []
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
        this.setState({ data: result });
      });
  }


  render() {
    // React destructuring assignment
    const { data } = this.state;
    const { loading } = this.state;


    if ((loading) === true) {
      return (
        <div className="spinnercontainer">
          <div className="spinner">
            <Loader type="Ball-Triangle" color="yellow" height={120} width={120} />
          </div>
        </div>
      );
    }
    if (Number((data)[0].percent_change_24h) > 0) {
      return (
        <div>
          <Header />
          <Answerisyes
            data={data}

          />
        </div>
      );
    }
    return (
      <div>
        <Header />
        <Answerisno
          data={data}

        />
      </div>
    );
  }
}

export default App;
