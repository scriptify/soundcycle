import React from 'react';

import './style.css';

import Lanes from '../lanes';

const MainPane = props => {
  return (
    <div className={'main-pane'}>
      <Lanes />
    </div>
  );
};

export default MainPane;
