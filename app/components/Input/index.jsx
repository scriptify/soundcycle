import React from 'react';

import './style.css';

const Input = props => {

  return (
    <div className={'input-component'}>
      <input {...props}/>
    </div>
  );

};

export default Input;
