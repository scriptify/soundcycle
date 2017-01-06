import Inferno from 'inferno';
import Component from 'inferno-component'

import uiStore from '../../stores/uiStore';

import './style.css';

import Effect from '../effect';

export default class App extends Component {

  render({ uiStore }) {
    return (
      <div className="effects-editor">
        <h1>Effects editor</h1>
        <div className="effects">
          <Effect defaultValue={ 200 } min={ 0 } max={ 600 } step={ 0.01 } name="Lowpass-Filter" border={ true } canDisable={ true } on={ true } fullWidth={ true }/>
          <Effect defaultValue={ 200 } min={ 0 } max={ 600 } step={ 0.01 } name="Lowpass-Filter" border={ true } canDisable={ true } on={ false } fullWidth={ true }/>
          <Effect defaultValue={ 500 } min={ 0 } max={ 600 } step={ 0.01 } name="Lowpass-Filter" border={ true } canDisable={ true } on={ true } fullWidth={ true }/>
        </div>
      </div>
    );
  }

}
