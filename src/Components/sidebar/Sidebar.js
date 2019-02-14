import React, { Component } from 'react';
import './Sidebar.css';
import Loader from 'react-loader-spinner';
import heartFilled from '../../../images/heartFilled.png';
import trendingup from '../../../images/trendingup.png';
import trendingdown from '../../../images/trendingdown.png';
import exiticon from '../../../images/exiticon.png';


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listStatus: 'Ranked',
      loading: true
    };
    this.getTopPercentage = this.getTopPercentage.bind(this);
    this.getBottomPercentage = this.getBottomPercentage.bind(this);
    this.getRanking = this.getRanking.bind(this);
    this.sidebarTemplate = this.sidebarTemplate.bind(this);
    this.sidebarTemplateFavorites = this.sidebarTemplateFavorites.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  async componentDidMount() {
    const { topList } = this.props;
    document.getElementById('topPercentage').addEventListener('click', this.getTopPercentage);
    document.getElementById('bottomPercentage').addEventListener('click', this.getBottomPercentage);
    document.getElementById('ranked').addEventListener('click', this.getRanking);
    document.getElementById('favorites').addEventListener('click', this.getFavorites);
    setTimeout(() => {
      this.setState({ loading: false }, () => {
        this.sidebarTemplate(topList);
      });
    }, 3000);
  }


  getTopPercentage() {
    const { topList } = this.props;
    this.setState({ listStatus: 'Top' }, () => {
      topList.sort((a, b) => b.percent_change_24h - a.percent_change_24h);
      this.sidebarTemplate(topList);
    });
  }

  getBottomPercentage() {
    const { topList } = this.props;
    this.setState({ listStatus: 'Bottom' }, () => {
      topList.sort((a, b) => a.percent_change_24h - b.percent_change_24h);
      this.sidebarTemplate(topList);
    });
  }

  getRanking() {
    const { topList } = this.props;
    this.setState({ listStatus: 'Ranked' }, () => {
      topList.sort((a, b) => a.rank - b.rank);
      this.sidebarTemplate(topList);
    });
  }

  getFavorites() {
    const { favorites } = this.props;
    const { topList } = this.props;
    this.setState({ listStatus: 'Favorites' }, () => {
      const newFavorites = topList.filter(coins => favorites.includes(coins.symbol));
      newFavorites.sort((a, b) => b.percent_change_24h - a.percent_change_24h);
      this.sidebarTemplateFavorites(newFavorites);
    });
  }

  async sidebarTemplate(list) {
    const { favorites } = this.props;
    const { handleSubmit5 } = this.props;
    const newRankingList = await list.map((x, y) =>
      (
        <div key={y}>
        <button type="button" className="list-group-item list-group-item-action " onClick={(e) =>
        {handleSubmit5(e, x.symbol)}}>
          <span className="sidebarRank">{x.rank + ".     "}&nbsp;</span>
          <span className="sidebarCoin">{x.symbol}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className={x.percent_change_24h > 0 ? "greenText right" : "redText right"}>
          {x.percent_change_24h + '%'}</span>
          {favorites.indexOf(x.symbol) === -1 ? 
            null : (<span><img className="heartSidebarListed" src={heartFilled}/></span>)}
        </button>
        </div>));
    this.setState({ newRankingList });
  }

  sidebarTemplateFavorites(list) {
    const { favorites } = this.props;
    const { handleSubmit5 } = this.props;
    const { removeFromFavorites } = this.props;
    const newRankingList = list.map((x, y) => (
      <div key={y} className="sidebarButtonWrapper">
      <button
        type="button"
        className="list-group-item list-group-item-action "
        onClick={(e) => {
          handleSubmit5(e, x.symbol);
        }}
      >
        <span className="sidebarRank">
          {`${x.rank}.`}
          &nbsp;
        </span>
        <span className="sidebarCoin">
          {x.symbol}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span className={x.percent_change_24h > 0 ? 'greenText right' : 'redText right'}>
          {`${x.percent_change_24h} %`}
        </span>
      </button>
      <button
      className="removeFavorite"
      type="button"
      onClick={() => {
        removeFromFavorites(x.symbol);
      }}
      >
              <img className="heartSidebarListed" src={exiticon}/>
      </button>
      </div>)
    );
    this.setState({ newRankingList });

  }


  render() {
    const { newRankingList } = this.state;
    const { listStatus } = this.state;
    const { loading } = this.state;
    return (
      <div>
        {loading ? (
          <div className="spinnercontainer">
            <div className="spinner">
              <Loader type="Grid" color="#0d0c0c" height={60} width={60} />
            </div>
          </div>
        ) : null}
        <div className={loading ? "list-group listAddOn" : "list-group listAddOn visible"}>
          <nav id="nav" className="nav nav-pills nav-fill">
            <a className={listStatus === 'Ranked' ? "nav-item nav-link active" : "nav-item nav-link"} href="#" id="ranked">1.2.3.</a>
            <a className={listStatus === 'Top' ? "nav-item nav-link active" : "nav-item nav-link"} href="#" id="topPercentage">
              <img className="heartSidebar" src={trendingup}/>
            </a>
            <a className={listStatus === 'Bottom' ? "nav-item nav-link active" : "nav-item nav-link"} href="#" id="bottomPercentage">
              <img className="heartSidebar" src={trendingdown}/>
            </a>
            <a className={listStatus === 'Favorites' ? "nav-item nav-link active" : "nav-item nav-link"} href="#" id="favorites">
              <img className="heartSidebar" src={heartFilled}/>
            </a>
          </nav>
          {newRankingList}
        </div>
      </div>
    );
  }
}

export default Sidebar;
