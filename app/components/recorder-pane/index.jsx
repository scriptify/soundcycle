import React from 'react';

import './style.css';

import Pane from 'components/pane';
import Effect from 'components/effect';
import RecordBtn from 'components/record-btn';
import NavigateBtn from 'components/navigate-btn';
import AwesomeSelect from 'components/awesome-select';

import effectsImg from 'icons/effects.png';

const RecorderPane = props => {
  return (
    <div className={'recorder-pane'}>
      <Pane>

        <div className={'effect-container'}>
          <Effect name={'Gain'}/>
        </div>

        <RecordBtn isRecording={ false }/>
        <AwesomeSelect options={[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
        ]}/>
        <NavigateBtn image={ effectsImg }/>

      </Pane>
    </div>
  );
};

export default RecorderPane;
