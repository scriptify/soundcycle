import Inferno from 'inferno';

import './style.css';

const Slider = ({ vertical, ...otherProps }) => {
  return (
    <div>
      <input type="range" className={ vertical ? 'range-slider vertical' : 'range-slider' } { ...otherProps }/>
    </div>
  );
};

export default Slider;
