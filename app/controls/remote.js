import io from 'socket.io-client';
import dataStore from 'stores/dataStore';
import uiStore from 'stores/uiStore';
import { spy } from 'mobx';

export function isController() {
  return window.location.hash.indexOf(`controller`) !== -1;
}

export default function createRemoteListener() {
  const isController = window.location.hash.indexOf(`controller`) !== -1;
  // Not running in electron/not being the controller ==> basic browser
  if (!isController && !(window && window.process && window.process.type))
    return;
  const socket = io(`http://192.168.0.108:3000`);
  socket.on(`action`, ({ name, param, type }) => {
    switch (type) {
      case `state`: {
        if (typeof dataStore[name] === `function`)
          dataStore[name](param);
        else if (typeof uiStore[name] === `function`)
          uiStore[name](param);
      } break;

      case `dom`: {
        // Nothing here yet
      } break;

      default:
        console.warn(`Attention: Got uknown action over network '${type}'`);
    }

  });

  spy((event) => {
    // When an action is executed, a second parameter must be provided if it should be omitted over the network
    // So every time an action is used in a way it should also be executed on other connected clients, pass true
    if (event.type !== `action` || !event.arguments[1])
      return;

    socket.emit(`action`, {
      type: `state`,
      name: event.fn.name,
      param: event.arguments[0]
    });
  });
};

createRemoteListener();
