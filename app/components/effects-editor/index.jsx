import React from 'react';

import './style.css';

import Title from '../title';
import Effect from '../effect';

import okIcon from '../../icons/ok.svg';
import disableIcon from '../../icons/disable.svg';

const EffectsEditor = ({ hidden }) => {

  let className = 'effects-editor';

  if(hidden)
    className += ' hidden';

  return (
    <div className={ className }>

      <Title name={'Effects Editor'} icon={ disableIcon }/>

      <div className={'effects-activator'}>

        <div className={'effect-toggle'}>
          <div className={'name'}>
            Lowpass
          </div>
          <div className={'toggle'}>
            <img src={ okIcon } />
          </div>
        </div>

        <div className={'effect-toggle'}>
          <div className={'name'}>
            Highpass
          </div>
          <div className={'toggle disable'}>
            <img src={ disableIcon } />
          </div>
        </div>

      </div>

      <div className={'effects-container'}>
        <div className={'effect-container'}>
          <Effect name={'Lowpass'}/>
        </div>
        <div className={'effect-container'}>
          <Effect name={'Lowpass'}/>
        </div>
        <div className={'effect-container'}>
          <Effect name={'Lowpass'}/>
        </div>
        <div className={'effect-container'}>
          <Effect name={'Lowpass'}/>
        </div>
      </div>

    </div>
  );

};

export default EffectsEditor;
