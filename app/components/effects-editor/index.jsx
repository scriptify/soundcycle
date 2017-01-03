import Inferno from 'inferno';
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'

import './style.css';

import Effect from '../effect';

@connect(['uiStore'])
export default class App extends Component {

  render({ uiStore }) {
    return (
      <div className="effects-editor">
        <h1>Effects editor</h1>
        <div className="effects">
          <Effect name="Lowpass-Filter" border={ true } canDisable={ true } on={ true } />
          <Effect name="Lowpass-Filter" border={ true } canDisable={ true } on={ true } />
          <Effect name="Lowpass-Filter" border={ true } canDisable={ true } on={ true } />
          <Effect name="Lowpass-Filter" border={ true } canDisable={ true } on={ false } />
          <Effect name="Lowpass-Filter" border={ true } canDisable={ true } on={ true } />
          <Effect name="Lowpass-Filter" border={ true } canDisable={ true } on={ true } />
          <Effect name="Lowpass-Filter" border={ true } canDisable={ true } on={ true } />
          <Effect name="Lowpass-Filter" border={ true } canDisable={ true } on={ false } />
          <Effect name="Lowpass-Filter" border={ true } canDisable={ true } on={ false } />
          <Effect name="Lowpass-Filter" border={ true } canDisable={ true } on={ true } />
          <Effect name="Lowpass-Filter" border={ true } canDisable={ true } on={ false } />
          <Effect name="Lowpass-Filter" border={ true } canDisable={ true } on={ true } />
          <Effect name="Lowpass-Filter" border={ true } canDisable={ true } on={ true } />
          <Effect name="Lowpass-Filter" border={ true } canDisable={ true } on={ true } />
          <Effect name="Lowpass-Filter" border={ true } canDisable={ true } on={ true } />
          <Effect name="Lowpass-Filter" border={ true } canDisable={ true } on={ true } />
        </div>
      </div>
    );
  }

}
