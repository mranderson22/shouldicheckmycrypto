import React, { Component } from 'react';
import './Sidebar.css';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import heartFilled from '../../../images/heartFilled.png';
import trendingup from '../../../images/trendingup.png';
import trendingdown from '../../../images/trendingdown.png';
import exiticon from '../../../images/exiticon.png';


class Sidebar extends Component {
  state = {
    listStatus: 'Ranked',
    loading: true
  };

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
    }, 1500);
  }


  getTopPercentage = () => {
    const { topList } = this.props;
    this.setState({ listStatus: 'Top' }, () => {
      topList.sort((a, b) => b.percent_change_24h - a.percent_change_24h);
      this.sidebarTemplate(topList);
    });
  }

  getBottomPercentage = () => {
    const { topList } = this.props;
    this.setState({ listStatus: 'Bottom' }, () => {
      topList.sort((a, b) => a.percent_change_24h - b.percent_change_24h);
      this.sidebarTemplate(topList);
    });
  }

  getRanking = () => {
    const { topList } = this.props;
    this.setState({ listStatus: 'Ranked' }, () => {
      topList.sort((a, b) => a.rank - b.rank);
      this.sidebarTemplate(topList);
    });
  }

  getFavorites = () => {
    const { favorites } = this.props;
    const { topList } = this.props;
    this.setState({ listStatus: 'Favorites' }, () => {
      const newFavorites = topList.filter(coins => favorites.includes(coins.symbol));
      newFavorites.sort((a, b) => b.percent_change_24h - a.percent_change_24h);
      this.sidebarTemplateFavorites(newFavorites);
    });
  }

  sidebarTemplate = async (list) => {
    const { favorites } = this.props;
    const { handleSubmit5 } = this.props;
    const newRankingList = await list.map(x => (
      <div key={x.id}>
        <button
          type="button"
          className="list-group-item list-group-item-action "
          onClick={(e) => {
            handleSubmit5(e, x.symbol);
          }
                  }
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
          {favorites.indexOf(x.symbol) === -1
            ? null : (
              <span>
                <img
                  className="heartSidebarListed"
                  src={heartFilled}
                  alt="heart"
                />
              </span>)}
        </button>
      </div>));
    this.setState({ newRankingList });
  }

  sidebarTemplateFavorites = (list) => {
    const { handleSubmit5 } = this.props;
    const { removeFromFavorites } = this.props;
    const newRankingList = list.map(x => (
      <div key={x.id} className="sidebarButtonWrapper">
        <button
          type="button"
          className="list-group-item list-group-item-action "
          onClick={(e) => {
            handleSubmit5(e, x.symbol);
          }
                }
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
          <img className="heartSidebarListed" src={exiticon} alt="favorite" />
        </button>
      </div>));
    this.setState({ newRankingList });
  }


  render() {
    const { newRankingList } = this.state;
    const { listStatus } = this.state;
    const { loading } = this.state;
    return (
      <div>
        {loading ? (
          <div className="spinnercontainerGraph">
            <div className="spinner">
              <Loader type="Grid" color="rgb(24, 33, 44)" height={60} width={60} />
            </div>
          </div>
        ) : null}
        <div className={loading ? 'list-group listAddOn' : 'list-group listAddOn visible'}>
          <nav id="nav" className="nav sticky-top nav-pills nav-fill">
            <span className={listStatus === 'Ranked' ? 'flex-item nav-item nav-link active' : 'flex-item nav-item nav-link'} id="ranked">
            1.2.3.
            </span>
            <span className={listStatus === 'Top' ? 'flex-item nav-item nav-link active' : 'flex-item nav-item nav-link'} id="topPercentage">
              <img className="heartSidebar" src={trendingup} alt="trendingup" />
            </span>
            <span className={listStatus === 'Bottom' ? 'flex-item nav-item nav-link active' : 'flex-item nav-item nav-link'} id="bottomPercentage">
              <img className="heartSidebar" src={trendingdown} alt="trendingdown" />
            </span>
            <span className={listStatus === 'Favorites' ? 'flex-item nav-item nav-link active' : 'flex-item nav-item nav-link'} id="favorites">
              <img className="heartSidebar" src={heartFilled} alt="favorited" />
            </span>
          </nav>
          <div>
            {newRankingList}
          </div>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  topList: PropTypes.array,
  favorites: PropTypes.array,
  handleSubmit5: PropTypes.func,
  removeFromFavorites: PropTypes.func
};

Sidebar.defaultProps = {
  topList: PropTypes.array,
  favorites: PropTypes.array,
  handleSubmit5: PropTypes.func,
  removeFromFavorites: PropTypes.func
};

export default Sidebar;
