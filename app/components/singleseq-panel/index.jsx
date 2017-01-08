import Inferno from 'inferno';
import Component from 'inferno-component'
import { connect } from 'inferno-mobx';

import './style.css';

import AudioChnl from '../audio-chnl';
import Slider from '../slider';

@connect(['uiStore', 'dataStore'])
export default class SingleSeqPanel extends Component {

  render({ dataStore, uiStore }) {

    const { min, max, defaultValue, step } = dataStore.getEffectValueData('gain', 'gain');

    return (
      <div className="singleseq-panel">
        <h1 className="title">Single Sequences</h1>
        <div className="audio-chnls">
          {
            dataStore.singleSeqChnls.map(chnl => {
              return (
                <AudioChnl
                  paused={ !chnl.isPlaying }
                  onDelete={ () => dataStore.removeTrack(chnl.id) }
                  onToggleStatus={ () => dataStore.togglePlayStatus(chnl.id) }
                  onEditEffects={ () => dataStore.gotoEffectEditor(chnl.id) }
                >
                  <Slider min={ min } max={ max } defaultValue={ defaultValue } step={ step } onChange={ value => {
                    dataStore.setEffectValue({
                      chnlId: chnl.id,
                      effectName: 'gain',
                      valueType: 'gain',
                      value
                    });
                  }} />
                </AudioChnl>
              );
            })
          }
        </div>
      </div>
    );
  }

}
