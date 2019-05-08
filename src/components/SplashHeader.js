/* eslint-disable react/prop-types */
import React from 'react';
import { Reveal3 } from '../utilities/animations';
import '../styles/components/_splashHeader.scss';

const SplashHeader = ({ isDashboardVisible }) => (
  <Reveal3
    className="shouldIHeader"
    pose={isDashboardVisible ? 'hidden' : 'visible'}
  >
    <span>
      {'Should I check my crypto?'}
    </span>
  </Reveal3>
);

export default SplashHeader;
