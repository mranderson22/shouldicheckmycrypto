import React from 'react';
import './Header.css';
import { Navbar } from 'reactstrap';


const Header = () => (
  <div>
    <div id="foo" className="navbarcontainer">
      <Navbar className="navbar navbar-expand-lg" />
    </div>
  </div>
);

export default Header;