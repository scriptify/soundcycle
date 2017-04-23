import React from 'react';

import './style.css';

import AdjustableSlider from 'components/adjustable-slider';
import Input from 'components/input';

import deleteIcon from 'icons/delete.svg';
import effectsIcon from 'icons/effects.png';
import playIcon from 'icons/play.svg';
import pauseIcon from 'icons/pause.svg';
import okIcon from 'icons/ok.svg';

const Track = ({
  hideDelete = false,
  editMode = false,
  name = 'Track',
  isPlaying,
  onToggleEditMode = () => {},
  onNameChange = () => {},
  onEffects = () => {},
  onDelete = () => {},
  onTogglePlayStatus = () => {},
  frequencyData = [],
  ...rest
}) => {

  const loudness = Math.abs(frequencyData.reduce((f1, f2) => f1 + f2, 0) / frequencyData.length);

  let nameComponent = name;

  if(editMode)
    nameComponent = <Input
                      type={'text'}
                      value={ name }
                      onChange={ e => onNameChange(e.target.value) }
                    />;

  return (
    <div className={'track'}>

      <div className={'title-bar'}>

        <div className={'name'} onClick={ () => {
          if(!editMode)
            onToggleEditMode();
        }}>
          { nameComponent }
        </div>

        {
          !editMode &&
            <div className={'bar-icon'} onClick={ onEffects }>
              <img src={ effectsIcon } />
            </div>
        }

        {
          !editMode && !hideDelete &&
            <div className={'bar-icon'} onClick={ onDelete }>
              <img src={ deleteIcon } />
            </div>
        }

        {
          editMode &&
            <div className={'bar-icon'} onClick={ onToggleEditMode }>
              <img src={ okIcon } />
            </div>
        }

      </div>

      <div className={`body`}>
        <div className={`loudness`} style={{ height: `${loudness % 70}px` }}/>
        <div className={'icon'} onClick={ onTogglePlayStatus }>
          <img src={ isPlaying ? pauseIcon : playIcon } />
        </div>
      </div>

      <div className={'slider-container'}>
        <div className={'center'}>
          <AdjustableSlider {...rest} />
        </div>
      </div>
    </div>
  );
};

export default Track;
