/* eslint-disable no-console */
/* eslint-disable react/no-string-refs */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import './dashboard.css';
import 'react-moment';
import axios from 'axios';
import PropTypes from 'prop-types';
import moment from 'moment';
import Swipe from 'react-easy-swipe';
import 'babel-polyfill';
import * as animations from '../../animations';
import BitcoinTracker from '../bitcoinTracker/BitcoinTracker';
import Graph from '../graph/Graph';
import Sidebar from '../sidebar/Sidebar';
import plus from '../../../images/plus-button.png';
import burgerMenu from '../../../images/burgerMenu.png';

class Dashboard extends Component {
  state = {
    graphFocus: 1,
    favorites: [],
    inputValue: '',
    inputValue2: '',
    pose: 'initial',
    pose2: 'hidden',
    sideBarOpener: false,
    coin1: 'BTC',
    coin2: 'ETH',
    curr: 'USD',
    curr2: 'USD',
    toggleCurr: false,
    toggleCurr2: true,
    isEnabled: false,
    isEnabled2: false,
    coinLog: [],
    coinLog2: [],
    freshReveal: false,
    secondGraphVisible: false,
    isGraphVisible: false,
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

  async componentDidMount() {
    const { isGraphVisible } = this.state;
    const { coinLog } = this.state;
    const { coinLog2 } = this.state;
    const { coin1 } = this.state;
    const { coin2 } = this.state;
    coinLog.unshift(coin1);
    coinLog2.unshift(coin2);
    await this.fetchCryptocurrencyHistory(1);
    await this.fetchCryptocurrencyHistory(2);
    await this.getPoints(1);
    await this.getPoints(2);
    this.setState({ isGraphVisible: !isGraphVisible });
    this.getLocalStorageData();
  }

  onHistoryChange = (num = 30) => {
    const { graphFocus } = this.state;

    if (num === 30) {
      this.fetchCryptocurrencyHistory(graphFocus, 31);
    }
    else if (num === 60) {
      this.fetchCryptocurrencyHistory(graphFocus, 90);
    }
    else if (num === 180) {
      this.fetchCryptocurrencyHistory(graphFocus, 180);
    }
    else if (num === 365) {
      this.fetchCryptocurrencyHistory(graphFocus, 365);
    }
    else if (num === 1000) {
      this.fetchCryptocurrencyHistory(graphFocus, 1500);
    }
  }

  getPoints = (num = 1) => {
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
          backgroundColor: 'rgba(30, 41, 56, 0.55)'
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

  getLocalStorageData = () => {
    const retrievedFavoriteCoins = localStorage.getItem('savedFavoriteCoins');
    const savedFavoriteCoinsNew = JSON.parse(retrievedFavoriteCoins);
    if (savedFavoriteCoinsNew) {
      this.setState({ favorites: savedFavoriteCoinsNew });
    }
  }

  setUserInput = (e) => {
    const { graphFocus } = this.state;
    const { allCoins } = this.props;
    const userInput = e.target.elements.userInput.value.toLowerCase();
    const index = allCoins.findIndex(coin => coin.id === userInput);
    const index2 = allCoins.findIndex(coin5 => coin5.symbol === userInput);
    e.preventDefault();
    if (index === -1 && index2 === -1) {
      if (graphFocus === 1) {
        this.toggleTooltip(1);
      }
      else if (graphFocus === 2) {
        this.toggleTooltip(2);
      }
    }
    this.setState(() => {
      if (graphFocus === 1) {
        if (index !== -1) {
          return {
            coin1: allCoins[index].symbol.toUpperCase(),
            inputValue: ''
          };
        }
        if (index2 !== -1) {
          return {
            coin1: userInput.toUpperCase(),
            inputValue: ''
          };
        }
      }
      if (graphFocus === 2) {
        if (index !== -1) {
          return {
            coin2: allCoins[index].symbol.toUpperCase(),
            inputValue2: ''
          };
        }
        if (index2 !== -1) {
          return {
            coin2: userInput.toUpperCase(),
            inputValue2: ''
          };
        }
      }
    }, () => {
      if (graphFocus === 1) {
        if (index !== -1 || index2 !== -1) {
          this.handleSubmit1(e);
        }
      }
      else if (graphFocus === 2) {
        if (index !== -1 || index2 !== -1) {
          this.handleSubmit2(e);
        }
      }
    });
  }

  getHistoryChange = (num = 1) => {
    const history = this.state;
    const history2 = this.state;
    let historyExt;
    if (num === 1) {
      historyExt = history.history;
    }
    else {
      historyExt = history2.history2;
    }
    // eslint-disable-next-line max-len
    const dateRangeChange = Number.parseFloat((historyExt[historyExt.length - 1].close - historyExt[0].close) / historyExt[0].close * 100).toFixed(2);
    if (num === 1) {
      this.setState({ dateRangeChange });
    }
    else {
      this.setState({ dateRangeChange2: dateRangeChange });
    }
  }

  fetchCryptocurrencyHistory = async (num = 1, dayNum = 180) => {
    let { coin1 } = this.state;
    let { coin2 } = this.state;
    const { curr } = this.state;
    const { curr2 } = this.state;
    if (coin1 === 'MIOTA') {
      coin1 = 'IOTA';
    }
    else if (coin2 === 'MIOTA') {
      coin2 = 'IOTA';
    }
    const dayTarget = dayNum;
    let wanted;
    let currency;
    if (num === 1) {
      wanted = coin1;
      currency = curr;
    }
    else if (num === 2) {
      wanted = coin2;
      currency = curr2;
    }
    try {
      const response = await axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${wanted}&tsym=${currency}&limit=${dayTarget}`);
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

  handleChange1 = (event) => {
    this.setState({ inputValue: event.target.value });
    if (event.target.value) {
      this.toggleTooltip(1, 'remove');
    }
  }

  handleChange2 = (event) => {
    this.setState({ inputValue2: event.target.value });
    if (event.target.value) {
      this.toggleTooltip(2, 'remove');
    }
  }

  handleSubmit1 = (e, fade = true) => {
    const { sideBarOpener } = this.state;
    const { coin1 } = this.state;
    e.persist();
    if (coin1 === 'BTC' || 'btc') {
      this.setState({ curr: 'USD' }, () => {
        this.addToCoinlog(1);
        this.findSymbol(1);
        if (fade) {
          this.fadeBackgroundImage1();
        }
      });
    }
    else {
      this.addToCoinlog(1);
      this.findSymbol(1);
      if (fade) {
        this.fadeBackgroundImage1();
      }
    }
    if (sideBarOpener === true) {
      // this.addSidebar();
    }
    // this.scrollSidebarToTop();
  }

  handleSubmit2 = (e, fade = true) => {
    const { sideBarOpener } = this.state;
    const { toggleCurr2 } = this.state;
    const { value2 } = this.state;
    const { curr2 } = this.state;
    if (value2 !== 'BTC' && toggleCurr2 === false) {
      this.setState({ toggleCurr2: true });
      this.addToCoinlog(2);
      this.findSymbol(2);
      if (fade) {
        this.fadeBackgroundImage2();
      }
      e.persist();
    }
    else if (value2 === 'BTC' && toggleCurr2 === true) {
      this.setState({ toggleCurr2: false });
      e.persist();
      this.setState({ curr2: 'USD' }, () => {
        this.addToCoinlog(2);
        this.findSymbol(2);
        if (fade) {
          this.fadeBackgroundImage2();
        }
      });
    }
    else if ((curr2 === 'BTC' || 'btc') && (value2 === 'BTC' || 'btc')) {
      this.setState({ curr2: 'USD' }, () => {
        this.addToCoinlog(2);
        this.findSymbol(2);
        e.persist();
        if (fade) {
          this.fadeBackgroundImage2();
        }
      });
    }
    else {
      if (fade) {
        this.fadeBackgroundImage2();
      }
      this.addToCoinlog(2);
      this.findSymbol(2);
      e.persist();
    }
    if (sideBarOpener === true) {
      // this.addSidebar();
    }
    // this.scrollSidebarToTop();
  }

  handleSubmit3 = (e, pos) => {
    const { coinLog } = this.state;
    e.persist();
    if (coinLog[pos] === 'BTC') {
      this.setState({ curr: 'USD' });
      this.scrollSidebarToTop();
    }
    this.setState({ coin1: coinLog[pos] }, () => {
      this.handleSubmit1(e);
    });
  }

  handleSubmit4 = (e, pos) => {
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

  handleSubmit5 = (e, sym, fade = true) => {
    const { graphFocus } = this.state;
    const { sideBarOpener } = this.state;
    e.persist();
    if (graphFocus === 1) {
      this.setState({ coin1: sym }, () => {
        if (!fade) {
          this.handleSubmit1(e, false);
        }
        else if (fade) {
          this.handleSubmit1(e);
        }
      });
    }
    else if (graphFocus === 2) {
      this.setState({ value2: sym, coin2: sym }, () => {
        if (!fade) {
          this.handleSubmit2(e, false);
        }
        else if (fade) {
          this.handleSubmit2(e);
        }
      });
    }
    if (sideBarOpener === true) {
      this.addSidebar();
    }
  }

  scrollSidebarToTop = () => {
    const sidebar = document.getElementById('sidebarContainer');
    setTimeout(() => {
      sidebar.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 800);
  }

  findSymbol = (num) => {
    const { curr } = this.state;
    const { curr2 } = this.state;
    const { sendCoin } = this.props;
    const { coin1 } = this.state;
    const { allCoins } = this.props;
    const { coin2 } = this.state;
    const { days } = this.state;
    const { days2 } = this.state;
    const { toggleCurr } = this.state;
    const { toggleCurr2 } = this.state;

    if (num === 1) {
      const index = allCoins.findIndex(coin3 => coin3.symbol === coin1.toLowerCase());
      if (index !== -1) {
        if (coin1 !== 'BTC' && toggleCurr === false) {
          this.setState({ toggleCurr: true });
        }
        else if (coin1 === 'BTC' && toggleCurr === true) {
          this.setState({ toggleCurr: false });
        }
        setTimeout(() => {
          sendCoin(1, coin1, curr);
          this.fetchCryptocurrencyHistory(1, days);
          this.getPoints(1);
        }, 500);
      }
    }

    else if (num === 2) {
      const index = allCoins.findIndex(coins4 => coins4.symbol === coin1.toLowerCase());
      if (index !== -1) {
        if (coin2 !== 'BTC' && toggleCurr2 === false) {
          this.setState({ toggleCurr2: true });
        }
        else if (coin2 === 'BTC' && toggleCurr2 === true) {
          this.setState({ toggleCurr2: false });
        }
        setTimeout(() => {
          sendCoin(2, coin2, curr2);
          this.fetchCryptocurrencyHistory(2, days2);
          this.getPoints(2);
        }, 500);
      }
    }
  }

  toggleTooltip = (num = 1, action = 'add') => {
    const { coin1 } = this.state;
    const { coin2 } = this.state;

    if (num === 1) {
      const tooltip = document.getElementById(`userInput ${coin1}`);
      if (action === 'add') {
        tooltip.classList.add('active');
        setTimeout(() => {
          tooltip.classList.remove('active');
        }, 2000);
      }
      else if (action === 'remove') {
        tooltip.classList.remove('active');
      }
    }
    else if (num === 2) {
      const tooltip = document.getElementById(`userInput ${coin2}`);
      if (action === 'add') {
        tooltip.classList.add('active');
        setTimeout(() => {
          tooltip.classList.remove('active');
        }, 2000);
      }
      else if (action === 'remove') {
        tooltip.classList.remove('active');
      }
    }
  }

  formatDate = (num = 1) => {
    const { days } = this.state;
    const { days2 } = this.state;
    const { history } = this.state;
    const { history2 } = this.state;
    try {
      if (num === 1) {
        history.forEach((pos) => {
          const { time } = pos;
          if (days > 360) {
            (pos).time = moment.unix(time).format('MMM DD YYYY');
          }
          else {
            (pos).time = moment.unix(time).format('MMM DD');
          }
        });
      }
      else if (num === 2) {
        history2.forEach((pos) => {
          const { time } = pos;
          if (days2 > 360) {
            (pos).time = moment.unix(time).format('MMM DD YYYY');
          }
          else {
            (pos).time = moment.unix(time).format('MMM DD');
          }
        });
      }
    }
    catch (error) {
      console.log('Error processing data!')
    }
  }

  addGraph = (num) => {
    const pose = this.state;
    const { freshReveal } = this.state;
    const { secondGraphVisible } = this.state;
    const { isGraphVisible } = this.state;
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
      });
    }
  }

  addSidebar = () => {
    const { sideBarOpener } = this.state;
    const sidebar = document.getElementById('sidebarContainer');
    sidebar.classList.toggle('open');
    if (sideBarOpener === false) {
      this.setState(() => ({ sideBarOpener: true }));
    }
    else {
      this.setState(() => ({ sideBarOpener: false }));
    }
  }

  changeCurrency1 = (curr) => {
    const { coin1 } = this.state;
    const { days } = this.state;
    const { fetchData } = this.props;
    const graphPrice = document.getElementById('graphPricegraph1');
    graphPrice.classList.add('flash');
    if (curr === 'USD' && coin1 !== 'BTC') {
      this.setState({ curr: 'USD' }, () => {
        this.fetchCryptocurrencyHistory(1, days);
        fetchData(1, 'usd');
      });
    }
    else if (curr === 'BTC' && coin1 !== 'BTC') {
      this.setState({ curr: 'BTC' }, () => {
        this.fetchCryptocurrencyHistory(1, days);
        fetchData(1, 'btc');
      });
    }
  }

  changeCurrency2 = (curr2) => {
    const { coin2 } = this.state;
    const { days2 } = this.state;
    const { fetchData } = this.props;
    const graphPrice = document.getElementById('graphPricegraph2');
    graphPrice.classList.add('flash');
    if (curr2 === 'USD' && coin2 !== 'BTC') {
      this.setState({ curr2: 'USD' }, () => {
        fetchData(2, 'usd');
        this.fetchCryptocurrencyHistory(2, days2);
      });
    }
    else if (curr2 === 'BTC' && coin2 !== 'BTC') {
      this.setState({ curr2: 'BTC' }, () => {
        this.fetchCryptocurrencyHistory(2, days2);
        fetchData(2, 'btc');
      });
    }
  }

  addToCoinlog = (num) => {
    const { coinLog } = this.state;
    const { coin1 } = this.state;
    const { allCoins } = this.props;
    const { coinLog2 } = this.state;
    const { coin2 } = this.state;
    if (num === 1) {
      allCoins.forEach((coins) => {
        if (coins.symbol === coin1.toLowerCase()) {
          coinLog.unshift(coin1);
          const unique = Array.from(new Set(coinLog));
          this.setState({ coinLog: unique }, () => {
            localStorage.setItem('savedCoins', JSON.stringify(unique));
          });
        }
      });
    }
    else if (num === 2) {
      allCoins.forEach((coins) => {
        if (coins.symbol === coin2.toLowerCase()) {
          coinLog2.unshift(coin2);
          const unique = Array.from(new Set(coinLog2));
          this.setState({ coinLog2: unique }, () => {
            localStorage.setItem('savedCoins2', JSON.stringify(unique));
          });
        }
      });
    }
  }

  toggleFavorites = (sidebarCoin) => {
    const { coin1 } = this.state;
    const { coin2 } = this.state;
    const { favorites } = this.state;
    const { graphFocus } = this.state;
    let wanted;
    if (sidebarCoin) {
      wanted = sidebarCoin;
    }
    else if (graphFocus === 1) {
      wanted = coin1;
    }
    else if (graphFocus === 2) {
      wanted = coin2;
    }
    if (favorites.indexOf(wanted) === -1) {
      favorites.push(wanted);
    }
    else {
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i] === wanted) {
          favorites.splice(i, 1);
        }
      }
    }
    const freshFavorites = Array.from(new Set(favorites));
    this.setState({ favorites: freshFavorites }, () => {
      localStorage.setItem('savedFavoriteCoins', JSON.stringify(freshFavorites));
      this.refs.child.getFavorites();
    });
  }

  fadeBackgroundImage1 = () => {
    const bgImage = document.getElementById('cryptoImageBackgroundgraph1');
    const bgImageChartInfo = document.getElementById('cryptoImageBackgroundChartInfograph1');
    bgImage.classList.add('fade');
    bgImageChartInfo.classList.add('fade');
    this.loadSpinner('graph1', false);
  }

  fadeBackgroundImage2 = () => {
    const bgImage2 = document.getElementById('cryptoImageBackgroundgraph2');
    const bgImageChartInfo2 = document.getElementById('cryptoImageBackgroundChartInfograph2');
    bgImage2.classList.add('fade');
    bgImageChartInfo2.classList.add('fade');
    this.loadSpinner('graph2', false);
  }

  loadSpinner = (graph, fade = true) => {
    const element2 = document.getElementById(`NoChartActual ${graph}`);
    const element3 = document.getElementById(`coinInfo ${graph}`);
    if (fade) {
      element2.classList.add('flash');
    }
    element3.classList.add('flash');
    if (graph === 'graph1') {
      this.setState(() => ({ loading: true }));
    }
    else {
      this.setState(() => ({ loading2: true }));
    }
    setTimeout(() => {
      if (fade) {
        element2.classList.remove('flash');
      }
      element3.classList.remove('flash');
      if (graph === 'graph1') {
        this.setState(() => ({ loading: false }));
      }
      else {
        this.setState(() => ({ loading2: false }));
      }
    }, 1000);
  }


  render() {
    const {
      curr, curr2, isEnabled, isEnabled2, freshReveal, secondGraphVisible,
      isGraphVisible, graphData, graphData2, cryptoImage, cryptoImage2, toggleCurr,
      toggleCurr2, days, days2, dateRangeChange, dateRangeChange2, sideBarOpener,
      pose, inputValue, inputValue2, pose2, graphFocus, graphFocus2, favorites, hovered,
      loading, loading2, coin1, coin2
    } = this.state;
    const {
      answer, currentBTCPrice, coin1Info, coin2Info, allCoins
    } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <animations.Reveal4 pose={isGraphVisible ? 'visible2' : 'hidden'} className="animations_Reveal4">
            <div
              className={answer === true ? 'col-sm-2 bitcoinTrackerWrapper yesBackgroundColor'
                : 'col-sm-2 bitcoinTrackerWrapper noBackgroundColor'
              }
              onClick={(e) => {
                this.handleSubmit5(e, 'BTC');
              }}
              role="button"
              tabIndex={0}
              onKeyDown={() => {
                '';
              }
            }
            >
              <BitcoinTracker
                currentBTCPrice={currentBTCPrice}
              />
            </div>
            <Swipe
              id="sidebarContainer"
              className="col-sm-2 sidebar"
              onSwipeLeft={this.addSidebar}
              tolerance={100}
            >
              <Sidebar
                allCoins={allCoins}
                handleSubmit5={this.handleSubmit5}
                favorites={favorites}
                graphFocus={graphFocus}
                toggleFavorites={this.toggleFavorites}
                ref="child"
              />
            </Swipe>
            { sideBarOpener
              ? (
                <div
                  onClick={this.addSidebar}
                  className="offClick"
                />
              )
              : null
            }
          </animations.Reveal4>
        </div>
        <animations.Reveal4 pose={isGraphVisible ? 'visible' : 'hidden'} className="animations_Reveal4">
          <animations.Resize
            className={graphFocus === 1 && secondGraphVisible ? ('col-sm-10 NoGraph popup') : ('col-sm-10 NoGraph')}
            pose={pose}
            onFocus={() => this.setState({ graphFocus: 1, graphFocus2: 2, hovered: true })}
            onMouseOver={() => this.setState({ graphFocus: 1, graphFocus2: 2, hovered: true })}
            onMouseLeave={() => this.setState({ hovered: false })}
          >
            <Graph
              secondGraphVisible={secondGraphVisible}
              loading={loading}
              loadSpinner={this.loadSpinner}
              graphData={graphData}
              isGraphVisible={isGraphVisible}
              isEnabled={isEnabled}
              onHistoryChange={this.onHistoryChange}
              handleSubmit5={this.handleSubmit5}
              handleChange={this.handleChange1}
              changeCurrency={this.changeCurrency1}
              coin1={coin1}
              curr={curr}
              toggleCurr={toggleCurr}
              days={days}
              dateRangeChange={dateRangeChange}
              inputValue={inputValue}
              graphFocus={graphFocus}
              addGraph={this.addGraph}
              toggleFavorites={this.toggleFavorites}
              favorites={favorites}
              setUserInput={this.setUserInput}
              coinInfo={coin1Info}
              id="graph1"
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
          </animations.Resize>
          <div className="imageContainer">
            <animations.Reveal3 pose={(secondGraphVisible && isGraphVisible) || sideBarOpener ? 'hidden' : 'visible'}
              className="animations_Reveal3"
            >
              <div className="plus">
                <div
                  onClick={() => {
                    if (isGraphVisible) {
                      this.addGraph(1);
                    }
                    else {
                      this.addGraph(2);
                    }
                  }
                  }
                  onKeyDown={
                    null
                  }
                  role="button"
                  tabIndex={0}
                >
                  <img className="plusImage" alt="" src={plus} />
                </div>
              </div>
            </animations.Reveal3>
          </div>
        </animations.Reveal4>
        <div>
          {freshReveal ? (
            <animations.Reveal3
              className={graphFocus === 1 ? ('col-sm-10 NoGraphNew animations_Reveal3') : ('col-sm-10 NoGraphNew animations_Reveal3 popup2')}
              pose={pose2}
              onFocus={() => this.setState({ graphFocus: 2, graphFocus2: 1, hovered: true })}
              onMouseOver={() => this.setState({ graphFocus: 2, graphFocus2: 1, hovered: true })}
              onMouseLeave={() => this.setState({ hovered: false })}
            >
              <Graph
                loading={loading2}
                loadSpinner={this.loadSpinner}
                isEnabled={isEnabled2}
                graphData={graphData2}
                isGraphVisible={isGraphVisible}
                secondGraphVisible={secondGraphVisible}
                onHistoryChange={this.onHistoryChange}
                handleSubmit5={this.handleSubmit5}
                handleChange={this.handleChange2}
                changeCurrency={this.changeCurrency2}
                coin1={coin2}
                curr={curr2}
                toggleCurr={toggleCurr2}
                days={days2}
                dateRangeChange={dateRangeChange2}
                inputValue={inputValue2}
                graphFocus={graphFocus2}
                addGraph={this.addGraph}
                toggleFavorites={this.toggleFavorites}
                favorites={favorites}
                setUserInput={this.setUserInput}
                coinInfo={coin2Info}
                id="graph2"
              />
            </animations.Reveal3>
          ) : null
        }
        </div>
        <animations.Reveal4 pose={isGraphVisible ? 'visible2' : 'hidden'}>
          <div
            className="burgerMenuContainer"
            onClick={this.addSidebar}
            onKeyDown={this.addSidebar}
            role="button"
            tabIndex={-1}
          >
            <img className="burgerMenu" alt="" src={burgerMenu} />
          </div>
        </animations.Reveal4>
        <div className="geckoWrapper">
          <span className="gecko">
            {'powered by'}
            <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer">
              {' CoinGecko'}
            </a>
          </span>
        </div>
      </div>
    );
  }
}


Dashboard.propTypes = {
  coin1Info: PropTypes.object,
  coin2Info: PropTypes.object,
  fetchData: PropTypes.func,
  allCoins: PropTypes.array,
  sendCoin: PropTypes.func,
  answer: PropTypes.bool,
  currentBTCPrice: PropTypes.number
};

Dashboard.defaultProps = {
  coin1Info: PropTypes.object,
  coin2Info: PropTypes.object,
  fetchData: PropTypes.func,
  allCoins: PropTypes.array,
  sendCoin: 'sendCoin',
  answer: 'answer',
  currentBTCPrice: PropTypes.string
};

export default Dashboard;
