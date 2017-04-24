import React from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { Provider } from 'mobx-react';

import App from './components/app';

import uiStore from './stores/uiStore';
import dataStore from './stores/dataStore';
import { DATA_STORE, UI_STORE } from './stores/constants';
import './controls';

const stores = {
  [DATA_STORE]: dataStore,
  [UI_STORE]: uiStore
};

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.querySelector('#app'));
