/* eslint-disable react/prop-types */
import React from 'react';
import { MainSpinner } from './LoadingSpinners';
import { Reveal, Reveal2 } from '../utilities/animations';
import hand from '../../images/hand.svg';

const SplashAnswer = ({
  loading, isAnswerBoxVisible, onLockClick, answer, text, down
}) => (
  <div className="answerWrapper">
    {loading ? (
      <MainSpinner />
    ) : null}
    <Reveal className="answerBox" pose={isAnswerBoxVisible ? 'visible' : 'hidden'}>
      {text}
    </Reveal>
    {
  answer === true || down ? null : (
    <Reveal2
      className="lockbody"
      onClick={onLockClick}
      onKeyDown={onLockClick}
      role="button"
      tabIndex={0}
      pose={isAnswerBoxVisible ? 'visible' : 'hidden'}
    >
      <img className="lockImage" alt="" src={hand} />
    </Reveal2>)
}
  </div>
);

export default SplashAnswer;
