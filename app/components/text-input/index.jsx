import Inferno from 'inferno';

import './style.css';

const TextInput = props => {
  return (
    <div className="text-input">
      <input type="text" { ...props } />
    </div>
  );
};

export default TextInput;
