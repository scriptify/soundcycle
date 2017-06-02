import React from 'react';
import { observer, inject } from 'mobx-react';

import './style.css';

import { UI_STORE, DATA_STORE } from 'stores/constants';

import Pane from 'components/pane';
import Effect from 'components/effect';
import RecordBtn from 'components/record-btn';
import NavigateBtn from 'components/navigate-btn';
import AwesomeSelect from 'components/awesome-select';

import effectsImg from 'icons/effects.png';

const RecorderPane = ({
  dataStore,
  uiStore
}) => {

  const recorderGainData = dataStore.getEffectValueData('gain', 'gain');
  const recorderGainValue = dataStore.getEffectValueObject(dataStore.recorder.effects, 'gain', 'gain').value;
  const isMode = modeName => dataStore.recorder.currentMode === modeName;

  return (
    <div className={'recorder-pane'}>
      <Pane>

        <div className={'effect-container'}>
          <Effect
            name={'Gain'}
            value={ recorderGainValue }
            min={ recorderGainData.min }
            max={ recorderGainData.max }
            step={ recorderGainData.step }
            onChange={ val => {
              dataStore.setEffectValue({ chnlId: dataStore.recorder.id, effectName: 'gain', valueType: 'gain', value: val }, true);
            }}
            onMore={ () => {
              dataStore.setEffectValue({ chnlId: dataStore.recorder.id, effectName: 'gain', valueType: 'gain', value: recorderGainValue + recorderGainData.step }, true);
            }}
            onLess={ () => {
              dataStore.setEffectValue({ chnlId: dataStore.recorder.id, effectName: 'gain', valueType: 'gain', value: recorderGainValue - recorderGainData.step }, true);
            }}
          />
        </div>

        <RecordBtn
          isRecording={ dataStore.recorder.isRecording }
          onClick={ () => {
            dataStore.toggleRecording(null, true);
          }}
        />

        <AwesomeSelect
          selected={ dataStore.recorder.currentLane }
          options={ dataStore.lanes.map(lane => {
            return { value: lane.name, id: lane.id };
          }) }
          onSelect={ lane => {
            dataStore.setCurrentLane(lane.id, true);
          }}
        />

        <NavigateBtn
          image={ effectsImg }
          onClick={ () => {
            uiStore.showEffectsEditor(dataStore.recorder.id, true);
          }}
        />

      </Pane>

      <div className={'mode-select'}>
        <div
          className={ isMode(dataStore.MODES.NEW_LANE) ? 'option left selected' : 'option left' }
          onClick={ () => {
            dataStore.setMode(dataStore.MODES.NEW_LANE, true)
          }}
        >New</div>
        <div
          className={ isMode(dataStore.MODES.ADD_TO_LANE) ? 'option selected' : 'option' }
          onClick={ () => {
            if(dataStore.lanes.length !== 0)
              dataStore.setMode(dataStore.MODES.ADD_TO_LANE, true)
          }}
        >Add</div>
        <div
          className={ isMode(dataStore.MODES.SINGLE_SEQUENCE) ? 'option selected' : 'option' }
          onClick={ () => {
            dataStore.setMode(dataStore.MODES.SINGLE_SEQUENCE, true)
          }}
        >Single</div>
        <div
          className={ isMode(dataStore.MODES.FREE_LOOPING) ? 'option selected right' : 'option right' }
          onClick={ () => {
            dataStore.setMode(dataStore.MODES.FREE_LOOPING, true)
          }}
        >Free</div>
      </div>
    </div>
  );
};

export default inject(UI_STORE, DATA_STORE)(observer(RecorderPane));
