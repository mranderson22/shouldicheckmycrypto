/* eslint-disable max-len */
import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Swipe from 'react-easy-swipe';
import PropTypes from 'prop-types';
import heartFilled from '../../images/heartFilled.png';
import trendingup from '../../images/trendingup.png';
import trendingdown from '../../images/trendingdown.png';
import exiticon from '../../images/exiticon.png';
import listImage from '../../images/list.png';
import { SidebarSpinner } from './LoadingSpinners';


class Sidebar extends Component {
  state = {
    listStatus: 'Ranked',
    loading: true
  };

  async componentDidMount() {
    const { allCoins } = this.props;
    document.getElementById('topPercentage').addEventListener('click', this.getTopPercentage);
    document.getElementById('bottomPercentage').addEventListener('click', this.getBottomPercentage);
    document.getElementById('ranked').addEventListener('click', this.getRanking);
    document.getElementById('favorites').addEventListener('click', this.getFavorites);
    setTimeout(() => {
      this.setState({ loading: false }, () => {
        this.sidebarTemplate(allCoins);
      });
    }, 1500);
  }


  getTopPercentage = () => {
    const { allCoins } = this.props;
    this.setState({ listStatus: 'Top' }, () => {
      allCoins.sort((a, b) => b.price_change_percentage_24h_in_currency - a.price_change_percentage_24h_in_currency);
      this.sidebarTemplate(allCoins);
    });
  }

  getBottomPercentage = () => {
    const { allCoins } = this.props;
    this.setState({ listStatus: 'Bottom' }, () => {
      allCoins.sort((a, b) => a.price_change_percentage_24h_in_currency - b.price_change_percentage_24h_in_currency);
      this.sidebarTemplate(allCoins);
    });
  }

  getRanking = () => {
    const { allCoins } = this.props;
    this.setState({ listStatus: 'Ranked' }, () => {
      allCoins.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
      this.sidebarTemplate(allCoins);
    });
  }

  getFavorites = () => {
    const { favorites } = this.props;
    const { allCoins } = this.props;
    this.setState({ listStatus: 'Favorites' }, () => {
      const newFavorites = allCoins.filter(coins => favorites.includes(coins.symbol.toUpperCase()));
      newFavorites.sort((a, b) => b.price_change_percentage_24h_in_currency - a.price_change_percentage_24h_in_currency);
      this.sidebarTemplateFavorites(newFavorites);
    });
  }

  sidebarTemplate = async (list) => {
    const {
      favorites, handleExternalComponentSubmit
    } = this.props;
    const newRankingList = await list.map(x => (
      <div key={x.id}>
        <div
          role="button"
          tabIndex="-1"
          id="sidebarButton"
          type="link"
          className={favorites.indexOf(x.symbol.toUpperCase()) === -1 ? 'sidebar__list-item' : 'sidebar__list-item buttonFav'}
          onClick={(e) => {
            handleExternalComponentSubmit(e, x.symbol.toUpperCase());
          }
        }
          onKeyPress={(e) => {
            handleExternalComponentSubmit(e, x.symbol.toUpperCase());
          }
                  }
        >
          <img className="sidebarIcon" src={x.image} alt={x} />
          <div>
            <span className="sidebarRank">
              {`${x.market_cap_rank}.`}
              &nbsp;
            </span>
            <span className="sidebarCoin">
              {x.symbol.toUpperCase()}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
          <span className={x.price_change_percentage_24h_in_currency > 0 ? 'greenText' : 'redText'}>
            {`${parseFloat(x.price_change_percentage_24h_in_currency).toFixed(2)} %`}
          </span>
          {favorites.indexOf(x.symbol.toUpperCase()) === -1
            ? null : (
              <img
                className="heartSidebarListed"
                src={heartFilled}
                alt="heart"
              />
            )}
        </div>
      </div>));
    this.setState({ newRankingList });
  }

  sidebarTemplateFavorites = (list) => {
    const { favorites } = this.props;
    const { handleExternalComponentSubmit } = this.props;
    const { toggleFavorites } = this.props;
    if (favorites.length !== 0) {
      const newRankingList = list.map(x => (
        <div key={x.id} className="sidebarButton-Wrapper">
          <div
            role="button"
            tabIndex="-1"
            id="sidebarButton"
            type="link"
            className={favorites.indexOf(x.symbol.toUpperCase()) === -1 ? 'sidebar__list-item' : 'sidebar__list-item buttonFav'}
            onClick={(e) => {
              handleExternalComponentSubmit(e, x.symbol.toUpperCase());
            }
          }
            onKeyPress={(e) => {
              handleExternalComponentSubmit(e, x.symbol.toUpperCase());
            }
                    }
          >
            <img className="sidebarIcon" src={x.image} alt={x} />
            <div>
              <span className="sidebarRank">
                {`${x.market_cap_rank}.`}
              &nbsp;
              </span>
              <span className="sidebarCoin">
                {x.symbol.toUpperCase()}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </div>
            <span className={x.price_change_percentage_24h_in_currency > 0 ? 'greenText' : 'redText'}>
              {`${parseFloat(x.price_change_percentage_24h_in_currency).toFixed(2)} %`}
            </span>
          </div>
          <button
            className="removeFavorite"
            type="button"
            onClick={() => {
              toggleFavorites(x.symbol.toUpperCase());
            }}
          >
            <img className="exitIcons" src={exiticon} alt="favorite" />
          </button>
        </div>));
      this.setState({ newRankingList });
    }
    else {
      const newRankingList = (
        <div className="emptyFavorites sidebar__list-item">
          {'Start Adding Favorites!'}
        </div>
      );
      this.setState({ newRankingList });
    }
  }


  render() {
    const { newRankingList, listStatus, loading } = this.state;
    const { addSidebar, sideBarOpener } = this.props;

    return (
      <Swipe
        id="sidebarContainer"
        className="col-sm-2 sidebar"
        onSwipeLeft={addSidebar}
        tolerance={100}
      >
        {loading && (
          <SidebarSpinner />
        )}
        <div className={loading ? 'sidebar__list' : 'sidebar__list visible'}>
          <nav id="nav" className="nav nav-pills nav-fill">
            <span className={listStatus === 'Ranked' ? 'flex-item nav-link active' : 'flex-item nav-link'} id="ranked">
              <img className="heartSidebar" src={listImage} alt="ranked" />
            </span>
            <span className={listStatus === 'Top' ? 'flex-item nav-link active' : 'flex-item nav-link'} id="topPercentage">
              <img className="heartSidebar" src={trendingup} alt="trendingup" />
            </span>
            <span className={listStatus === 'Bottom' ? 'flex-item nav-link active' : 'flex-item nav-link'} id="bottomPercentage">
              <img className="heartSidebar" src={trendingdown} alt="trendingdown" />
            </span>
            <span className={listStatus === 'Favorites' ? 'flex-item nav-link active' : 'flex-item nav-link'} id="favorites">
              <img className="heartSidebar" src={heartFilled} alt="favorited" />
            </span>
          </nav>
          <div>
            <Scrollbars
              renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
              renderView={props => <div {...props} className="view" />}
              autoHide
              autoHideTimeout={2000}
            >
              {newRankingList}
            </Scrollbars>
          </div>
        </div>
        { sideBarOpener
          && (
            <div
              role="presentation"
              onClick={addSidebar}
              className="offClick"
            />
          )
        }
      </Swipe>
    );
  }
}

Sidebar.propTypes = {
  allCoins: PropTypes.array,
  favorites: PropTypes.array,
  handleExternalComponentSubmit: PropTypes.func,
  toggleFavorites: PropTypes.func,
  addSidebar: PropTypes.func,
  sideBarOpener: PropTypes.bool
};

Sidebar.defaultProps = {
  allCoins: PropTypes.array,
  favorites: PropTypes.array,
  handleExternalComponentSubmit: PropTypes.func,
  toggleFavorites: PropTypes.func,
  addSidebar: PropTypes.func,
  sideBarOpener: PropTypes.bool
};

export default Sidebar;
