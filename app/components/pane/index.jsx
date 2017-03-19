import React from 'react';

import './style.css';

const Pane = ({ children }) => {
  return (
    <div className={'pane'}>
      { children }
    </div>
  );
};

export default Pane;
