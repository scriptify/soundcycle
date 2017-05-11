import EffectUnit from 'sountility/webaudio-effect-unit';

const DEFAULT_FREQUENCY = 20000;

export const lowpassData = {
  name: `lowpass`,
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
        effectChain.lowpass.frequency.value = value;
      }
    }

  ]
};

export default function createLowpass(audioCtx) {
  return new EffectUnit({
    ...lowpassData,
    effectChain: {
      lowpass: () => {
        const lp = audioCtx.createBiquadFilter();
        lp.type = `lowpass`;
        lp.frequency.value = DEFAULT_FREQUENCY;
        return lp;
      }
    }
  }, audioCtx);
}
