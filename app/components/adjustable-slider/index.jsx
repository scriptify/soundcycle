import React from 'react';

import './style.css';

import Slider from '../slider';

const AdjustableSlider = (props) => {
  return (
    <div className={'adjustable-slider'}>
      <div className={'adjust-btn'}>-</div>
      <div className={'inner-slider'}>
        <Slider { ...props }/>
      </div>
      <div className={'adjust-btn'}>+</div>
    </div>
  );
};

export default AdjustableSlider;
