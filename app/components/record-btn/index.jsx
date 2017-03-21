import React from 'react';

import './style.css';

const RecordBtn = ({ isRecording, onClick = () => {} }) => {

  let className = 'record-btn';

  if(isRecording)
    className = className + ' recording';
  return (
    <div className={ className } onClick={ onClick }>

    </div>
  );

};

export default RecordBtn;
