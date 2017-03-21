import React from 'react';

import './style.css';

import Slider from 'components/slider';

const AdjustableSlider = ({ onMore = () => {}, onLess = () => {}, ...props }) => {
  return (
    <div className={'adjustable-slider'}>
      <div className={'adjust-btn'} onClick={ onLess }>-</div>
      <div className={'inner-slider'}>
        <Slider { ...props }/>
      </div>
      <div className={'adjust-btn'} onClick={ onMore }>+</div>
    </div>
  );
};

export default AdjustableSlider;
