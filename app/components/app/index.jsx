import Inferno from 'inferno';
import Component from 'inferno-component'
import { connect } from 'inferno-mobx';

import './style.css';

import Slider from '../slider';
import Recorder from '../recorder';
import Master from '../master';

import EffectsEditor from '../effects-editor';
import LanesPanel from '../lanes-panel';
import SingleSeqPanel from '../singleseq-panel';

@connect(['uiStore', 'dataStore'])
export default class App extends Component {

  render({ uiStore }) {

    const { position } = uiStore;

    return (
      <div>
        <div className="app-content">
          {
            (position === 1) &&
              <SingleSeqPanel />
          }
          {
            (position === 2) &&
              <LanesPanel />
          }
          {
            (position === 3) &&
              <EffectsEditor />
          }
        </div>

        <div className="top-container">
          <Master />
        </div>

        <div className="bottom-container">
          <Recorder />
          <Slider min="0" max="300" step="1" hideNum onChange={ val => {
            if(val <= 100)
              uiStore.setPosition(1)
            else if(val > 100 && val <= 200)
              uiStore.setPosition(2)
            else if(val > 200 && val <= 300)
              uiStore.setPosition(3)
          }}/>
        </div>
      </div>
    );
  }

}
