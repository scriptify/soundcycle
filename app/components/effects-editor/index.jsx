import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './style.css';

import Effect from '../effect';

import OffIcon from '../../icons/off.svg';
import ActivateIcon from '../../icons/activate.svg';

@inject('uiStore', 'dataStore')
@observer
export default class EffectsEditor extends Component {

  render() {

    const { uiStore, dataStore } = this.props;

    if(!uiStore.effectsEditor.currentChnl)
      return (
        <p>
          No channel was selected!
        </p>
      );

    return (

      <div className="effects-editor">
        <h1>Effects editor</h1>
        <div className="effects">

        {
          dataStore.EFFECT_DATA.map(effect => {
            // Look if effect even enabled
            const chnl = dataStore.getChnlById( uiStore.effectsEditor.currentChnl );
            const { enabled, name } = chnl.effects.filter(eff => eff.name === effect.name)[0];

            if(enabled) {
              // Effect is enabled
              return (
                <div key={ effect.name } className="effect-value-group">
                  <div className="effect-bar">
                    <p>{ name }</p>
                    <div className="turn-off" onClick={() => dataStore.toggleEffect({ chnlId: uiStore.effectsEditor.currentChnl, effectName: name })}>
                      <img src={ OffIcon } />
                    </div>
                  </div>
                  {
                    effect.values.map(({ name: valueName, options: { min, max, defaultValue, step } }) => {
                      return <Effect key={ valueName } fullWidth name={ valueName } min={ min } max={ max } step={ step } defaultValue={ defaultValue } border onChange={ value => {
                        dataStore.setEffectValue({
                          chnlId: uiStore.effectsEditor.currentChnl,
                          effectName: name,
                          valueType: valueName,
                          value
                        })
                      }}/>;
                    })
                  }
                </div>
              );
            } else {
              // Effect is disabled
              return (
                <div className="activate-effect" key={ effect.name } >
                  <p className="effect-name">{ name }</p>
                  <div className="activate"
                    onClick={() => {
                      dataStore.toggleEffect({ chnlId: uiStore.effectsEditor.currentChnl, effectName: name });
                    }}
                  >
                    <img src={ ActivateIcon } />
                  </div>
                </div>
              );
            }
          })
        }

        </div>
      </div>
    );
  }

}
