import Inferno from 'inferno';

import Slider from '../slider';

import './style.css';

import OffIcon from '../../icons/off.svg';
import ActivateIcon from '../../icons/activate.svg';


const Effect = ({ name, border, fullWidth, ...otherProps }) => {

  let style = {};

  if(fullWidth) {
    style = {
      width: '100%',
      maxWidth: '600px'
    };
  }

  return (
    <div className={ border ? 'effect border' : 'effect' } style={ style }>
      <Slider { ...otherProps }/>
      <p>{ name }</p>
    </div>
  );
};

export default Effect;
