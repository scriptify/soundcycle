import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-mobx';

import EditEffects from '../edit-effects';
import Effect from '../effect';
import RecordBtn from '../record-btn';
import TextInput from '../text-input';

import './style.css';

@connect(['dataStore', 'uiStore'])
export default class Master extends Component {
  constructor(props) {
    super(props);
  }

  render({ dataStore, uiStore }) {

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
