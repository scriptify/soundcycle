import React from 'react';

import './style.css';
import settingsIcon from '../../icons/settings.svg';

const EditEffects = ({ small, ...otherProps }) => {

  return (
    <div className={ small ? "edit-effects small" : "edit-effects" } { ...otherProps }>
      <img src={ settingsIcon } />
    </div>
  );
};

export default EditEffects;
