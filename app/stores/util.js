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
