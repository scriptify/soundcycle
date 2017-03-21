import React from 'react';

import './style.css';

const NavigateBtn = ({ image, ...props }) => {

  return (
    <div className={'navigate-btn'} { ...props }>
      {
        image &&
        <img src={ image } />
      }
    </div>
  );

};

export default NavigateBtn;
