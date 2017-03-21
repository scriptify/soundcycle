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
              dataStore.setEffectValue({ chnlId: dataStore.recorder.id, effectName: 'gain', valueType: 'gain', value: val });
            }}
            onMore={ () => {
              dataStore.setEffectValue({ chnlId: dataStore.recorder.id, effectName: 'gain', valueType: 'gain', value: recorderGainValue + recorderGainData.step });
            }}
            onLess={ () => {
              dataStore.setEffectValue({ chnlId: dataStore.recorder.id, effectName: 'gain', valueType: 'gain', value: recorderGainValue - recorderGainData.step });
            }}
          />
        </div>

        <RecordBtn
          isRecording={ dataStore.recorder.isRecording }
          onClick={ () => {
            dataStore.toggleRecording();
          }}
        />

        <AwesomeSelect
          selected={ dataStore.recorder.currentLane }
          options={ dataStore.lanes.map(lane => {
            return { value: lane.name, id: lane.id };
          }) }
          onSelect={ lane => {
            dataStore.setCurrentLane(lane.id);
          }}
        />

        <NavigateBtn
          image={ effectsImg }
          onClick={ () => {
            uiStore.showEffectsEditor(dataStore.recorder.id);
          }}
        />

      </Pane>

      <div className={'mode-select'}>
        <div
          className={ isMode(dataStore.MODES.NEW_LANE) ? 'option left selected' : 'option left' }
          onClick={ () => {
            dataStore.setMode(dataStore.MODES.NEW_LANE)
          }}
        >New</div>
        <div
          className={ isMode(dataStore.MODES.ADD_TO_LANE) ? 'option right selected' : 'option right' }
          onClick={ () => {
            if(dataStore.lanes.length !== 0)
              dataStore.setMode(dataStore.MODES.ADD_TO_LANE)
          }}
        >Add</div>
      </div>
    </div>
  );
};

export default inject(UI_STORE, DATA_STORE)(observer(RecorderPane));
