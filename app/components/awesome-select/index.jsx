import React from 'react';

import './style.css';

const AwesomeSelect = ({ options }) => {

  return (
    <div className={'awesome-select'}>
      {
        options.map(option =>
          <div
            className={'option'}
            key={option}>
              {option}
            </div>
        )
      }
    </div>
  );

};

export default AwesomeSelect;
