import React from 'react';

import './style.css';

const RecordBtn = ({ isRecording }) => {

  let className = 'record-btn';

  if(isRecording)
    className = className + ' recording';
  return (
    <div className={ className }>

    </div>
  );

};

export default RecordBtn;
