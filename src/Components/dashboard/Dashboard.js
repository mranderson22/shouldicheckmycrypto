import React, { Component } from 'react';
import './dashboard.css';
import 'react-moment';
import axios from 'axios';
import posed from 'react-pose';
import {
  Button, Form, Label, Input, FormGroup
}
  from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'babel-polyfill';
import BitcoinTracker from '../bitcoinTracker/BitcoinTracker';
import Graph from '../graph/Graph';
import Sidebar from '../sidebar/Sidebar';
import plus from '../../../images/plus-button.png';
import burgerMenu from '../../../images/burgerMenu.png';

const Hover = posed.div({
  idle: { scale: 1 },
  hovered: { scale: 1.3 }
});

const Reveal2 = posed.div({
  hidden2: {
    opacity: 0
  },
  visible2: {
    opacity: 1,
    transition: { duration: 500 },
    delay: 600
  }
});

const Reveal3 = posed.div({
  hidden: {
    opacity: 0,
    transition: { duration: 800 },
    delay: 200
  },
  visible: {
    opacity: 1,
    transition: { duration: 800 },
    delay: 200
  },
  secondary: {
    opacity: 1,
    transition: { duration: 800 },
    delay: 200
  },
  movedOver: {
    opacity: 1,
    transition: { duration: 800 },
    delay: 200
  },
  fullSize: {
  }
});

const Reveal = posed.div({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 900 },
    delay: 400
  },
  visible2: {
    opacity: 1,
    transition: { duration: 900 },
    delay: 400
  },
  visible3: {
    opacity: 1,
    transition: { duration: 900 },
    delay: 400
  }
});

const Reveal5 = posed.div({
  hidden: {
    transform: 'translate(-100%, 0%)',
    transition: {
      transform: { ease: 'linear', duration: 5 }
    }
  },
  visible: {
    transform: 'translate(0%, 0%)',
    transition: {
      transform: { ease: 'linear', duration: 25 }
    }
  }
});

const Resize = posed.div({
  initial: {

  },
  resized: {

  },
  movedOver: {

  }

});

const Resize2ndGraph = posed.div({
  resized: {

  },
  initial: {

  },
  movedOver: {

  }

});

const BitcoinTrackerSlide = posed.div({
  hidden: {
    right: '-241px',
    transition: { ease: 'easeIn', duration: 400 },
    delay: 500
  },
  slideLeft: {
    right: '0px',
    transition: { ease: 'easeIn', duration: 400 },
    delay: 500
  }
});

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorites: [],
      inputValue: '',
      inputValue2: '',
      pose: 'initial',
      pose2: 'hidden',
      secondWasThere: false,
      sideBarOpener: false,
      sideBarOpener2: false,
      coin: 'BTC',
      coin2: 'ETH',
      curr: 'USD',
      curr2: 'USD',
      toggleCurr: false,
      toggleCurr2: true,
      isEnabled: false,
      isEnabled2: false,
      value: 'BTC',
      value2: 'ETH',
      coinLog: [],
      coinLog2: [],
      freshReveal: false,
      hovering: false,
      secondGraphVisible: false,
      isGraphVisible: false,
      cryptoImage: [],
      cryptoImage2: [],
      history: [],
      history2: [],
      graphData: {
        labels: [],
        datasets: [
          {
            data: []
          }
        ]
      },
      graphData2: {
        labels: [],
        datasets: [
          {
            data: []
          }
        ]
      }
    };
    this.changeCurrency1 = this.changeCurrency1.bind(this);
    this.changeCurrency2 = this.changeCurrency2.bind(this);
    this.onHistoryChange = this.onHistoryChange.bind(this);
    this.onHistoryChange2 = this.onHistoryChange2.bind(this);
    this.findSymbol = this.findSymbol.bind(this);
    this.addGraph = this.addGraph.bind(this);
    this.addSidebar = this.addSidebar.bind(this);
    this.setUserInput = this.setUserInput.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleSubmit3 = this.handleSubmit3.bind(this);
    this.handleSubmit4 = this.handleSubmit4.bind(this);
    this.handleSubmit5 = this.handleSubmit5.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
  }

  async componentDidMount() {
    const { isGraphVisible } = this.state;
    const { coinLog } = this.state;
    const { coinLog2 } = this.state;
    const { value } = this.state;
    const { value2 } = this.state;
    await coinLog.unshift(value);
    await coinLog2.unshift(value2);
    await this.fetchCryptocurrencyHistory(1);
    await this.fetchCryptocurrencyHistory(2);
    await this.getPoints(1);
    await this.getPoints(2);
    this.setState({ isGraphVisible: !isGraphVisible });
    if (localStorage.getItem('savedCoins') === null) {
      if (localStorage.getItem('savedCoins2') === null) {
        await this.fetchCryptocurrencyImage(2);
      }
      else {
        await this.getLocalStorageData(2);
      }
      await this.fetchCryptocurrencyImage(1);
    }
    else if (localStorage.getItem('savedCoins2') === null) {
      await this.fetchCryptocurrencyImage(2);
      await this.getLocalStorageData(1);
    }
    else {
      await this.getLocalStorageData(1);
      await this.getLocalStorageData(2);
    }
  }


  onHistoryChange(num = 30) {
    if (num === 30) {
      this.fetchCryptocurrencyHistory(1, 31);
    }
    else if (num === 60) {
      this.fetchCryptocurrencyHistory(1, 90);
    }
    else if (num === 180) {
      this.fetchCryptocurrencyHistory(1, 180);
    }
    else if (num === 365) {
      this.fetchCryptocurrencyHistory(1, 365);
    }
    else if (num === 1000) {
      this.fetchCryptocurrencyHistory(1, 1500);
    }
  }

  onHistoryChange2(num = 30) {
    if (num === 30) {
      this.fetchCryptocurrencyHistory(2, 31);
    }
    else if (num === 60) {
      this.fetchCryptocurrencyHistory(2, 90);
    }
    else if (num === 180) {
      this.fetchCryptocurrencyHistory(2, 180);
    }
    else if (num === 365) {
      this.fetchCryptocurrencyHistory(2, 365);
    }
    else if (num === 1000) {
      this.fetchCryptocurrencyHistory(2, 1500);
    }
  }

  getPoints(num = 1) {
    const graphCats = {
      history: [],
      labels: [],
      datasets: [
        {
          type: 'line',
          data: [],
          label: 'Closing Price',
          responsive: true,
          fill: false,
          lineTension: 0,
          backgroundColor: '#dad7d7',
          borderColor: '#dad7d7',
          borderWidth: 2.5,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#dad7d7',
          pointBackgroundColor: '#dad7d7',
          pointBorderWidth: 0,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: '#1E2938',
          pointHoverBorderColor: '#1E2938',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          yAxisID: 'y-axis-2'
        },
        {
          data: [],
          label: 'Volume',
          type: 'bar',
          yAxisID: 'y-axis-1',
          hoverBackgroundColor: '#1E2938',
          backgroundColor: 'rgba(30, 41, 56, 0.65)'
        }
      ]
    };
    if (num === 1) {
      const newGraphData = graphCats;
      const { history } = this.state;

      for (let historyIndex = 0; historyIndex < history.length; historyIndex++) {
        const label = history[historyIndex].time;
        const labeldata = history[historyIndex].close;
        const volumedata = history[historyIndex].volumeto;

        newGraphData.labels.push(label);
        newGraphData.datasets[0].data.push(labeldata);
        newGraphData.datasets[1].data.push(volumedata);
      }
      this.setState({ graphData: newGraphData });
    }
    else if (num === 2) {
      const newGraphData2 = graphCats;
      const { history2 } = this.state;

      for (let historyIndex = 0; historyIndex < history2.length; historyIndex++) {
        const label = history2[historyIndex].time;
        const labeldata = history2[historyIndex].close;
        const volumedata = history2[historyIndex].volumeto;

        newGraphData2.labels.push(label);
        newGraphData2.datasets[0].data.push(labeldata);
        newGraphData2.datasets[1].data.push(volumedata);
      }
      this.setState({ graphData2: newGraphData2 });
    }
  }

  async getLocalStorageData(num) {
    const BTC = '/media/19633/btc.png';
    const ETH = '/media/20646/eth_logo.png';
    const retrievedFavoriteCoins = localStorage.getItem('savedFavoriteCoins');
    const savedFavoriteCoinsNew = JSON.parse(retrievedFavoriteCoins);
    const retrievedCoins = localStorage.getItem('savedCoins');
    const retrievedCoinImages = localStorage.getItem('savedCoinImages');
    const savedCoinsNew = JSON.parse(retrievedCoins);
    const savedCoinImagesNew = JSON.parse(retrievedCoinImages);
    const retrievedCoins2 = localStorage.getItem('savedCoins2');
    const retrievedCoinImages2 = localStorage.getItem('savedCoinImages2');
    const savedCoinsNew2 = JSON.parse(retrievedCoins2);
    const savedCoinImagesNew2 = JSON.parse(retrievedCoinImages2);
    if (num === 1) {
      if (savedCoinImagesNew.indexOf(BTC) > 0) {
        savedCoinImagesNew.splice(savedCoinImagesNew.indexOf(BTC), 1);
        savedCoinImagesNew.unshift(BTC);
      }
      if (savedCoinsNew.indexOf('BTC') > 0) {
        savedCoinsNew.splice(savedCoinsNew.indexOf('BTC'), 1);
        savedCoinsNew.unshift('BTC');
      }
      this.setState({ coinLog: savedCoinsNew });
      this.setState({ cryptoImage: savedCoinImagesNew });
      if (savedFavoriteCoinsNew) {
        await this.setState({ favorites: savedFavoriteCoinsNew });
      }
    }
    else if (num === 2) {
      if (savedCoinImagesNew2.indexOf(ETH) > 0) {
        savedCoinImagesNew2.splice(savedCoinImagesNew2.indexOf(ETH), 1);
        savedCoinImagesNew2.unshift(ETH);
      }
      if (savedCoinsNew2.indexOf('ETH') > 0) {
        savedCoinsNew2.splice(savedCoinsNew2.indexOf('ETH'), 1);
        savedCoinsNew2.unshift('ETH');
      }
      this.setState({ coinLog2: savedCoinsNew2 });
      this.setState({ cryptoImage2: savedCoinImagesNew2 });
      if (savedFavoriteCoinsNew) {
        await this.setState({ favorites: savedFavoriteCoinsNew });
      }
    }
  }

  setUserInput(e) {
    const { graphFocus } = this.state;
    const { data } = this.props;
    const userInput = e.target.elements.userInput.value;
    const index = data.findIndex(coin => coin.id === userInput);
    e.preventDefault();
    this.setState(() => {
      if (graphFocus === 1) {
        if (index !== -1) {
          return {
            coin: data[index].symbol,
            value: data[index].symbol
          };
        }
        return {
          coin: userInput.toUpperCase(),
          value: userInput.toUpperCase()
        };
      } if (graphFocus === 2) {
        if (index !== -1) {
          return {
            coin2: data[index].symbol,
            value2: data[index].symbol
          };
        }
        return {
          coin2: userInput.toUpperCase(),
          value2: userInput.toUpperCase()
        };
      }
    }, () => {
      if (graphFocus === 1) {
        this.handleSubmit1(e);
      }
      else if (graphFocus === 2) {
        this.handleSubmit2(e);
      }
    });
  }

  getHistoryChange(num = 1) {
    const history = this.state;
    const history2 = this.state;
    let historyExt;
    num === 1 ? historyExt = history.history : historyExt = history2.history2;
    const dateRangeChange = Number.parseFloat((historyExt[historyExt.length - 1].close - historyExt[0].close) / historyExt[0].close * 100).toFixed(2);
    if (num === 1) {
      this.setState({ dateRangeChange });
    }
    else {
      this.setState({ dateRangeChange2: dateRangeChange });
    }
  }

  async fetchCryptocurrencyHistory(num = 1, dayNum = 180) {
    let { value } = this.state;
    const { value2 } = this.state;
    const { curr } = this.state;
    const { curr2 } = this.state;
    if (value === 'MIOTA') {
      value = 'IOTA'
    }
    const dayTarget = dayNum;
    let wanted;
    let currency;
    if (num === 1) {
      wanted = value;
      currency = curr;
    }
    else if (num === 2) {
      wanted = value2;
      currency = curr2;
    }
    try {
      const response = await axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${wanted}&tsym=${currency}&limit=${dayTarget}`)
      if (num === 1) {
        const historyNew = response.data.Data;
        this.setState({ days: dayNum });
        this.setState({ history: historyNew }, async () => {
          await this.formatDate(1);
          await this.getPoints(1);
          await this.getHistoryChange(1);
        });
      }
      else if (num === 2) {
        const historyNew2 = response.data.Data;
        this.setState({ days2: dayNum });
        this.setState({ history2: historyNew2 }, async () => {
          await this.formatDate(2);
          await this.getPoints(2);
          await this.getHistoryChange(2);
        });
      }
    }
    catch (error) {
      console.log('chart Data failed!');
    }
  }

  handleChange1(event) {
    if (event.target.value === 'miota' || event.target.value === 'MIOTA') {
      console.log('error, IOTA is corrupt!');
    }
    else {
      this.setState({ inputValue: event.target.value });
      if (event.target.value !== ' ') {
        this.setState({ isEnabled: true });
      }
    }
  }

  handleChange2(event) {
    if (event.target.value === 'miota' || event.target.value === 'MIOTA') {
      console.log('error!');
    }
    else {
      this.setState({ inputValue2: event.target.value });
      if (event.target.value !== '') {
        this.setState({ isEnabled2: true });
      }
    }
  }

  handleSubmit1(e) {
    const { sideBarOpener } = this.state;
    const { value } = this.state;
    this.addToCoinlog(1);
    this.findSymbol(1);
    e.persist();
    if (value === 'BTC') {
      this.setState({ curr: 'USD' });
    }
    if (sideBarOpener === true) {
      this.addSidebar();
    }
    this.scrollSidebarToTop();
  }

  handleSubmit2(e) {
    const { sideBarOpener } = this.state;
    const { toggleCurr2 } = this.state;
    const { value2 } = this.state;
    const { curr2 } = this.state;
    if (value2 !== 'BTC' && toggleCurr2 === false) {
      this.setState({ toggleCurr2: true });
      this.addToCoinlog(2);
      this.findSymbol(2);
      e.persist();
    }
    else if (value2 === 'BTC' && toggleCurr2 === true) {
      this.setState({ toggleCurr2: false });
      e.persist();
      this.setState({ curr2: 'USD' }, () => {
        this.addToCoinlog(2);
        this.findSymbol(2);
      });
    }
    else if (curr2 === 'BTC' && value2 === 'BTC') {
      this.setState({ curr2: 'USD' }, () => {
        this.addToCoinlog(2);
        this.findSymbol(2);
        e.persist();
      });
    }
    else {
      this.addToCoinlog(2);
      this.findSymbol(2);
      e.persist();
    }
    if (sideBarOpener === true) {
      this.addSidebar();
    }
    this.scrollSidebarToTop();
  }

  handleSubmit3(e, pos) {
    const { coinLog } = this.state;
    e.persist();
    if (coinLog[pos] === 'BTC') {
      this.setState({ curr: 'USD' });
      this.scrollSidebarToTop();
    }
    this.setState({ value: coinLog[pos], coin: coinLog[pos] }, () => {
      this.handleSubmit1(e);
    });
  }

  handleSubmit4(e, pos) {
    const { coinLog2 } = this.state;
    e.persist();
    if (coinLog2[pos] === 'BTC') {
      this.setState({ curr2: 'USD' });
      this.scrollSidebarToTop();
    }
    this.setState({ value2: coinLog2[pos], coin2: coinLog2[pos] }, () => {
      this.handleSubmit2(e);
    });
  }

  handleSubmit5(e, sym) {
    const { graphFocus } = this.state;
    e.persist();
    if (graphFocus === 1) {
      this.setState({ value: sym, coin: sym }, () => {
        this.handleSubmit1(e);
      });
    }
    else if (graphFocus === 2) {
      this.setState({ value2: sym, coin2: sym }, () => {
        this.handleSubmit2(e);
      });
    }
  }

  scrollSidebarToTop() {
    const sidebar = document.getElementById('sidebarContainer');
    setTimeout(() => {
      sidebar.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 800);
  }

  findSymbol(num) {
    const { sendCoin } = this.props;
    const { coin } = this.state;
    const { data } = this.props;
    const { value } = this.state;
    const { value2 } = this.state;
    const { coin2 } = this.state;
    const { days } = this.state;
    const { days2 } = this.state;
    const { toggleCurr } = this.state;
    const { toggleCurr2 } = this.state;

    if (num === 1) {
      const index = data.findIndex(coin3 => coin3.symbol === value);
        if (index !== -1) {
          if (value !== 'BTC' && toggleCurr === false) {
            this.setState({ toggleCurr: true });
          }
          else if (value === 'BTC' && toggleCurr === true) {
            this.setState({ toggleCurr: false });
          }
          sendCoin(1, coin);
          this.fetchCryptocurrencyHistory(1, days);
          this.fetchCryptocurrencyImage(1);
          this.getPoints(1);
          this.setState({ inputValue: '' });
        } 
      }
    else if (num === 2) {
      const index = data.findIndex(coins4 => coins4.symbol === value);
        if (index !== -1) {
          if (value2 !== 'BTC' && toggleCurr2 === false) {
            this.setState({ toggleCurr2: true });
          }
          else if (value2 === 'BTC' && toggleCurr2 === true) {
            this.setState({ toggleCurr2: false });
          }
          sendCoin(2, coin2);
          this.fetchCryptocurrencyHistory(2, days2);
          this.fetchCryptocurrencyImage(2);
          this.getPoints(2);
          this.setState({ inputValue2: '' });
        }
    }
  }

  async fetchCryptocurrencyImage(num = 1) {
    const { value } = this.state;
    const { value2 } = this.state;
    const { cryptoImage } = this.state;
    const { cryptoImage2 } = this.state;
    let wantedVal;
    num === 1 ? wantedVal = value : wantedVal = value2;
    try {
      const response = await axios(`https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${wantedVal}&tsym=USD`)
      if (num === 1) {
        const cryptoImageData = await response.data.Data[0].CoinInfo.ImageUrl;
        cryptoImage.unshift(cryptoImageData);
        const unique = Array.from(new Set(cryptoImage));
        this.setState({ cryptoImage: unique }, () => {
          localStorage.setItem('savedCoinImages', JSON.stringify(unique));
        });
      }
      else if (num === 2) {
        const cryptoImage2Data = response.data.Data[0].CoinInfo.ImageUrl;
        cryptoImage2.unshift(cryptoImage2Data);
        const unique = Array.from(new Set(cryptoImage2));
        this.setState({ cryptoImage2: unique }, () => {
          localStorage.setItem('savedCoinImages2', JSON.stringify(unique));
        });
      }
    }
    catch (error) {
      console.log('Image not received!');
    }
  }

  formatDate(num = 1) {
    const { history } = this.state;
    const { history2 } = this.state;
    if (num === 1) {
      history.forEach((pos) => {
        const { time } = pos;
        (pos).time = moment.unix(time).format('MMM DD YYYY');
      });
    }
    else if (num === 2) {
      history2.forEach((pos) => {
        const { time } = pos;
        (pos).time = moment.unix(time).format('MMM DD YYYY');
      });
    }
  }

  addGraph(num) {
    const pose = this.state;
    const { freshReveal } = this.state;
    const { secondGraphVisible } = this.state;
    const { isGraphVisible } = this.state;
    const { secondWasThere } = this.state;
    const { sideBarOpener } = this.state;
    if (num === 1) {
      // Plus Button from 1st Graph
      this.setState({ freshReveal: !freshReveal }, () => {
        if (freshReveal === false) {
          this.setState({ pose: 'resized' }, () => {
            this.setState({ pose2: 'visible' });
          });
        }
        // Exit Button for 2nd Graph
        else {
          this.setState({ pose2: 'hidden' }, () => {
            this.setState({ pose: 'initial' });
            if (sideBarOpener === true) {
            }
          });
        }
        this.setState({ pose2: pose === 'hidden' ? 'secondary' : 'hidden' }, () => {
          this.setState({ secondGraphVisible: !secondGraphVisible });
        });
      });
    }
    // Exit button for 1st Graph
    else {
      this.setState({ isGraphVisible: !isGraphVisible }, () => {
        if (isGraphVisible) {
          this.setState({ pose2: 'fullSize' });
        }
        else {
          this.setState({ pose2: pose === 'secondary' ? 'hidden' : 'secondary' });
        }
        if (sideBarOpener === false) {
        }
      });
    }
  }

  addSidebar() {
    const { sideBarOpener } = this.state;
    const { graphFocus } = this.state;
    const { secondWasThere } = this.state;
    const { pose } = this.state;
    if (sideBarOpener) {
      setTimeout(() => {
        this.setState({ sideBarOpener: false });
        if (secondWasThere) {
          if (graphFocus === 1) {
            this.setState({ freshReveal: true });
            this.setState({ secondGraphVisible: true });
            this.setState({ pose: pose === 'initial' ? 'initial' : 'resized' }, () => {
              this.setState({ pose2: 'secondary' });
            });
          }
          else {
            this.setState({ pose2: 'secondary' });
            this.setState({ isGraphVisible: true });
            this.setState({ pose: pose === 'initial' ? 'initial' : 'resized' });
          }
        }
        else if (graphFocus === 1) {
          this.setState({ pose: pose === 'initial' ? 'resized' : 'initial' });
        }
        else {
          this.setState({ pose: 'resized' });
          this.setState({ pose2: 'fullSize' });
        }
      }, 500);
    }
    else {
      this.setState({ sideBarOpener: true });
      if (graphFocus === 1 && secondWasThere) {
        this.setState({ pose2: 'hidden' }, () => {
          this.setState({ pose: 'movedOver' });
        });
      }
      else if (graphFocus === 1) {
        this.setState({ pose: 'movedOver' });
      }
      else if (graphFocus === 2) {
        this.setState({ secondGraphVisible: true });
        this.setState({ freshReveal: true });
        this.setState({ isGraphVisible: false });
        this.setState({ pose2: 'movedOver' });
      }
    }
  }

  changeCurrency1(curr) {
    const { value } = this.state;
    const { days } = this.state;
    if (curr === 'USD' && value !== 'BTC') {
      this.setState({ curr: 'USD' }, () => {
        this.fetchCryptocurrencyHistory(1, days);
      });
    }
    else if (curr === 'BTC' && value !== 'BTC') {
      this.setState({ curr: 'BTC' }, () => {
        this.fetchCryptocurrencyHistory(1, days);
      });
    }
  }

  changeCurrency2(curr2) {
    const { value2 } = this.state;
    const { days2 } = this.state;
    if (curr2 === 'USD' && value2 !== 'BTC') {
      this.setState({ curr2: 'USD' }, () => {
        this.fetchCryptocurrencyHistory(2, days2);
      });
    }
    else if (curr2 === 'BTC' && value2 !== 'BTC') {
      this.setState({ curr2: 'BTC' }, () => {
        this.fetchCryptocurrencyHistory(2, days2);
      });
    }
  }

  addToCoinlog(num) {
    const { coinLog } = this.state;
    const { value } = this.state;
    const { data } = this.props;
    const { coinLog2 } = this.state;
    const { value2 } = this.state;
    if (num === 1) {
      data.forEach((coins) => {
        if (coins.symbol === value) {
          coinLog.unshift(value);
          const unique = Array.from(new Set(coinLog));
          this.setState({ coinLog: unique }, () => {
            localStorage.setItem('savedCoins', JSON.stringify(unique));
          });
        }
      });
    }
    else if (num === 2) {
      data.forEach((coins) => {
        if (coins.symbol === value2) {
          coinLog2.unshift(value2);
          const unique = Array.from(new Set(coinLog2));
          this.setState({ coinLog2: unique }, () => {
            localStorage.setItem('savedCoins2', JSON.stringify(unique));
          });
        }
      });
    }
  }

  addToFavorites() {
    const { value } = this.state;
    const { value2 } = this.state;
    const { data } = this.props;
    const { favorites } = this.state;
    const { graphFocus } = this.state;
    if (graphFocus === 1) {
      favorites.indexOf(value) === -1 ? favorites.push(value) : this.removeFromFavorites();
      const freshFavorites = Array.from(new Set(favorites));
      this.setState({ favorites: freshFavorites }, () => {
        localStorage.setItem('savedFavoriteCoins', JSON.stringify(freshFavorites));
        this.refs.child.getFavorites();
      })
    }
    else if (graphFocus === 2) {
      favorites.indexOf(value2) === -1 ? favorites.push(value2) : this.removeFromFavorites();
      localStorage.setItem('savedFavoriteCoins', JSON.stringify(favorites));
      this.refs.child.getFavorites();
    }
  }

  removeFromFavorites(coin) {
    const { value } = this.state;
    const { value2 } = this.state;
    const { favorites } = this.state;
    const { graphFocus } = this.state;
    let wanted;
    if (graphFocus === 1) {
      if (coin) {
        wanted = coin;
      } else {
        wanted = value;
      }
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i] === wanted) {
          favorites.splice(i, 1);
          this.refs.child.getFavorites();
        }
      }
    }
    else if (graphFocus === 2) {
      if (coin) {
        wanted = coin;
      } else {
        wanted = value2;
      }
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i] === wanted) {
          favorites.splice(i, 1);
          this.refs.child.getFavorites();
        }
      }
    }
  }


  render() {
    const {
      curr, curr2, value, value2, isEnabled, isEnabled2, freshReveal, hovering, secondGraphVisible,
      isGraphVisible, graphData, graphData2, cryptoImage, cryptoImage2, toggleCurr,
      toggleCurr2, days, days2, dateRangeChange, dateRangeChange2, sideBarOpener,
      pose, sideBarOpener2, inputValue, inputValue2, pose2, graphFocus, graphFocus2, addGraph, favorites, hovered
    } = this.state;
    const {
      answer, dataNew, dataNew2, dataToBTC, dataToBTC2, topList, currentBTCPrice
    } = this.props;
    return (
          <div className="container-fluid">
            <div className="row">
              <Reveal pose={isGraphVisible ? 'visible2' : 'hidden'}>
              <div className={answer === true ? "col-sm-2 bitcoinTrackerWrapperYes" :
                "col-sm-2 bitcoinTrackerWrapperNo"
              }>
                <BitcoinTracker
                  currentBTCPrice={currentBTCPrice}
                />
            </div>
              <div id="sidebarContainer" className="col-sm-2 sidebar">
                <Sidebar
                  topList={topList}
                  handleSubmit5={this.handleSubmit5}
                  favorites={favorites}
                  removeFromFavorites={this.removeFromFavorites}
                  ref='child'
                />
            </div>
            </Reveal>
          </div>
              <Reveal pose={isGraphVisible ? 'visible' : 'hidden'}>
                <Resize
                className={graphFocus === 1 ? "col-sm-10 NoGraph shadowGraph" : "col-sm-10 NoGraph"}
                  pose={pose}
                  onMouseOver={() => this.setState({ graphFocus: 1, graphFocus2: 2, hovered: true })}
                  onMouseLeave={() => this.setState({ hovered: false })}>
                  <Graph
                    dataNew={dataNew}
                    graphData={graphData}
                    isGraphVisible={isGraphVisible}
                    isEnabled={isEnabled}
                    freshReveal={freshReveal}
                    cryptoImage={cryptoImage}
                    onHistoryChange={this.onHistoryChange}
                    handleSubmit1={this.handleSubmit1}
                    handleSubmit3={this.handleSubmit3}
                    handleSubmit5={this.handleSubmit5}
                    handleChange={this.handleChange1}
                    answer={answer}
                    changeCurrency={this.changeCurrency1}
                    value={value}
                    curr={curr}
                    dataToBTC={dataToBTC}
                    toggleCurr={toggleCurr}
                    days={days}
                    dateRangeChange={dateRangeChange}
                    addSidebar={this.addSidebar}
                    sideBarOpener={sideBarOpener}
                    inputValue={inputValue}
                    graphFocus={graphFocus}
                    addGraph={this.addGraph}
                    addToFavorites={this.addToFavorites}
                    favorites={favorites}
                    hovered={hovered}
                    setUserInput={this.setUserInput}
                  />
                  {/*
                    { freshReveal ? (
                      <div
                        className="exitButton"
                        onClick={() => {
                          this.addGraph(2) }
                        }
                        onKeyDown={() => {
                          this.addGraph(2) }
                        }
                        role="button"
                        tabIndex={0}
                      >
                        <img className="exitImage" alt="" src={exit} />
                      </div>
                    ) : null}
                    */}
                </Resize>
                <div className="imageContainer">
                    <Reveal3 pose={secondGraphVisible && isGraphVisible || sideBarOpener ? 'hidden' : 'visible'}>
                      <div className="plus">
                        <Hover
                          pose={hovering ? 'hovered' : 'idle'}
                          >
                          <div
                            onClick={() => {
                              isGraphVisible ? this.addGraph(1) : this.addGraph(2)}
                            }
                            onKeyDown={
                              null
                            }
                            role="button"
                            tabIndex={0}
                            >
                            <img alt="" src={plus} />
                          </div>
                        </Hover>
                      </div>
                    </Reveal3>
                </div>
              </Reveal>
              <div>
                {freshReveal ? (
                  <Reveal3
                    className={graphFocus === 2 ? "col-sm-10 NoGraphNew shadowGraph" : "col-sm-10 NoGraphNew"}
                    pose={pose2}
                    onMouseOver={() => this.setState({ graphFocus: 2, graphFocus2: 1, hovered: true })}
                    onMouseLeave={() => this.setState({ hovered: false })}>
                    <Graph
                      isEnabled={isEnabled2}
                      dataNew={dataNew2}
                      graphData={graphData2}
                      isGraphVisible={isGraphVisible}
                      freshReveal={freshReveal}
                      cryptoImage={cryptoImage2}
                      secondGraphVisible={secondGraphVisible}
                      onHistoryChange={this.onHistoryChange2}
                      handleSubmit1={this.handleSubmit2}
                      handleSubmit3={this.handleSubmit4}
                      handleSubmit5={this.handleSubmit5}
                      handleChange={this.handleChange2}
                      answer={answer}
                      changeCurrency={this.changeCurrency2}
                      value={value2}
                      curr={curr2}
                      dataToBTC={dataToBTC2}
                      toggleCurr={toggleCurr2}
                      days={days2}
                      dateRangeChange={dateRangeChange2}
                      addSidebar={this.addSidebar}
                      sideBarOpener={sideBarOpener}
                      inputValue={inputValue2}
                      graphFocus={graphFocus2}
                      addGraph={this.addGraph}
                      addToFavorites={this.addToFavorites}
                      favorites={favorites}
                      hovered={hovered}
                      setUserInput={this.setUserInput}
                    />
                  </Reveal3>
                ) : null
              }
              </div>
              {/* }
          <Reveal2 pose={isGraphVisible || secondGraphVisible ? 'visible2' : 'hidden2'}>
            <div
              className="burgerMenuContainer"
              onClick={this.addSidebar}
              onKeyDown={this.addSidebar}
              role="button"
              tabIndex={-1}
            >
              <img className="burgerMenu" alt="" src={burgerMenu} />
            </div>
          </Reveal2>
          */}
          </div>
    );
  }
}


Dashboard.propTypes = {
  data: PropTypes.array,
  sendCoin: PropTypes.func,
  sendCoin2: PropTypes.func,
  dataNew: PropTypes.array,
  dataNew2: PropTypes.array,
  answer: PropTypes.bool,
  dataToBTC: PropTypes.object,
  dataToBTC2: PropTypes.object

};

Dashboard.defaultProps = {
  data: 'data',
  sendCoin: 'sendCoin',
  dataNew: 'dataNew',
  answer: 'answer',
  sendCoin2: PropTypes.func,
  dataNew2: PropTypes.array,
  dataToBTC: PropTypes.object,
  dataToBTC2: PropTypes.object

};

export default Dashboard;
