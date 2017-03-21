import React from 'react';

import './style.css';

import RCSlider from 'rc-slider';
import 'style-loader!css-loader!rc-slider/assets/index.css';

const Slider = ({ name = '', showValue = false, value = 0, ...propsRest }) => {

  const props = {
    value,
    ...propsRest
  };

  return (
    <div className={'custom-slider'}>
      { showValue &&
        <div className={'value'}>
          { value.toFixed(2) }
        </div>
      }
      <RCSlider className={'slider-component'} { ...props }/>
    </div>
  );
};

export default Slider;
