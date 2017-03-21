import React from 'react';

import './style.css';

import AdjustableSlider from 'components/adjustable-slider';

const Effect = ({ name }) => {

  return (
    <div className={'effect'}>
      <div className={'effect-name'}>
        { name }
      </div>
      <AdjustableSlider showValue={ true } value={ 0.6 } />
    </div>
  );
};

export default Effect;
