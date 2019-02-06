import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listStatus: 'Ranked'
    };
    this.getTopPercentage = this.getTopPercentage.bind(this);
    this.getBottomPercentage = this.getBottomPercentage.bind(this);
    this.getRanking = this.getRanking.bind(this);
    this.sidebarTemplate = this.sidebarTemplate.bind(this);
  }

  componentDidMount() {
    const { topList } = this.props;
    document.getElementById('topPercentage').addEventListener('click', this.getTopPercentage);
    document.getElementById('bottomPercentage').addEventListener('click', this.getBottomPercentage);
    document.getElementById('ranked').addEventListener('click', this.getRanking);
    this.sidebarTemplate(topList);
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

  sidebarTemplate(list) {
    const { handleSubmit5 } = this.props;
    const newRankingList = list.map((x, y) =>
      (
        <button type="button" className="list-group-item list-group-item-action " key={y} onClick={(e) =>
        {handleSubmit5(e, x.symbol)}}>
          <span className="sidebarRank">{x.rank + ".     "}&nbsp;</span>
          <span className="sidebarCoin">{x.id}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className={x.percent_change_24h > 0 ? "greenText right" : "redText right"}>
          {x.percent_change_24h + '%'}</span>
        </button>))
        this.setState({ newRankingList });
  }

  render() {
    const { newRankingList } = this.state;
    const { listStatus } = this.state;
    return (
      <div>
        <div className="list-group listAddOn">
          <nav id="nav" className="nav nav-pills nav-fill">
            <a className={listStatus === 'Ranked' ? "nav-item nav-link active" : "nav-item nav-link"} href="#" id="ranked">Ranking</a>
            <a className={listStatus === 'Top' ? "nav-item nav-link active" : "nav-item nav-link"} href="#" id="topPercentage">Top %</a>
            <a className={listStatus === 'Bottom' ? "nav-item nav-link active" : "nav-item nav-link"} href="#" id="bottomPercentage">Bottom %</a>
          </nav>
          {newRankingList}
        </div>
      </div>
    );
  }
}

export default Sidebar;
