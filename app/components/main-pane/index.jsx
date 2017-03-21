import React from 'react';

import './style.css';

import Lanes from 'components/lanes';
import EffectsEditor from 'components/effects-editor';
import Menu from 'components/Menu';

const MainPane = props => {
  return (
    <div className={'main-pane'}>
      <Menu />
    </div>
  );
};

export default MainPane;
