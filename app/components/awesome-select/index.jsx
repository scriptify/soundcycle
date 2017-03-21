import React from 'react';

import './style.css';

const AwesomeSelect = ({ options = [], onSelect = () => {}, selected }) => {

  return (
    <div className={'awesome-select'}>
      {
        options.map(({ id, value }) =>
          <div
            className={(id === selected) ? 'option selected' : 'option'}
            onClick={ () => {
              onSelect({ id, value });
            }}
            key={id}>
              { value }
            </div>
        )
      }
    </div>
  );

};

export default AwesomeSelect;
