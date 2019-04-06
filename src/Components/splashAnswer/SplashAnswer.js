/* eslint-disable react/prop-types */
import React from 'react';
import { MainSpinner } from '../loadingSpinners/LoadingSpinners';
import { Reveal, Reveal2 } from '../../animations';
import lockbody from '../../../images/lockbody.png';
import './SplashAnswer.css';

const SplashAnswer = ({
  loading, isAnswerBoxVisible, onLockClick, answer, text, down
}) => (
  <div className="answerWrapper">
    {loading ? (
      <MainSpinner />
    ) : null}
    <h1 className="answerBox">
      <Reveal pose={isAnswerBoxVisible ? 'visible' : 'hidden'} className="animations_reveal">
        {text}
      </Reveal>
    </h1>
    {
  answer === true || down ? null : (
    <div className="lockbody">
      <div
        onClick={onLockClick}
        onKeyDown={onLockClick}
        role="button"
        tabIndex={0}
      >
        <Reveal2 pose={isAnswerBoxVisible ? 'visible' : 'hidden'} className="animations_reveal2">
          <div>
            <img className="lockImage" alt="" src={lockbody} />
          </div>
        </Reveal2>
      </div>
    </div>)
}
  </div>
);

export default SplashAnswer;
