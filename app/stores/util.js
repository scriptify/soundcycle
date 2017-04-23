export const createStoreableEffects = EFFECT_DATA => {
  return EFFECT_DATA.map(effect => {
    return {
      name: effect.name,
      enabled: effect.name === 'gain',
      values: effect.values.map(value => {
        return {
          name: value.name,
          value: value.options.defaultValue
        };
      })
    };
  });
};

function updateFrequencyData(chnl, dataStore) {
  const analyser = dataStore.getAnalyser(chnl.id);
  const arr = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(arr);
  chnl.frequencyData = arr;
}

export function startAnimationLoop(dataStore) {
  const draw = () => {
    updateFrequencyData(dataStore.master, dataStore);

    /*dataStore.lanes.forEach((lane) => {
      lane.chnls.forEach((chnl) => {
        updateFrequencyData(chnl, dataStore);
      });
    });

    dataStore.freeChnls.forEach((chnl) => {
      updateFrequencyData(chnl, dataStore);
    });*/
    window.requestAnimationFrame(draw);
  };
  window.requestAnimationFrame(draw);
}
