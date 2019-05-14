import React from 'react';
import ReactDOM from 'react-dom';
import Splash from './components/Splash';
import 'bootstrap/dist/css/bootstrap.min.css';

require('./styles/main.scss');


ReactDOM.render(<Splash />, document.getElementById('app'));
