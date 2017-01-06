import Inferno from 'inferno';

import Slider from '../slider';

import './style.css';

import OffIcon from '../../icons/off.svg';
import ActivateIcon from '../../icons/activate.svg';


const Effect = ({ name, border, on, canDisable, onTurnOn = () => {}, onTurnOff = () => {}, fullWidth, ...otherProps }) => {

  let style = {};

  if(fullWidth) {
    style = {
      width: '100%'
    };
  }

  if(canDisable && !on) {
    return (
      <div className="effect" style={ style }>
        <div className="turn-on" onClick={ onTurnOn }>
          <img src={ ActivateIcon } /><br />
          { name }
        </div>
      </div>
    );
  }

  return (
    <div className={ border ? 'effect border' : 'effect' } style={ style }>
      <Slider { ...otherProps }/>
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
