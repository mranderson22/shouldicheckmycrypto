import React from 'react';
import './LoadingSpinners.css';
import Loader from 'react-loader-spinner';

export const MainSpinner = () => (
  <div className="spinner">
    <Loader type="Oval" color="#dfe2e680" height={120} width={120} />
  </div>
);

export const GraphSpinner = () => (
  <div className="spinner">
    <Loader type="Grid" color="rgb(24, 33, 44)" height={60} width={60} />
  </div>
);
