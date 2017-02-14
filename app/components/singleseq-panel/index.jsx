import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './style.css';

import AudioChnl from '../audio-chnl';
import Slider from '../slider';

@inject('uiStore', 'dataStore')
@observer
export default class SingleSeqPanel extends Component {

  render() {

    const { uiStore, dataStore } = this.props;

    const { min, max, defaultValue, step } = dataStore.getEffectValueData('gain', 'gain');

    return (
      <div className="singleseq-panel">
        <h1 className="title">Single Sequences</h1>
        <div className="audio-chnls">
          {
            dataStore.singleSeqChnls.map(chnl => {
              return (
                <AudioChnl
                  key={ chnl.id }
                  paused={ !chnl.isPlaying }
                  onDelete={ () => dataStore.removeTrack(chnl.id) }
                  onToggleStatus={ () => dataStore.togglePlayStatus(chnl.id) }
                  onEditEffects={ () => uiStore.gotoEffectEditor(chnl.id) }
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
