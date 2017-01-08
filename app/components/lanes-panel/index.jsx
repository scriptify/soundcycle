import Inferno from 'inferno';
import Component from 'inferno-component'
import { connect } from 'inferno-mobx';

import './style.css';

import Slider from '../slider';
import AudioChnl from '../audio-chnl';

import DeleteIcon from '../../icons/delete.svg';

@connect(['dataStore', 'uiStore'])
export default class LanesPanel extends Component {

  constructor(props) {
    super(props);
  }

  render({ dataStore, uiStore }) {

    const { min, max, defaultValue, step } = dataStore.getEffectValueData('gain', 'gain');

    return (
      <div className="lanes-panel">
        <h1 className="title">Lanes</h1>

        {
          dataStore.lanes.map(({ name, chnls, id }) => {
            return (
              <div className="lane">
                <div className="lane-bar">
                  <p className="name">{ name }</p>
                  <div className="delete" onClick={() => dataStore.removeLane(id)}>
                    <img src={ DeleteIcon } />
                  </div>
                </div>
                {
                  chnls.map((chnl, i) => {
                    return (
                      <AudioChnl
                        paused={ !chnl.isPlaying }
                        onDelete={ () => {
                          if(i === 0) {
                            dataStore.removeLane(id);
                          } else {
                            dataStore.removeTrack(chnl.id)
                          }
                        }}
                        onToggleStatus={ () => dataStore.togglePlayStatus(chnl.id) }
                        onEditEffects={ () => uiStore.gotoEffectEditor(chnl.id) }
                        hideToggleBtn={ i === 0 }
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
            );
          })
        }

      </div>
    );
  }

}
