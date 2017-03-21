import React from 'react';
import { observer, inject } from 'mobx-react';

import './style.css';

import { UI_STORE, DATA_STORE } from 'stores/constants';

import Pane from 'components/pane';
import Effect from 'components/effect';
import RecordBtn from 'components/record-btn';
import Input from 'components/input';
import NavigateBtn from 'components/navigate-btn';

import effectsImg from 'icons/effects.png';
import settingsImg from 'icons/settings.svg';

const MasterPane = ({
  dataStore
}) => {
  return (
    <div className={'master-pane'}>

      <Pane>

        <div className={'effect-container'}>
          <Effect name={'Gain'}/>
        </div>

        <div className={'record-btn-container'}>
          <RecordBtn isRecording={ false }/>
          <div className={'txt-input'}>
            <Input
              type={'text'}
              value={ dataStore.master.filename }
              onChange={ e => {
                dataStore.setProjectName(e.target.value);
              }}
            />
          </div>
        </div>

        <NavigateBtn image={ settingsImg }/>

        <NavigateBtn image={ effectsImg }/>

      </Pane>

    </div>
  );
};

export default inject(UI_STORE, DATA_STORE)(observer(MasterPane));
