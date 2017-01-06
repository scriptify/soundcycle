import Inferno from 'inferno';

import EditEffects from '../edit-effects';
import Effect from '../effect';
import RecordBtn from '../record-btn';
import Select from '../select';

import './style.css';

const Recorder = props => {
  return (
    <div className="recorder-content">
      <EditEffects />
      <Effect name="Gain" defaultValue={ 0.3 } min={ 0 } max={ 1 } step={ 0.01 } />
      <RecordBtn/>
      <Select>
        <option selected>Create new lane</option>
        <option>Add to lane</option>
        <option>Add as single sequence</option>
      </Select>
      <Select>
        <option selected value={ 1 }>Lane 1</option>
        <option selected value={ 2 }>Lane 2</option>
      </Select>
    </div>
  );
};

export default Recorder;
