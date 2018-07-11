import React, {Component} from 'react';
import style from './header.css';
import { Navbar } from 'reactstrap';



class header extends Component {
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

export default header;
