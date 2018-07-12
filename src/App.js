import React, {Component} from 'react';
import Header from './components/header/header';
import Answerisyes from './Components/answerisyes/answerisyes';
import Answerisno from './Components/answerisno/answerisno';
import Yesdashboard from './Components/yesdashboard/yesdashboard';
import style from './app.css';
import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: "bitcoin",
          name: "Bitcoin",
          symbol: "BTC",
          price_usd: "1",
          percent_change_1h: "0",
          percent_change_24h: "0",
          percent_change_7d: "0",
        },
      ]
    };
  }

  componentDidMount() {
      this.fetchCryptocurrencyData();
  }

  fetchCryptocurrencyData() {
    axios.get('https://api.coinmarketcap.com/v1/ticker/')
      .then(response => {
        const wanted = ["bitcoin"];
        const result = response.data.filter(currency => wanted.includes(currency.id));

        this.setState({ data: result });
      })
      .catch(err => console.log(err));
  }

  render () {
    if (Number(this.state.data[0].percent_change_24h) > 0) {
      return (
        <div>
          <Header />
          <Answerisyes packet={this.state.data} />
          <Yesdashboard />
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <Answerisno packet={this.state.data} />
        </div>
      );
    }
  }
}

export default App;
