import EffectUnit from 'sountility/webaudio-effect-unit';

const DEFAULT_FREQUENCY = 0;

export const highpassData = {
  name: `highpass`,
  values: [

    {
      name: `frequency`,
      options: {
        type: `range`,
        defaultValue: DEFAULT_FREQUENCY,
        min: 0,
        max: 20000,
        step: 20
      },
      set: (effectChain, value) => {
        effectChain.highpass.frequency.value = value;
      }
    }

  ]
};

export default function createLowpass(audioCtx) {
  return new EffectUnit({
    ...highpassData,
    effectChain: {
      highpass: () => {
        const hp = audioCtx.createBiquadFilter();
        hp.type = `highpass`;
        hp.frequency.value = DEFAULT_FREQUENCY;
        return hp;
      }
    }
  }, audioCtx);
}
