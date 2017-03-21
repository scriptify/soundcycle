import React from 'react';

import './style.css';

import AdjustableSlider from 'components/adjustable-slider';

const Effect = ({ name, ...rest }) => {

  return (
    <div className={'effect'}>
      <div className={'effect-name'}>
        { name }
      </div>
      <AdjustableSlider showValue={ true } { ...rest } />
    </div>
  );
};

export default Effect;
