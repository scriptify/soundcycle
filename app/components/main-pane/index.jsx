import React from 'react';

import './style.css';

import Lanes from '../lanes';
import EffectsEditor from '../effects-editor';

const MainPane = props => {
  return (
    <div className={'main-pane'}>
      <EffectsEditor />
      <Lanes />
    </div>
  );
};

export default MainPane;
