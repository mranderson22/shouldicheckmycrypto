import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Input, ButtonGroup
} from 'reactstrap';
import { Reveal3, Reveal4, GraphConnectorAnimation } from '../../animations';
import plus from '../../../images/plus-button.png';
import burgerMenu from '../../../images/burgerMenu.png';
import heart from '../../../images/heart.png';
import heartFilled from '../../../images/heartFilled.png';
import reload from '../../../images/reload.png';
import exit from '../../../images/exiticon.png';
import dollarIcon from '../../../images/dollar-symbol.png';
import bitcoinIcon from '../../../images/bitcoin-logo.png';
import './IconsUI.css';

export const Plus = ({ secondGraphVisible, isGraphVisible, addGraph }) => (
  <Reveal3
    pose={!secondGraphVisible && isGraphVisible ? 'visible' : 'hidden'}
    className="animations_Reveal3 plus"
    onClick={() => {
      if (isGraphVisible) {
        addGraph(1);
      }
      else {
        addGraph(2);
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
  </Reveal3>
);

export const BurgerMenu = ({ isGraphVisible, addSidebar }) => (
  <Reveal4
    pose={isGraphVisible ? 'visible2' : 'hidden'}
    className="burgerMenuContainer"
    onClick={addSidebar}
    onKeyDown={addSidebar}
    role="button"
    tabIndex={-1}
  >
    <img className="burgerMenu" alt="" src={burgerMenu} />
  </Reveal4>
);

export const Gecko = () => (
  <div className="geckoWrapper">
    <span className="gecko">
      {'powered by'}
      <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer">
        {' CoinGecko'}
      </a>
    </span>
  </div>
);

export const Eric = () => (
  <div className="geckoWrapper">
    <span className="eric">
      {'built by'}
      <span className="black2">
        {' Eric Anderson'}
      </span>
    </span>
  </div>
);

export const GraphConnector = ({ graphFocus, graphConnector }) => (
  <div>
    <div className={graphFocus === 1 ? 'graphConnector visible2' : 'graphConnector'} />
    <GraphConnectorAnimation pose={graphConnector ? 'long' : 'short'} className={graphFocus === 2 ? 'graphConnector2 visible2' : 'graphConnector2'} />
  </div>
);

export const OptionsBank = ({
  onFavorite, favorites, coin1, onReload, id, addGraph
}) => (
  <div className="optionsBank">
    <div
      onKeyDown={onFavorite}
      className="favoriteButton"
      role="button"
      tabIndex="0"
      onClick={onFavorite}
    >
      <img
        id={`heartFilled ${id}`}
        className="optionsImage large"
        alt=""
        src={
          favorites.indexOf(coin1) === -1 ? heart : heartFilled
        }
      />
    </div>
    <div
      className="reloadButton"
      onClick={onReload
      }

      onKeyDown={() => {
        '';
      }
    }
      role="button"
      tabIndex={0}
    >
      <img className="optionsImage" id={`optionsImage${id}`} alt="" src={reload} />
    </div>
    {id === 'graph2' ? (
      <div
        className="exitButton"
        onClick={() => {
          addGraph(1);
        }
        }
        onKeyDown={() => {
          '';
        }
        }
        role="button"
        tabIndex={0}
      >
        <img className="optionsImage" alt="" src={exit} />
      </div>) : null }
  </div>
);

export const DaysSelectorSpread = ({ onHistoryChange, days }) => {
  let rSelected2;
  if (days === 31) {
    rSelected2 = 3;
  }
  else if (days === 90) {
    rSelected2 = 4;
  }
  else if (days === 180) {
    rSelected2 = 5;
  }
  else if (days === 365) {
    rSelected2 = 6;
  }
  else if (days === 1500) {
    rSelected2 = 7;
  }

  return (
    <div>
      <Button
        className="selectorButtons"
        color="primary"
        onClick={() => {
          onHistoryChange(30);
        }
        }
        active={rSelected2 === 3}
      >
        { '1m' }
      </Button>
      { ' \u00A0 '}
      { ' \u00A0 '}
      <Button
        className="selectorButtons"
        color="primary"
        onClick={() => {
          onHistoryChange(60);
        }
      }
        active={rSelected2 === 4}
      >
        { '3m' }
      </Button>
      { ' \u00A0 '}
      { ' \u00A0 '}
      <Button
        className="selectorButtons"
        color="primary"
        onClick={() => {
          onHistoryChange(180);
        }
      }
        active={rSelected2 === 5}
      >
        { '6m' }
      </Button>
      { ' \u00A0 '}
      { ' \u00A0 '}
      <Button
        className="selectorButtons"
        color="primary"
        onClick={() => {
          onHistoryChange(365);
        }
      }
        active={rSelected2 === 6}
      >
        { 'YTD' }
      </Button>
      { ' \u00A0 '}
      { ' \u00A0 '}
      <Button
        className="selectorButtons"
        color="primary"
        onClick={() => {
          onHistoryChange(1000);
        }
      }
        active={rSelected2 === 7}
      >
        { 'All' }
      </Button>
    </div>
  );
};

export const DaysSelectorDropdown = ({ onHistoryChange }) => (
  <Input
    defaultValue="6M"
    type="select"
    className="daysselectorDropdown"
    onChange={(e) => {
      if (e.target.value === '1M') {
        onHistoryChange(30);
      }
      else if (e.target.value === '3M') {
        onHistoryChange(60);
      }
      else if (e.target.value === '6M') {
        onHistoryChange(180);
      }
      else if (e.target.value === 'YTD') {
        onHistoryChange(365);
      }
      else if (e.target.value === 'ALL') {
        onHistoryChange(1000);
      }
    }}
  >
    <option value="1M">
      {'1 Month'}
    </option>
    <option value="3M">
      {'3 Months'}
    </option>
    <option value="6M">
      {'6 Months'}
    </option>
    <option value="YTD">
      {'YTD'}
    </option>
    <option value="ALL">
      {'All'}
    </option>
  </Input>
);

export const CurrSelector = ({ changeCurrency, id, curr }) => {
  const rSelected = curr === 'USD' ? 1 : 2;
  return (
    <div className="currSelector">
      <ButtonGroup>
        <Button
          className="currButton"
          onClick={() => {
            changeCurrency('USD', id);
          }
        }
          active={rSelected === 1}
        >
          <img src={dollarIcon} className="currIcons" alt="dollar" />
        </Button>
        <Button
          className="currButton"
          onClick={() => {
            changeCurrency('BTC', id);
          }
        }
          active={rSelected === 2}
        >
          <img src={bitcoinIcon} className="currIcons" alt="bitcoin" />
        </Button>
      </ButtonGroup>
    </div>
  );
};

CurrSelector.propTypes = {
  changeCurrency: PropTypes.func,
  id: PropTypes.string,
  curr: PropTypes.string
};

CurrSelector.defaultProps = {
  changeCurrency: PropTypes.func,
  id: PropTypes.string,
  curr: PropTypes.string
};
