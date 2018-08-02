import React, {Component} from 'react';
import Header from './Components/header/header';
import Answerisyes from './Components/answerisyes/answerisyes';
import Answerisno from './Components/answerisno/answerisno';
import Yesdashboard from './Components/yesdashboard/yesdashboard';
import Nodashboard from './Components/nodashboard/nodashboard';
import style from './app.css';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import Moment from 'react-moment';
import moment from 'moment';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      history: [

    ]
    };
  }



  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: false})
    },1200),
      this.fetchCryptocurrencyData();
      axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=10')
      .then(response => {
        const history = response.data.Data;


        this.setState({history: history});
      })
      .catch(err => console.log(err));
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


    if (this.state.loading === true) {
      return (
        <div className="spinnercontainer">
        <div className="spinner">
        <Loader type="Ball-Triangle" color="yellow" height={120} width={120} />
    </div>
    </div>
      )
    }
    if (Number(this.state.data[0].percent_change_24h) > 0) {
      return (
        <div>
          <Header />
          <Answerisyes packet={this.state.data} />
          <Yesdashboard packet ={this.state.history}/>
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <Answerisno packet={this.state.data} />
          <Nodashboard packet ={this.state.history}/>
        </div>
      );
    }
  }
}

export default App;
