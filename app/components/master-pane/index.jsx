import React from 'react';

import './style.css';

import Pane from '../pane';
import Effect from '../effect';
import RecordBtn from '../record-btn';
import Input from '../input';
import NavigateBtn from '../navigate-btn';

import effectsImg from '../../icons/effects.png';
import settingsImg from '../../icons/settings.svg';

const MasterPane = props => {
  return (
    <div className={'master-pane'}>

      <Pane>

        <div className={'effect-container'}>
          <Effect name={'Gain'}/>
        </div>

        <div className={'record-btn-container'}>
          <RecordBtn isRecording={ false }/>
          <div className={'txt-input'}>
            <Input type={'text'} />
          </div>
        </div>

        <NavigateBtn image={ settingsImg }/>

        <NavigateBtn image={ effectsImg }/>

      </Pane>

    </div>
  );
};

export default MasterPane;
