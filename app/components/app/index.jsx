import Inferno from 'inferno';
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'

import './style.css';

import Slider from '../slider';
import Recorder from '../recorder';
import Master from '../master';

import EffectsEditor from '../effects-editor';

@connect(['uiStore'])
export default class App extends Component {

  render({ uiStore }) {

    return (
      <div>
        <div className="app-content">
          <EffectsEditor />
        </div>

        <div className="top-container">
          <Master />
        </div>

        <div className="bottom-container">
          <Recorder />
          <Slider min="0" max="200" step="1"/>
        </div>
      </div>
    );
  }

}
