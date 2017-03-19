import React from 'react';

import './style.css';

import RCSlider from 'rc-slider';
import 'style-loader!css-loader!rc-slider/assets/index.css';

const Slider = ({ name = '', showValue = false, value, ...propsRest }) => {

  const props = {
    value,
    ...propsRest
  };

  return (
    <div className={'custom-slider'}>
      { showValue &&
        <div className={'value'}>
          { value }
        </div>
      }
      <RCSlider className={'slider-component'} { ...props }/>
    </div>
  );
};

export default Slider;
