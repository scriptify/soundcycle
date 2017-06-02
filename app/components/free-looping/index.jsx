import React from 'react';
import { observer, inject } from 'mobx-react';
import Masonry from 'react-masonry-component';

import './style.css';

import { UI_STORE, DATA_STORE } from 'stores/constants';

import Track from 'components/track';

const FreeLooping = ({ dataStore, uiStore }) => {

  const gainData = dataStore.getEffectValueData('gain', 'gain');

  return (
    <div className={`free-looping-container`}>
      <Masonry options={{ gutter: 20, fitWidth: true }} className={'free-looping-masonry'}>
        {
          dataStore.freeChnls.map((chnl) => {
            const chnlGain = dataStore.getEffectValueObject(chnl.effects, 'gain', 'gain');

            return (
              <Track
                key={ chnl.id }
                name={ chnl.name }
                isPlaying={ chnl.isPlaying }
                editMode={ chnl.isEdited }
                frequencyData={ chnl.frequencyData }
                onToggleEditMode={ () => {
                  dataStore.toggleChnlEditMode({ chnlId: chnl.id }, true);
                }}
                onNameChange={ val => {
                  dataStore.changeChnlName({ chnlId: chnl.id, name: val }, true);
                }}
                onEffects={ () => {
                  uiStore.showEffectsEditor(chnl.id, true);
                }}
                onDelete={ () => {
                  dataStore.removeTrack(chnl.id, true);
                }}
                onTogglePlayStatus={ () => {
                  dataStore.togglePlayStatus(chnl.id, true);
                }}
                value={ chnlGain.value }
                min={ gainData.min }
                max={ gainData.max }
                step={ gainData.step }
                onChange={ val => {
                  dataStore.setEffectValue({
                    chnlId: chnl.id,
                    effectName: 'gain',
                    valueType: 'gain',
                    value: val
                  }, true);
                }}
              />
            );
          })
        }
      </Masonry>
    </div>
  );
};

export default inject(UI_STORE, DATA_STORE)(observer(FreeLooping));
