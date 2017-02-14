import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './style.css';

import Slider from '../slider';
import Recorder from '../recorder';
import Master from '../master';

import EffectsEditor from '../effects-editor';
import LanesPanel from '../lanes-panel';
import SingleSeqPanel from '../singleseq-panel';

@inject('uiStore', 'dataStore')
@observer
export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { uiStore } = this.props;
    const { position } = uiStore;

    return (
      <div>
        <div className="app-content">
          {
            (position === 1) &&
              <SingleSeqPanel />
          }
          {
            (position === 2) &&
              <LanesPanel />
          }
          {
            (position === 3) &&
              <EffectsEditor />
          }
        </div>

        <div className="top-container">
          <Master />
        </div>

        <div className="bottom-container">
          <Recorder />

          <div className="switch-view">
            <div
              className={ (position === 1) ? 'tab active' : 'tab' }
              onClick={ () => uiStore.setPosition(1) }
            >
              Single Sequences
            </div>

            <div
              className={ (position === 2) ? 'tab active' : 'tab' }
              onClick={ () => uiStore.setPosition(2) }
            >
              Lanes
            </div>

            <div
              className={ (position === 3) ? 'tab active' : 'tab' }
              onClick={ () => uiStore.setPosition(3) }
            >
              Effect Editor
            </div>
          </div>

        </div>
      </div>
    );
  }

}
