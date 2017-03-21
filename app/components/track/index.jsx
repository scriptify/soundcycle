import React from 'react';

import './style.css';

import AdjustableSlider from 'components/adjustable-slider';
import Input from 'components/input';

import deleteIcon from 'icons/delete.svg';
import effectsIcon from 'icons/effects.png';
import playIcon from 'icons/play.svg';
import okIcon from 'icons/ok.svg';

const Track = ({ hideDelete = false, editMode = false, name = 'Track', ...restProps }) => {
  let nameComponent = name;

  if(editMode)
    nameComponent = <Input type={'text'} />;

  return (
    <div className={'track'}>

      <div className={'title-bar'}>

        <div className={'name'}>
          { nameComponent }
        </div>

        {
          !editMode &&
            <div className={'bar-icon'}>
              <img src={ effectsIcon } />
            </div>
        }

        {
          !editMode && !hideDelete &&
            <div className={'bar-icon'}>
              <img src={ deleteIcon } />
            </div>
        }

        {
          editMode &&
            <div className={'bar-icon'}>
              <img src={ okIcon } />
            </div>
        }

      </div>

      <div className={'icon'}>
        <img src={ playIcon } />
      </div>
      <div className={'slider-container'}>
        <div className={'center'}>
          <AdjustableSlider />
        </div>
      </div>
    </div>
  );
};

export default Track;
