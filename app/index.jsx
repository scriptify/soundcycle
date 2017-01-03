import Inferno from 'inferno';
import { Provider } from 'inferno-mobx'

import App from './components/app';
import uiStore from './stores/uiStore';

Inferno.render(
  <Provider uiStore={ uiStore }>
    <App />
  </Provider>,
  document.querySelector('#app'));
