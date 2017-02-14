import React from 'react';

import './style.css';

import EditEffects from '../edit-effects';
import Slider from '../slider';

import DeleteIcon from '../../icons/delete.svg';
import PlayIcon from '../../icons/play.svg';
import PauseIcon from '../../icons/pause.svg';

const AudioChnl = ({ paused, onDelete, onToggleStatus, onEditEffects, children, hideToggleBtn }) => {
  return (
    <div className="audio-chnl">
      <EditEffects small={ true } onClick={ onEditEffects } />
      <div className="delete" onClick={ onDelete }>
        <img src={ DeleteIcon } />
      </div>
      <div className="status" onClick={ onToggleStatus }>
        {
          !hideToggleBtn && (paused ? <img src={ PlayIcon } /> : <img src={ PauseIcon } />)
        }
      </div>
      {
        children
      }
    </div>
  );
};

export default AudioChnl;
