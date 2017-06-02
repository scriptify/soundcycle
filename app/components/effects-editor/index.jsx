import React from 'react';
import { observer, inject } from 'mobx-react';

import './style.css';

import { UI_STORE, DATA_STORE } from 'stores/constants';

import Title from 'components/title';
import Effect from 'components/effect';

import okIcon from 'icons/ok.svg';
import disableIcon from 'icons/disable.svg';

const EffectsEditor = ({
  hidden,
  uiStore,
  dataStore
}) => {

  let className = 'effects-editor';

  if(hidden)
    className += ' hidden';

  const chnl = dataStore.getChnlById(uiStore.effectsEditor.currentChnl);

  return (
    <div className={ className }>

      <Title
        name={`Effects Editor (${ chnl.name || '' })`}
        icon={ disableIcon }
        onAction={ () => {
          uiStore.hideEffectsEditor(null, true);
        }}
      />

      <div className={'effects-activator'}>

        {
          chnl.effects.map(({ name, enabled }) => {

            if(name === 'gain')
              return;

            let className = 'toggle';
            if(enabled)
              className += ' disable';

            return (
              <div
                className={'effect-toggle'}
                key={ name }
                onClick={ () => {
                  dataStore.toggleEffect({
                    chnlId: uiStore.effectsEditor.currentChnl,
                    effectName: name
                  }, true);
                }}
              >
                <div className={'name'}>
                  { name }
                </div>
                <div className={ className }>
                  <img src={ enabled ? disableIcon : okIcon } />
                </div>
              </div>
            );
          })
        }

      </div>

      {
        chnl.effects.map(effect => {

          if(!effect.enabled)
            return;

          return (
            <div key={ uiStore.effectsEditor.currentChnl + effect.name }>
              <Title
                name={ effect.name }
                icon={ (effect.name === 'gain') ? null : disableIcon }
                small={ true }
                onAction={ () => {
                  dataStore.toggleEffect({
                    chnlId: uiStore.effectsEditor.currentChnl,
                    effectName: effect.name
                  }, true);
                }}
              />
              <div className={'effects-container'}>
                {
                  effect.values.map(value => {

                    const valueData = dataStore.getEffectValueData(effect.name, value.name);

                    if(valueData.type !== 'range')
                      return;

                    return (
                      <div className={'effect-container'} key={ effect.name + value.name }>
                          <Effect
                            name={ value.name }
                            value={ value.value }
                            min={ valueData.min }
                            max={ valueData.max }
                            step={ valueData.step }
                            onChange={ val => {
                              dataStore.setEffectValue({
                                chnlId: uiStore.effectsEditor.currentChnl,
                                effectName: effect.name,
                                valueType: value.name,
                                value: val
                              }, true);
                            }}
                            onMore={ () => {
                              dataStore.setEffectValue({
                                chnlId: uiStore.effectsEditor.currentChnl,
                                effectName: effect.name,
                                valueType: value.name,
                                value: value.value + valueData.step
                              }, true);
                            }}
                            onLess={ () => {
                              dataStore.setEffectValue({
                                chnlId: uiStore.effectsEditor.currentChnl,
                                effectName: effect.name,
                                valueType: value.name,
                                value: value.value - valueData.step
                              }, true);
                            }}
                          />
                      </div>
                    );

                  })
                }
              </div>
            </div>
          );

        })
      }

    </div>
  );

};

export default inject(UI_STORE, DATA_STORE)(observer(EffectsEditor));
