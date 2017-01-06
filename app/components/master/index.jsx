import Inferno from 'inferno';

import EditEffects from '../edit-effects';
import Effect from '../effect';
import RecordBtn from '../record-btn';
import TextInput from '../text-input';

import './style.css';

const Master = props => {
  return (
    <div className="master">
      <EditEffects />
      <Effect name="Gain" defaultValue={ 0.3 } min={ 0 } max={ 1 } step={ 0.01 } />
      <RecordBtn />
      <TextInput placeholder="Enter filename..."/>
    </div>
  );
};

export default Master;
