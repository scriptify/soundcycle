import dataStore from 'stores/dataStore';
import uiStore from 'stores/uiStore';

window.addEventListener(`keypress`, (e) => {
  switch (e.keyCode) {
    case 32: // space
      dataStore.toggleRecording();
    break;
  }
});
