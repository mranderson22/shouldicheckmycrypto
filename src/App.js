import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import Header from './Components/header/Header';
import Answerisyes from './Components/answerisyes/Answerisyes';
import Answerisno from './Components/answerisno/Answerisno';
import Yesdashboard from './Components/yesdashboard/Yesdashboard';
import Nodashboard from './Components/nodashboard/Nodashboard';
import './app.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      history: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1200);
    this.fetchCryptocurrencyData();
    axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=30')
      .then((response) => {
        const history = response.data.Data;
        this.setState({ history });
      });
  }

  fetchCryptocurrencyData() {
    axios.get('https://api.coinmarketcap.com/v1/ticker/')
      .then((response) => {
        const wanted = ['bitcoin'];
        const result = response.data.filter(currency => wanted.includes(currency.id));
        this.setState({ data: result });
      });
  }


  render() {
    // React destructuring assignment
    const { data } = this.state;
    const { loading } = this.state;
    const { history } = this.state;

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
          <Answerisyes packet={data} />
          <Yesdashboard packet={history} data={data} />
        </div>
      );
    }
    return (
      <div>
        <Header />
        <Answerisno packet={data} />
        <Nodashboard packet={history} data={data} />
      </div>
    );
  }
}

export default App;
