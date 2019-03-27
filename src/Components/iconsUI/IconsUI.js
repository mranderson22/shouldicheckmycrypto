import React from 'react';
import { Reveal3, Reveal4 } from '../../animations';
import plus from '../../../images/plus-button.png';
import burgerMenu from '../../../images/burgerMenu.png';
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
