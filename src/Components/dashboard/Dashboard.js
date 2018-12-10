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
    transition: { duration: 500 },
    delay: 200
  },
  visible: {
    opacity: 1,
    transition: { duration: 500 },
    delay: 500
  }
});

const Reveal = posed.div({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 900 },
    delay: 700
  }
});

const Reveal5 = posed.div({
  hidden: { transform: 'translate(-100%, 0%)' },
  visible: { transform: 'translate(0%, 0%)' }
});

const Resize = posed.div({
  initial: {
    width: '75vw',
    left: '50%'
  },
  resized: {
    width: '45vw',
    left: '26%'
  }

});

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pose: 'initial',
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
    this.addSidebar2 = this.addSidebar2.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleSubmit3 = this.handleSubmit3.bind(this);
    this.handleSubmit4 = this.handleSubmit4.bind(this);
  }

  componentDidMount() {
    const { isGraphVisible } = this.state;
    const { coinLog } = this.state;
    const { coinLog2 } = this.state;
    const { value } = this.state;
    const { value2 } = this.state;
    coinLog.unshift(value);
    coinLog2.unshift(value2);
    this.fetchCryptocurrencyHistory(1);
    this.fetchCryptocurrencyHistory(2);
    this.getPoints(1);
    this.getPoints(2);
    this.setState({ isGraphVisible: !isGraphVisible });
    if (localStorage.getItem('savedCoins') === null) {
      if (localStorage.getItem('savedCoins2') === null) {
        this.fetchCryptocurrencyImage(2);
      }
      else {
        this.getLocalStorageData(2);
      }
      this.fetchCryptocurrencyImage(1);
    }
    else if (localStorage.getItem('savedCoins2') === null) {
      this.fetchCryptocurrencyImage(2);
      this.getLocalStorageData(1);
    }
    else {
      this.getLocalStorageData(1);
      this.getLocalStorageData(2);
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
          borderWidth: 2,
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
          backgroundColor: '#1d1a1a42'
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

  fetchCryptocurrencyHistory(num = 1, dayNum = 180) {
    const { value } = this.state;
    const { value2 } = this.state;
    const { curr } = this.state;
    const { curr2 } = this.state;
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
    axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${wanted}&tsym=${currency}&limit=${dayTarget}`)
      .then((response) => {
        if (num === 1) {
          const historyNew = response.data.Data;
          this.setState({ days: dayNum });
          this.setState({ history: historyNew }, () => {
            this.formatDate(1);
            this.getPoints(1);
            this.getHistoryChange(1);
          });
        }
        else if (num === 2) {
          const historyNew2 = response.data.Data;
          this.setState({ days2: dayNum });
          this.setState({ history2: historyNew2 }, () => {
            this.formatDate(2);
            this.getPoints(2);
            this.getHistoryChange(2);
          });
        }
      });
  }

  handleChange1(event) {
    this.setState({ value: event.target.value.toUpperCase() });
    this.setState({ coin: event.target.value.toUpperCase() });
    if (event.target.value !== '') {
      this.setState({ isEnabled: true });
    }
  }

  handleChange2(event) {
    this.setState({ value2: event.target.value.toUpperCase() });
    this.setState({ coin2: event.target.value.toUpperCase() });
    if (event.target.value !== '') {
      this.setState({ isEnabled2: true });
    }
  }

  handleSubmit1(e) {
    const { sideBarOpener } = this.state;
    const { toggleCurr } = this.state;
    const { value } = this.state;
    const { curr } = this.state;
    if (value !== 'BTC' && toggleCurr === false) {
      this.setState({ toggleCurr: true });
      this.addToCoinlog(1);
      this.findSymbol(1);
      e.preventDefault();
    }
    else if (value === 'BTC' && toggleCurr === true) {
      this.setState({ toggleCurr: false });
      e.preventDefault();
      this.setState({ curr: 'USD' }, () => {
        this.addToCoinlog(1);
        this.findSymbol(1);
      });
    }
    else if (curr === 'BTC' && value === 'BTC') {
      this.setState({ curr: 'USD' }, () => {
        this.addToCoinlog(1);
        this.findSymbol(1);
        e.preventDefault();
      });
    }
    else {
      this.addToCoinlog(1);
      this.findSymbol(1);
      e.preventDefault();
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
    this.setState({ value: coinLog[pos], coin: coinLog[pos], curr: 'USD' }, () => {
      this.handleSubmit1(e);
    });
  }

  handleSubmit4(e, pos) {
    const { coinLog2 } = this.state;
    e.persist();
    this.setState({ value2: coinLog2[pos], coin2: coinLog2[pos], curr: 'USD' }, () => {
      this.handleSubmit2(e);
    });
  }

  handleSubmit5(e, sym) {
    const { graphFocus } = this.state;
    e.persist();
    if (graphFocus === 1) {
      this.setState({ value: sym, coin: sym, curr: 'USD' }, () => {
        this.handleSubmit1(e);
      });
    }
    else if (graphFocus === 2) {
      this.setState({ value2: sym, coin2: sym, curr: 'USD' }, () => {
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

    let hits = false;
    if (num === 1) {
      data.forEach((coins) => {
        if (!hits) {
          if (coins.symbol === value) {
            sendCoin(1, coin);
            this.fetchCryptocurrencyHistory(1, days);
            this.fetchCryptocurrencyImage(1);
            this.getPoints(1);
            hits = true;
          }
        }
      });
    }
    else if (num === 2) {
      data.forEach((coins) => {
        if (!hits) {
          if (coins.symbol === value2) {
            sendCoin(2, coin2);
            this.fetchCryptocurrencyHistory(2, days2);
            this.fetchCryptocurrencyImage(2);
            this.getPoints(2);
            hits = true;
          }
        }
      });
    }
  }

  fetchCryptocurrencyImage(num = 1) {
    const { value } = this.state;
    const { value2 } = this.state;
    const { cryptoImage } = this.state;
    const { cryptoImage2 } = this.state;
    let wantedVal;
    num === 1 ? wantedVal = value : wantedVal = value2;
    axios.get(`https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${wantedVal}&tsym=USD`)
      .then((response) => {
        if (num === 1) {
          const cryptoImageData = response.data.Data[0].CoinInfo.ImageUrl;
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
      });
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

  addGraph() {
    const pose = this.state;
    this.setState({ freshReveal: true }, () => {
      this.setState({ pose: pose === 'initial' ? 'initial' : 'resized' });
      this.setState({ secondGraphVisible: true });
      this.setState({ secondWasThere: true });
    });
  }

  addSidebar() {
    const { sideBarOpener } = this.state;
    if (sideBarOpener) {
      this.setState({ sideBarOpener: false });
    }
    else {
      this.setState({ sideBarOpener: true });
    }
    this.setState({ graphFocus: 1 });
  }

  addSidebar2() {
    const { sideBarOpener } = this.state;
    if (sideBarOpener) {
      this.setState({ sideBarOpener: false });
    }
    else {
      this.setState({ sideBarOpener: true });
    }
    this.setState({ graphFocus: 2 });
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
      pose, sideBarOpener2
    } = this.state;
    const {
      answer, dataNew, dataNew2, dataToBTC, dataToBTC2, topList
    } = this.props;
    return (
      <div id="dashboard" className="Nodashboardcontainer">
        <div className={`${answer ? 'Yes' : 'No'}dashboard`}>
          <Container>
            <Row>
              <Reveal pose={isGraphVisible ? 'visible' : 'hidden'}>
                <Resize className="NoGraph" pose={pose}>
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
                  />
                </Resize>
              </Reveal>
              <div>
                {freshReveal ? (
                  <Reveal3 className="NoGraphNew" pose={secondGraphVisible ? 'visible' : 'hidden'}>
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
                      addSidebar={this.addSidebar2}
                      sideBarOpener={sideBarOpener}
                    />
                  </Reveal3>
                ) : null
              }
              </div>
              <div className="imageContainer">
                <Reveal2 pose={isGraphVisible ? 'visible2' : 'hidden2'}>
                  <Reveal3 pose={secondGraphVisible ? 'hidden' : 'visible'}>
                    <div className="plus">
                      <Hover
                        pose={hovering ? 'hovered' : 'idle'}
                        onMouseEnter={() => this.setState({ hovering: true })}
                        onMouseLeave={() => this.setState({ hovering: false })}
                      >
                        <div
                          onClick={this.addGraph}
                          onKeyDown={this.addGraph}
                          role="button"
                          tabIndex={0}
                        >
                          <img alt="" src={plus} />
                        </div>
                      </Hover>
                    </div>
                  </Reveal3>
                </Reveal2>
              </div>
            </Row>
          </Container>
          <Reveal2 pose={isGraphVisible ? 'visible' : 'hidden'}>
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
          <Reveal5 className="off-canvas" pose={sideBarOpener ? 'visible' : 'hidden'}>
            <Sidebar
              topList={topList.map((x, y) => <button key={y} onClick={(e) => {this.handleSubmit5(e, x.symbol)}}>{x.id}</button>)}
            />
          </Reveal5>
          <Reveal5 className="off-canvas" pose={sideBarOpener2 ? 'visible' : 'hidden'}>
            <Sidebar />
          </Reveal5>
          <div className="backgroundClick" onClick={sideBarOpener ? this.addSidebar: null}></div>
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
