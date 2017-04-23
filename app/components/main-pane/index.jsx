import React from 'react';
import { observer, inject } from 'mobx-react';

import './style.css';

import { UI_STORE, DATA_STORE } from 'stores/constants';

import Lanes from 'components/lanes';
import EffectsEditor from 'components/effects-editor';
import Menu from 'components/Menu';
import FrequencyCanvas from 'components/frequency-canvas';

const MainPane = ({
  uiStore,
  dataStore
}) => {

  const showExclusivePane = uiStore.exclusivePane !== '';
  const show = name => !showExclusivePane && uiStore.visiblePanes.includes(name);

  return (
    <div className={'main-pane'}>
      <FrequencyCanvas data={dataStore.master.frequencyData} />
      { show('effects-editor') &&
          <EffectsEditor />
      }
      {
        show('lanes') &&
          <Lanes />
      }
      {
        uiStore.exclusivePane === 'menu' &&
          <Menu />
      }
    </div>
  );
};

export default inject(UI_STORE, DATA_STORE)(observer(MainPane));
