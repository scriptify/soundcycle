import Inferno from 'inferno';

import Slider from '../slider';

import './style.css';

import OffIcon from '../../icons/off.svg';
import ActivateIcon from '../../icons/activate.svg';


const Effect = ({ name, border, on, canDisable, onTurnOn = () => {}, onTurnOff = () => {} }) => {

  if(canDisable && !on) {
    return (
      <div className="effect">
        <div className="turn-on" onClick={ onTurnOn }>
          <img src={ ActivateIcon } />
          { name }
        </div>
      </div>
    );
  }

  return (
    <div className={ border ? 'effect border' : 'effect' }>
      <Slider />
      <p>{ name }</p>
      {
        canDisable &&
          <div className="turn-off-btn" onClick={ onTurnOff }>
            <img src={ OffIcon } />
          </div>
      }

    </div>
  );
};

export default Effect;
