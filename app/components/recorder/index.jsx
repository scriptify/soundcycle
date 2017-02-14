import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import EditEffects from '../edit-effects';
import Effect from '../effect';
import RecordBtn from '../record-btn';
import Select from '../select';

import './style.css';

@inject('uiStore', 'dataStore')
@observer
export default class Recorder extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { uiStore, dataStore } = this.props;

    const { min, max, defaultValue, step } = dataStore.getEffectValueData('gain', 'gain');

    return (
      <div className="recorder-content">

        <EditEffects onClick={() => {
          uiStore.gotoEffectEditor( dataStore.recorder.id );
        }}/>

        <Effect name="Gain" defaultValue={ defaultValue } min={ min } max={ max } step={ step } onChange={ value => {
          dataStore.setEffectValue({
            chnlId: dataStore.recorder.id,
            effectName: 'gain',
            valueType: 'gain',
            value
          });
        }}/>

        <RecordBtn recording={ dataStore.recorder.isRecording } onClick={() => {
          dataStore.toggleRecording();
        }}/>

        <Select onSelect={mode => {
          dataStore.setMode(mode);
        }}>
          <option value={ dataStore.MODES.NEW_LANE }>Create new lane</option>
          <option value={ dataStore.MODES.ADD_TO_LANE }>Add to lane</option>
          <option value={ dataStore.MODES.SINGLE_SEQUENCE }>Add as single sequence</option>
        </Select>


        {
          (dataStore.recorder.currentMode === dataStore.MODES.ADD_TO_LANE) &&
            <Select onSelect={ lane => {
              dataStore.setCurrentLane(lane);
            }}>
              {
                dataStore.lanes.map(({ id, name }) => <option value={ id }>{ name }</option>)
              }
            </Select>
        }


      </div>
    );
  }

}
