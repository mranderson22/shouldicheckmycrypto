import React from 'react';
import './LoadingSpinners.css';
import Loader from 'react-loader-spinner';

export const MainSpinner = () => (
  <div className="spinner">
    <Loader type="Oval" color="#dfe2e680" height={120} width={120} />
  </div>
);
