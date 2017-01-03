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
      <Effect name="Gain" />
      <RecordBtn />
      <TextInput placeholder="Enter filename..."/>
    </div>
  );
};

export default Master;
