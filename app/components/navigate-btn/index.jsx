import React from 'react';

import './style.css';

const NavigateBtn = ({ image }) => {

  return (
    <div className={'navigate-btn'}>
      {
        image &&
        <img src={ image } />
      }
    </div>
  );

};

export default NavigateBtn;
