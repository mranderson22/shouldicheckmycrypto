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
      historythirty: [],
      historysixty: [],
      historyninety: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
    this.fetchCryptocurrencyData();
    axios.all([
      axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=30'),
      axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=60'),
      axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=90')
    ])
      .then(axios.spread((responsethirty, responsesixty, responseninety) => {
        const historythirty = responsethirty.data.Data;
        const historysixty = responsesixty.data.Data;
        const historyninety = responseninety.data.Data;
        this.setState({ historythirty, historysixty, historyninety });
      }));
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
    const { historythirty } = this.state;
    const { historysixty } = this.state;
    const { historyninety } = this.state;

    if ((loading) === true) {
      return (
        <div className="spinnercontainer">
          <div className="spinner">
            <Loader type="Ball-Triangle" color="yellow" height={120} width={120} />
          </div>
        </div>
      );
    }
    if (Number((data)[0].percent_change_24h) > 20) {
      return (
        <div>
          <Header />
          <Answerisyes packet={data} />
          <Yesdashboard
            historythirty={historythirty}
            historysixty={historysixty}
            historyninety={historyninety}
            data={data}
          />
        </div>
      );
    }
    return (
      <div>
        <Header />
        <Answerisno packet={data} />
        <Nodashboard
          historythirty={historythirty}
          historysixty={historysixty}
          historyninety={historyninety}
          data={data}
        />
      </div>
    );
  }
}

export default App;
