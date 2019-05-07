/* eslint-disable react/prop-types */
import React from 'react';
import * as animations from '../animations';
import '../styles/components/_splashHeader.scss';

const SplashHeader = ({ isDashboardVisible }) => (
  <animations.Reveal3
    className="shouldIHeader"
    pose={isDashboardVisible ? 'hidden' : 'visible'}
  >
    <span>
      {'Should I check my crypto?'}
    </span>
  </animations.Reveal3>
);

export default SplashHeader;