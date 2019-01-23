import React, { Component } from 'react';
import './dashboard.css';
import 'react-moment';
import axios from 'axios';
import posed from 'react-pose';
import {
  Container, Row
}
  from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'babel-polyfill';
import BitcoinTracker from '../bitcoinTracker/BitcoinTracker';
import ChartInfo from '../chartInfo/ChartInfo';
import Graph from '../graph/Graph';
import Sidebar from '../sidebar/Sidebar';
import plus from '../../../images/plus-button.png';
import exit from '../../../images/XCircle.png';
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
    width: '45vw',
    left: '74%',
    transition: { ease: 'linear', duration: 200 },
    delay: 0
  },
  visible: {
    opacity: 1,
    width: '45vw',
    left: '74%',
    transition: { ease: 'linear', duration: 400 },
    delay: 300
  },
  secondary: {
    opacity: 1,
    width: '45vw',
    left: '74%',
    transition: { ease: 'linear', duration: 400 },
    delay: 0
  },
  movedOver: {
    opacity: 1,
    width: '60vw',
    left: '60%',
    transition: { ease: 'easeOut', duration: 400 },
    delay: 0
  },
  fullSize: {
    opacity: 1,
    width: '75vw',
    left: '50%',
    transition: { ease: 'easeOut', duration: 400 },
    delay: 0
  }
});

const Reveal = posed.div({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 900 },
    delay: 600
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
    width: '75vw',
    left: '50%',
    transition: { ease: 'easeOut', duration: 400 }
  },
  resized: {
    width: '45vw',
    left: '26%',
    transition: { ease: 'linear', duration: 400 },
    delay: 0
  },
  movedOver: {
    width: '60vw',
    left: '60%',
    transition: { ease: 'easeOut', duration: 400 },
    delay: 0
  }

});

const Resize2ndGraph = posed.div({
  resized: {
    width: '75vw',
    left: '50%'
  },
  initial: {
    width: '45vw',
    left: '75%'
  },
  movedOver: {
    width: '60vw',
    left: '60%'
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
      graphFocus: 1,
      inputValue: '',
      inputValue2: '',
      pose: 'initial',
      pose2: 'hidden',
      secondWasThere: false,
      sideBarOpener: false,
      sideBarOpener2: false,
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
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleSubmit3 = this.handleSubmit3.bind(this);
    this.handleSubmit4 = this.handleSubmit4.bind(this);
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


  onHistoryChange(num = 31) {
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
          pointHoverBackgroundColor: 'black',
          pointHoverBorderColor: 'black',
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
          hoverBackgroundColor: '#1d1a1a',
          backgroundColor: '#1d1a1a61'
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

  getLocalStorageData(num) {
    const BTC = '/media/19633/btc.png';
    const ETH = '/media/20646/eth_logo.png';
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
    }
  }

  getHistoryChange(num = 1) {
    const history = this.state;
    const history2 = this.state;
    let historyExt;
    num === 1 ? historyExt = history.history : historyExt = history2.history2;
    const dateRangeChange = Number.parseFloat((historyExt[historyExt.length - 1].close
        - historyExt[0].close)
      / historyExt[0].close * 100).toFixed(2);
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
      this.setState({ inputValue: event.target.value.toUpperCase() });
      this.setState({ value: event.target.value.toUpperCase() });
      this.setState({ coin: event.target.value.toUpperCase() });
      if (event.target.value !== '') {
        this.setState({ isEnabled: true });
      }
    }
  }

  handleChange2(event) {
    if (event.target.value === 'miota' || event.target.value === 'MIOTA') {
      console.log('error, IOTA is corrupt!');
    }
    else {
      this.setState({ inputValue2: event.target.value.toUpperCase() });
      this.setState({ value2: event.target.value.toUpperCase() });
      this.setState({ coin2: event.target.value.toUpperCase() });
      if (event.target.value !== '') {
        this.setState({ isEnabled2: true });
      }
    }
  }

  handleSubmit1(e) {
    const { sideBarOpener } = this.state;
    const { value } = this.state;
    const { curr } = this.state;

    this.addToCoinlog(1);
    this.findSymbol(1);
    e.preventDefault();
    if (value === 'BTC') {
      this.setState({ curr: 'USD' });
    }
    if (sideBarOpener === true) {
      this.addSidebar();
    }
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
      e.preventDefault();
    }
    else if (value2 === 'BTC' && toggleCurr2 === true) {
      this.setState({ toggleCurr2: false });
      e.preventDefault();
      this.setState({ curr2: 'USD' }, () => {
        this.addToCoinlog(2);
        this.findSymbol(2);
      });
    }
    else if (curr2 === 'BTC' && value2 === 'BTC') {
      this.setState({ curr2: 'USD' }, () => {
        this.addToCoinlog(2);
        this.findSymbol(2);
        e.preventDefault();
      });
    }
    else {
      this.addToCoinlog(2);
      this.findSymbol(2);
      e.preventDefault();
    }
    if (sideBarOpener === true) {
      this.addSidebar();
    }
  }

  handleSubmit3(e, pos) {
    const { coinLog } = this.state;
    e.persist();
    if (coinLog[pos] === 'BTC') {
      this.setState({ curr: 'USD' });
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
    }
    this.setState({ value2: coinLog2[pos], coin2: coinLog2[pos] }, () => {
      this.handleSubmit2(e);
    });
  }

  handleSubmit5(e, sym) {
    const { graphFocus } = this.state;
    e.persist();
    if (sym === 'MIOTA') {
      alert('error! IOTA data currently corrupt');
    }
    else if (graphFocus === 1) {
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
      data.forEach((coins) => {
        if (coins.symbol === value) {
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
      });
    }
    else if (num === 2) {
      data.forEach((coins) => {
        if (coins.symbol === value2) {
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
      });
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
            this.setState({ secondWasThere: true });
          });
        }
        // Exit Button for 2nd Graph
        else {
          this.setState({ pose2: 'hidden' }, () => {
            this.setState({ pose: 'initial' });
            this.setState({ graphFocus: 1 });
            if (sideBarOpener === true) {
              this.setState({ secondWasThere: !secondWasThere });
            }
          });
        }
        this.setState({ pose2: pose === 'hidden' ? 'secondary' : 'hidden' }, () => {
          this.setState({ secondGraphVisible: !secondGraphVisible });
        });
        this.setState({ secondWasThere: !secondWasThere });
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
        this.setState({ graphFocus: 2 });
        if (sideBarOpener === false) {
          this.setState({ secondWasThere: !secondWasThere });
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

  render() {
    const {
      curr, curr2, value, value2, isEnabled, isEnabled2, freshReveal, hovering, secondGraphVisible,
      isGraphVisible, graphData, graphData2, cryptoImage, cryptoImage2, toggleCurr,
      toggleCurr2, days, days2, dateRangeChange, dateRangeChange2, sideBarOpener,
      pose, sideBarOpener2, inputValue, inputValue2, pose2, graphFocus
    } = this.state;
    const {
      answer, dataNew, dataNew2, dataToBTC, dataToBTC2, topList, currentBTCPrice
    } = this.props;
    const currentPrice = parseFloat(dataNew[0].price_usd).toFixed(2);
    const currentPrice2 = Number(dataToBTC.price).toFixed(10);
    const { rank } = dataNew[0];
    const { name } = dataNew[0];
    const oneHour = parseFloat(dataNew[0].percent_change_1h);
    const oneHour2 = parseFloat(dataToBTC.percent_change_1h);
    const oneDay = parseFloat(dataNew[0].percent_change_24h);
    const oneDay2 = parseFloat(dataToBTC.percent_change_24h);
    const seven = parseFloat(dataNew[0].percent_change_7d);
    const seven2 = parseFloat(dataToBTC.percent_change_7d);
    const maxSupply = dataNew[0].max_supply;
    const availableSupply = dataNew[0].available_supply;
    const marketCap = dataNew[0].market_cap_usd;
    let oneDayVolume;
    const oneDayVolumeKeys = Object.keys(dataNew[0]).map((key) => {
      const tempdata = dataNew[0];
      if (key === '24h_volume_usd') {
        oneDayVolume = tempdata[key];
      }
    });
    return (
      <div id="dashboard" className="Nodashboardcontainer">
        <div className={`${answer ? 'Yes' : 'No'}dashboard`}>
          <div className="container-fluid">
            <div className="row">
              <div className=" col-sm-2 off-canvas">
                <Sidebar
                  topList={topList.map((x, y) =>
                    <button type="button" className="list-group-item list-group-item-action " key={y} onClick={(e) =>
                      {this.handleSubmit5(e, x.symbol)}}>
                      <span className="sidebarRank">{x.rank + ".     "}&nbsp;</span>
                      <span className="sidebarCoin">{x.id}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span className={x.percent_change_24h > 0 ? "greenText right" : "redText right"}>
                      {x.percent_change_24h + '%'}</span>
                      </button>)}
                />
            </div>
              <Reveal pose={isGraphVisible ? 'visible' : 'hidden'}>
                <Resize
                  className="col-sm-10 NoGraph"
                  onMouseOver={sideBarOpener === false ? () => this.setState({ graphFocus: 1 }) : null}>
                  <Graph
                    dataNew={dataNew}
                    graphData={graphData}
                    isGraphVisible={isGraphVisible}
                    isEnabled={isEnabled}
                    freshReveal={freshReveal}
                    cryptoImage={cryptoImage}
                    onHistoryChange={this.onHistoryChange}
                    handleSubmit={this.handleSubmit1}
                    handleSubmit3={this.handleSubmit3}
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
                  />
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
                </Resize>
              </Reveal>
              <div>
                {freshReveal ? (
                  <Reveal3
                    className="NoGraphNew"
                    pose={pose2}
                    onMouseOver={sideBarOpener === false ? () => this.setState({ graphFocus: 2 }) : null}>
                    <Graph
                      isEnabled={isEnabled2}
                      dataNew={dataNew2}
                      graphData={graphData2}
                      isGraphVisible={isGraphVisible}
                      freshReveal={freshReveal}
                      cryptoImage={cryptoImage2}
                      secondGraphVisible={secondGraphVisible}
                      onHistoryChange={this.onHistoryChange2}
                      handleSubmit={this.handleSubmit2}
                      handleSubmit3={this.handleSubmit4}
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
                    />
                    {isGraphVisible ? (
                      <div
                        className="exitButton"
                        onClick={() => {
                          this.addGraph(1) }
                        }
                        onKeyDown={() => {
                          this.addGraph(1) }
                        }
                        role="button"
                        tabIndex={0}
                      >
                        <img className="exitImage" alt="" src={exit} />
                      </div>) : null }
                  </Reveal3>
                ) : null
              }
              </div>
              {/*}
              <div className="imageContainer">

                  <Reveal3 pose={secondGraphVisible && isGraphVisible || sideBarOpener ? 'hidden' : 'visible'}>
                    <div className="plus">
                      <Hover
                        pose={hovering ? 'hovered' : 'idle'}
                        onMouseEnter={() => this.setState({ hovering: true })}
                        onMouseLeave={() => this.setState({ hovering: false })}
                      >
                        <div
                          onClick={() => {
                            isGraphVisible ? this.addGraph(1) : this.addGraph(2)}
                                  }
                          onKeyDown={() => {
                            isGraphVisible ? this.addGraph(1) : this.addGraph(2)}
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
          <div className="col-sm-2 Nochartheader">
            <ChartInfo
              rank={rank}
              currentPrice={currentPrice}
              currentPrice2={currentPrice2}
              maxSupply={maxSupply}
              availableSupply={availableSupply}
              marketCap={marketCap}
              oneDayVolume={oneDayVolume}
              oneHour={oneHour}
              oneHour2={oneHour2}
              seven={seven}
              seven2={seven2}
              oneDay={oneDay}
              oneDay2={oneDay2}
              curr={curr}
              dateRangeChange={dateRangeChange}
              dateRangeChange2={dateRangeChange2}
              days={days}
              days2={days2}
              name={name}
            />
        </div>
          <div className="col-sm-2 bitcoinTrackerWrapper">
            <BitcoinTracker
              currentBTCPrice={currentBTCPrice}
            />
        </div>
          <div className="backgroundClick" onClick={sideBarOpener ? this.addSidebar: null}></div>
          </div>
        </div>
        </div>
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
