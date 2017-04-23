import React from 'react';
import { observer, inject } from 'mobx-react';

import './style.css';

import { UI_STORE, DATA_STORE } from 'stores/constants';

import Masonry from 'react-masonry-component';
import Track from 'components/track';
import Title from 'components/title';

import deleteIcon from 'icons/delete.svg';

const Lane = ({
  id,
  dataStore,
  uiStore
}) => {

  const lane = dataStore.lanes.find(lane => lane.id === id);
  const gainData = dataStore.getEffectValueData('gain', 'gain');

  return (
    <div className={'lane-container'}>
      <Title
        name={ lane.name }
        icon={ deleteIcon }
        onAction={ () => {
          dataStore.removeLane(id);
        }}
      />

      <div className={'lane-tracks'}>
        <Masonry options={{ gutter: 20, fitWidth: true }} className={'lane-masonry'}>
          {
            lane.chnls.map((chnl, i) => {

              const chnlGain = dataStore.getEffectValueObject(chnl.effects, 'gain', 'gain');

              return (
                <Track
                  key={ chnl.id }
                  hideDelete={ i === 0 }
                  name={ chnl.name }
                  isPlaying={ chnl.isPlaying }
                  editMode={ chnl.isEdited }
                  frequencyData={ chnl.frequencyData }
                  onToggleEditMode={ () => {
                    dataStore.toggleChnlEditMode({ chnlId: chnl.id });
                  }}
                  onNameChange={ val => {
                    dataStore.changeChnlName({ chnlId: chnl.id, name: val });
                  }}
                  onEffects={ () => {
                    uiStore.showEffectsEditor(chnl.id);
                  }}
                  onDelete={ () => {
                    dataStore.removeTrack(chnl.id);
                  }}
                  onTogglePlayStatus={ () => {
                    dataStore.togglePlayStatus(chnl.id);
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
                    });
                  }}
                />
              );
            })
          }
        </Masonry>
      </div>
    </div>
  );
};

export default inject(UI_STORE, DATA_STORE)(observer(Lane));
