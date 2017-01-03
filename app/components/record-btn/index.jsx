import Inferno from 'inferno';

import './style.css';

const RecordBtn = ({ recording, ...otherProps }) => {
  return (
    <div className={ recording ? 'record-btn recording' : 'record-btn' } { ...otherProps }>

    </div>
  );
};

export default RecordBtn;
