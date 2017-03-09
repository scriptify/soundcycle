import React from 'react';

import './style.css';

import RCSlider from 'rc-slider';
import 'style-loader!css-loader!rc-slider/assets/index.css';

const Slider = ({ name = '', showValue = false, showAdjustButtons = false, ...props }) => {
  return (
    <div className={'slider'}>
      { showAdjustButtons && <div className={'adjust-btn'}>+</div> }
      <RCSlider className={'slider-component'} { ...props }/>
      { showAdjustButtons && <div className={'adjust-btn'}>-</div> }
    </div>
  );
};

export default Slider;
