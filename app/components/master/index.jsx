import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import EditEffects from '../edit-effects';
import Effect from '../effect';
import RecordBtn from '../record-btn';
import TextInput from '../text-input';

import './style.css';

@inject('uiStore', 'dataStore')
@observer
export default class Master extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { uiStore, dataStore } = this.props;

    const { min, max, defaultValue, step } = dataStore.getEffectValueData('gain', 'gain');

    return (
      <div className="master">
        <EditEffects onClick={() => uiStore.gotoEffectEditor(dataStore.master.id)}/>
        <Effect name="Gain" defaultValue={ defaultValue } min={ min } max={ max } step={ step } onChange={ value => {
          dataStore.setEffectValue({
            chnlId: dataStore.master.id,
            effectName: 'gain',
            valueType: 'gain',
            value
          });
        }}/>
        <RecordBtn recording={ dataStore.master.isRecording } onClick={() => dataStore.toggleProjectRecording()}/>
        <TextInput placeholder="Enter filename..." onInput={ e => dataStore.setProjectName(e.target.value)}/>
      </div>
    );
  }
}
