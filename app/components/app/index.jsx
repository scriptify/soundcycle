import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './style.css';

import { UI_STORE, DATA_STORE } from 'stores/constants';

import MainPane from 'components/main-pane';
import MasterPane from 'components/master-pane';
import RecorderPane from 'components/recorder-pane';

@inject(UI_STORE, DATA_STORE)
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
