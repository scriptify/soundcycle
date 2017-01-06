import Inferno from 'inferno';

import './style.css';

import EditEffects from '../edit-effects';
import Slider from '../slider';

import DeleteIcon from '../../icons/delete.svg';
import PlayIcon from '../../icons/play.svg';
import PauseIcon from '../../icons/pause.svg';

const AudioChnl = ({ paused }) => {
  return (
    <div className="audio-chnl">
      <EditEffects small={ true } />
      <div className="delete">
        <img src={ DeleteIcon } />
      </div>
      <div className="status">
        {
          paused ? <img src={ PlayIcon } /> : <img src={ PauseIcon } />
        }
      </div>
      <Slider />
    </div>
  );
};

export default AudioChnl;
