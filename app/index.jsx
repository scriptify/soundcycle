import React from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { Provider } from 'mobx-react';

import App from './components/app';

import uiStore from './stores/uiStore';
import dataStore from './stores/dataStore';

ReactDOM.render(
  <Provider uiStore={ uiStore } dataStore={ dataStore }>
    <App />
  </Provider>,
  document.querySelector('#app'));
