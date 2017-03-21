import React from 'react';

import './style.css';

const Input = ({
  onClick = () => {},
  ...props
}) => {

  return (
    <div className={'input-component'} onClick={ onClick }>
      <input {...props}/>
    </div>
  );

};

export default Input;
