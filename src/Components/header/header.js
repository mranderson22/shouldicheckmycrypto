import React, {Component} from 'react';
import style from './Header.css';
import { Navbar } from 'reactstrap';



class Header extends Component {
  render() {
    return (
      <div>
        <div className="navbarcontainer">
          <Navbar className="navbar navbar-expand-lg">

          </Navbar>
        </div>
      </div>
    );
  }
}

export default Header;
