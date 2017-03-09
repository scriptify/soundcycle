import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './style.css';

import MainPane from '../main-pane';
import MasterPane from '../master-pane';
import RecorderPane from '../recorder-pane';

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
      <div className={'app-content'}>
        <MasterPane />
        <MainPane />
        <RecorderPane />
      </div>
    );
  }

}
