import React from 'react';

import './style.css';

import Lanes from '../lanes';
import EffectsEditor from '../effects-editor';
import Menu from '../Menu';

const MainPane = props => {
  return (
    <div className={'main-pane'}>
      <Menu />
    </div>
  );
};

export default MainPane;
