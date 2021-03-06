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
  dataStore,
  uiStore
}) => {

  const masterGainData = dataStore.getEffectValueData('gain', 'gain');
  const masterGainValue = dataStore.getEffectValueObject(dataStore.master.effects, 'gain', 'gain').value;

  return (
    <div className={'master-pane'}>

      <Pane>

        <div className={'effect-container'}>
          <Effect
            name={'Gain'}
            value={ masterGainValue }
            min={ masterGainData.min }
            max={ masterGainData.max }
            step={ masterGainData.step }
            onChange={ val => {
              dataStore.setEffectValue({ chnlId: dataStore.master.id, effectName: 'gain', valueType: 'gain', value: val }, true);
            }}
            onMore={ () => {
              dataStore.setEffectValue({ chnlId: dataStore.master.id, effectName: 'gain', valueType: 'gain', value: masterGainValue + masterGainData.step }, true);
            }}
            onLess={ () => {
              dataStore.setEffectValue({ chnlId: dataStore.master.id, effectName: 'gain', valueType: 'gain', value: masterGainValue - masterGainData.step }, true);
            }}
          />
        </div>

        <div className={'record-btn-container'}>
          <RecordBtn
            isRecording={ dataStore.master.isRecording }
            onClick={ () => {
              dataStore.toggleProjectRecording(null, true);
            }}
          />
          <div className={'txt-input'}>
            <Input
              type={'text'}
              value={ dataStore.master.filename }
              onChange={ e => {
                dataStore.setProjectName(e.target.value, true);
              }}
            />
          </div>
        </div>

        <NavigateBtn
          image={ settingsImg }
          onClick={ () => {
            uiStore.showMenu(null, true);
          }}
        />

        <NavigateBtn
          image={ effectsImg }
          onClick={ () => {
            uiStore.showEffectsEditor( dataStore.master.id, true );
          }}
        />

      </Pane>

    </div>
  );
};

export default inject(UI_STORE, DATA_STORE)(observer(MasterPane));
