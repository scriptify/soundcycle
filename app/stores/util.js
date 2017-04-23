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

export function startAnimationLoop(dataStore) {
  const draw = () => {
    const masterAnalyser = dataStore.getAnalyser(dataStore.master.id);
    const arr = new Uint8Array(masterAnalyser.frequencyBinCount);
    masterAnalyser.getByteFrequencyData(arr);
    dataStore.master.frequencyData = arr;
    dataStore.lanes.forEach((lane) => {
      lane.chnls.forEach((chnl) => {
        const analyser = dataStore.getAnalyser(chnl.id);
        const arr = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(arr);
        chnl.frequencyData = arr;
      });
    });
    window.requestAnimationFrame(draw);
  };
  window.requestAnimationFrame(draw);
}
