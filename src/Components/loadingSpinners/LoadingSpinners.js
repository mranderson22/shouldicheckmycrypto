import React from 'react';
import './LoadingSpinners.css';
import Loader from 'react-loader-spinner';

export const MainSpinner = () => (
  <div className="spinner">
    <Loader type="Oval" color="#dfe2e680" height={120} width={120} />
  </div>
);

export const SidebarSpinner = () => (
  <div className="spinner">
    <Loader type="Grid" color="rgb(24, 33, 44)" height={60} width={60} />
  </div>
);

export const GraphSpinner = () => (
  <div id="spinner" className="spinner">
    <Loader type="Grid" color="#879095" height={60} width={60} />
  </div>
);

export const ChartInfoSpinner = () => (
  <div id="spinner2" className="spinnerChartInfo">
    <Loader type="Grid" color="rgb(24, 33, 44)" height={60} width={60} />
  </div>
);
