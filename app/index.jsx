import Inferno from 'inferno';
import { Provider } from 'inferno-mobx';

import App from './components/app';

import uiStore from './stores/uiStore';
import dataStore from './stores/dataStore';

Inferno.render(
  <Provider uiStore={ uiStore } dataStore={ dataStore }>
    <App />
  </Provider>,
  document.querySelector('#app'));
