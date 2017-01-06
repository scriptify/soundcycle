import Inferno from 'inferno';
import Component from 'inferno-component'

import uiStore from '../../stores/uiStore';

import './style.css';

import AudioChnl from '../audio-chnl';

export default class LanesPanel extends Component {

  render(props) {
    return (
      <div className="lanes-panel">
        <div className="lane">
          <p className="name">Lane 1</p>
          <AudioChnl paused/>
          <AudioChnl />
          <AudioChnl />
          <AudioChnl />
          <AudioChnl />
          <AudioChnl paused/>
          <AudioChnl />
          <AudioChnl />
          <AudioChnl />
          <AudioChnl />
          <AudioChnl paused/>
          <AudioChnl />
          <AudioChnl />
          <AudioChnl />
          <AudioChnl />
          <AudioChnl paused/>
          <AudioChnl />
          <AudioChnl />
          <AudioChnl />
          <AudioChnl />
        </div>

      </div>
    );
  }

}
