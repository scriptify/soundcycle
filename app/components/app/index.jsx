import Inferno from 'inferno';
import Component from 'inferno-component'

import uiStore from '../../stores/uiStore';

import './style.css';

import Slider from '../slider';
import Recorder from '../recorder';
import Master from '../master';

import EffectsEditor from '../effects-editor';
import LanesPanel from '../lanes-panel';
import SingleSeqPanel from '../singleseq-panel';


export default class App extends Component {

  render(props) {

    return (
      <div>
        <div className="app-content">
          <SingleSeqPanel />
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
