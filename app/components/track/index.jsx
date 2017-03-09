import React from 'react';

import './style.css';

import Slider from '../slider';
import deleteIcon from '../../icons/delete.svg';
import playIcon from '../../icons/play.svg';

const Track = props => {
  return (
    <div className={'track'}>
      <div className={'title-bar'}>
        <div className={'name'}>Track 1</div>
        <div className={'delete-icon'}>
          <img src={ deleteIcon } />
        </div>
      </div>
      <div className={'icon'}>
        <img src={ playIcon } />
      </div>
      <div className={'slider-container'}>
        <div className={'center'}>
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default Track;
