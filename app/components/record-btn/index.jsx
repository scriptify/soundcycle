import React from 'react';

import './style.css';

const RecordBtn = ({ recording, ...otherProps }) => {
  return (
    <div className={ recording ? 'record-btn recording' : 'record-btn' } { ...otherProps }>

    </div>
  );
};

export default RecordBtn;
