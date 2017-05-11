/* import Tuna from 'tunajs';

import createGain, { gainData } from './effects/gain';
import createChorus, { chorusData } from './effects/chorus';
import createDelay, { delayData } from './effects/delay';
import createPhaser, { phaserData } from './effects/phaser';
import createCompressor, { compressorData } from './effects/compressor';
import createLowpass, { lowpassData } from './effects/lowpass';
import createHighpass, { highpassData } from './effects/highpass';
import createTremolo, { tremoloData } from './effects/tremolo';
import createWahWah, { wahWahData } from './effects/wahwah';
import createBitcrusher, { bitcrusherData } from './effects/bitcrusher';
import createMoog, { moogData } from './effects/moog';
import createPingPongDelay, { pingPongDelayData } from './effects/pingPongDelay';*/

import createGain, { gainData } from './effects/gain';
import createLowpass, { lowpassData } from './effects/lowpass';
import createHighpass, { highpassData } from './effects/highpass';

export const EFFECT_DATA = [
  gainData,
  highpassData,
  lowpassData
];

export default function createEffectCollection(audioCtx) {
  return {
    gain: createGain(audioCtx),
    lowpass: createLowpass(audioCtx),
    highpass: createHighpass(audioCtx)
  };
}
