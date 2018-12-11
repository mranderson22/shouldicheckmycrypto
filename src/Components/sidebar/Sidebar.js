import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { topList } = this.props;
    return (
      <div>
        <div className="list-group listAddOn">
          {topList}
        </div>
      </div>
    );
  }
}

export default Sidebar;
