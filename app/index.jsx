import Inferno from 'inferno';

import App from './components/app';
import Slider from './components/slider';
import uiStore from './stores/uiStore';

Inferno.render(
  <App />,
  document.querySelector('#app'));
