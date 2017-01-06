import Inferno from 'inferno';
import Component from 'inferno-component'

import uiStore from '../../stores/uiStore';

import './style.css';

import AudioChnl from '../audio-chnl';

export default class SingleSeqPanel extends Component {

  render(props) {
    return (
      <div className="singleseq-panel">
        <AudioChnl />
      </div>
    );
  }

}
