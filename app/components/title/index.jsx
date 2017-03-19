import React from 'react';

import './style.css';

const Title = ({ name, icon }) => {

  return (
    <div className={'title'}>
      <div className={'content'}>
        <div className={'text'}>{ name }</div>
        <div className={'icon'}>
          <img src={ icon } />
        </div>
      </div>
    </div>
  );

};

export default Title;
