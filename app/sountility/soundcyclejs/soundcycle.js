import Recordy from 'sountility/recordy';
import AudioLooper from 'sountility/audiolooper';
import Wmstr from 'sountility/wmstr';
import AudioBufferChnl from 'sountility/audiobufferchnl';
import AudioChnl from 'sountility/audiochnl';

import { v4 } from 'uuid';

export default class SoundCycle {

  recorder;
  wmstr;
  audioCtx;

  static MODES = {
    ADD_TO_LANE: `ADD_TO_LANE`,
    NEW_LANE: `NEW_LANE`,
    SINGLE_SEQUENCE: `SINGLE_SEQUENCE`,
    FREE_LOOPING: `FREE_LOOPING`
  };

  tracks = new Map();
  loopers = new Map();
  currentLane = ``;
  currentMode;
  projectName;

  static masterChnlId = `MASTER_ID`;
  static recorderChnlId = `RECORDER_ID`;

  constructor(readyCb = () => {}) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.audioCtx = audioCtx;
    this.recorder = new Recordy(audioCtx);
    this.recorder.getInput()
      .then(readyCb);

    this.wmstr = new Wmstr(audioCtx);
    this.currentMode = SoundCycle.MODES.NEW_LANE;

    this.tracks.set(SoundCycle.masterChnlId, this.wmstr);
    this.tracks.set(SoundCycle.recorderChnlId, this.recorder);

    this.wmstr.connect(this.audioCtx.destination);
  }

  setProjectName(name) {
    this.projectName = name;
  }

  getProjectName() {
    if (!this.projectName) {
      const date = new Date();
      return `project-${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.wav`;
    }

    return `${this.projectName}.wav`;
  }

  getModes() {
    return SoundCycle.MODES;
  }

  getCurrentMode() {
    return this.currentMode;
  }

  setMode(mode) {
    this.currentMode = mode;
  }

  setCurrentLane(laneId) {
    this.currentLane = laneId;
  }

  startRecording() {
    this.recorder.startRecording();
  }

  async stopRecording() {
    const newTrackId = v4();

    switch (this.currentMode) {

      case SoundCycle.MODES.NEW_LANE: {
        // Add new looper
        const looper = new AudioLooper(this.audioCtx);
        const audioBuffer = await this.recorder.stopRecording({ type: `buffer` });
        const newLooperId = v4();

        looper.addTrack({
          id: newTrackId,
          audioBuffer,
          trackAdded: (bufferSourceNode) => {
            this.trackAddedToLaneCb(bufferSourceNode, newTrackId, newLooperId);

            if (!this.loopers.has(newLooperId))
              this.loopers.set(newLooperId, looper);
          } });

        return {
          chnlId: newTrackId,
          laneId: newLooperId
        };
      }

      case SoundCycle.MODES.SINGLE_SEQUENCE: {
        const audioBuffer = await this.recorder.stopRecording({ type: `buffer` });

        const bufferNode = this.audioCtx.createBufferSource();
        bufferNode.buffer = audioBuffer;

        // Create fade
        for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
          const channelData = audioBuffer.getChannelData(channel);
          const FADE_LENGTH = 100;
          for (let i = 0; i < FADE_LENGTH && i < channelData.length; i++) {
            const fadeOutPos = channelData.length - i - 1;
            channelData[i] = (channelData[i] * i) / FADE_LENGTH;
            channelData[fadeOutPos] = (channelData[fadeOutPos] * i) / FADE_LENGTH;
          }
        }

        const audioBufferChnl = new AudioBufferChnl(this.audioCtx, bufferNode);
        audioBufferChnl.connect(this.wmstr);

        this.tracks.set(newTrackId, {
          chnl: audioBufferChnl,
        });

        return {
          chnlId: newTrackId
        };
      }

      case SoundCycle.MODES.ADD_TO_LANE: {
        if (!this.loopers.has(this.currentLane))
          throw new Error(`You tried to access an inexistent lane!`);

        const looper = this.loopers.get(this.currentLane);

        const audioBuffer = await this.recorder.stopRecording({ type: `buffer` });

        looper.addTrack({
          id: newTrackId,
          audioBuffer,
          trackAdded: (bufferSourceNode) => {
            this.trackAddedToLaneCb(bufferSourceNode, newTrackId, this.currentLane);
          } });

        return {
          chnlId: newTrackId
        };
      }

      case SoundCycle.MODES.FREE_LOOPING: {
        const audioBuffer = await this.recorder.stopRecording({ type: `buffer` });

        const bufferNode = this.audioCtx.createBufferSource();
        bufferNode.buffer = audioBuffer;
        bufferNode.loop = true;

        // Create fade
        for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
          const channelData = audioBuffer.getChannelData(channel);
          const FADE_LENGTH = 100;
          for (let i = 0; i < FADE_LENGTH && i < channelData.length; i++) {
            const fadeOutPos = channelData.length - i - 1;
            channelData[i] = (channelData[i] * i) / FADE_LENGTH;
            channelData[fadeOutPos] = (channelData[fadeOutPos] * i) / FADE_LENGTH;
          }
        }

        const audioBufferChnl = new AudioBufferChnl(this.audioCtx, bufferNode);
        audioBufferChnl.connect(this.wmstr);

        bufferNode.start(0);

        this.tracks.set(newTrackId, {
          chnl: audioBufferChnl,
        });

        return {
          chnlId: newTrackId
        };
      }

      default:
        throw new Error(`Invalid method!`);

    }
  }

  stopTrack({ id }) {
    if (!this.tracks.has(id))
      throw new Error(`You tried to stop an inexistent track!`);

    const track = this.tracks.get(id);

    if (!track.looperId)
      track.chnl.stop();
    else {
      const looper = this.loopers.get(track.looperId);
      looper.pauseTrack({ id });
    }
  }

  playTrack({ id }) {
    if (!this.tracks.has(id))
      throw new Error(`You tried to play an inexistent track!`);

    const track = this.tracks.get(id);
    if (!track.looperId)
      track.chnl.play();
    else {
      const looper = this.loopers.get(track.looperId);
      looper.playTrack({ id });
    }
  }

  removeTrack({ id }) {
    if (!this.tracks.has(id))
      throw new Error(`You tried to remove an inexistent track!`);

    const track = this.tracks.get(id);
    if (track.looperId) {
      const looper = this.loopers.get(track.looperId);
      looper.removeTrack({ id });
    }
    if (track.chnl.bufferSourceNode)
      track.chnl.stop();

    this.tracks.delete(id);
  }

  removeLane({ looperId }) {
    if (!this.loopers.has(looperId))
      throw new Error(`You tried to remove an inexistent lane!`);

    const looper = this.loopers.get(looperId);

    // Search all tracks of looper and delete them
    this.tracks.forEach(({ looperId: trackLooperId }, trackId) => {
      if (trackLooperId === looperId) {
        looper.removeTrack({ id: trackId });
        this.tracks.delete(trackId);
      }
    });

    this.loopers.delete(looperId);
  }

  enableEffect({ chnlId, effectName }) {
    const chnlToEdit = this.getChnlById(chnlId);
    chnlToEdit.addEffect(effectName);
    SoundCycle.getEffectByName(chnlToEdit, effectName).enable();
  }

  disableEffect({ chnlId, effectName }) {
    const chnlToEdit = this.getChnlById(chnlId);
    chnlToEdit.removeEffect(effectName);
    SoundCycle.getEffectByName(chnlToEdit, effectName).disable();
  }

  setEffectValue({ chnlId, effectName, valueType, value }) {
    const chnlToEdit = this.getChnlById(chnlId);

    SoundCycle.getEffectByName(chnlToEdit, effectName).setValue(valueType, value);
  }

  getMasterChnlId() {
    return SoundCycle.masterChnlId;
  }

  getRecorderChnlId() {
    return SoundCycle.recorderChnlId;
  }

  startProjectRecording() {
    this.wmstr.startRecording();
  }

  stopProjectRecording() {
    this.wmstr.stopRecording(this.getProjectName());
  }

  getAnalyser({ chnlId }) {
    return this.getChnlById(chnlId).getAnalyser();
  }

  /* INTERIOR FUNCTIONALITIES */

  getChnlById(id) {
    if (id === SoundCycle.masterChnlId)
      return this.wmstr;
    else if (id === SoundCycle.recorderChnlId)
      return this.recorder;

    if (!this.tracks.has(id))
      throw new Error(`You tried to access an inexistent track!`);
    return this.tracks.get(id).chnl;
  }

  static getEffectByName(chnl, effectName) {
    if (chnl.effects[effectName])
      return chnl.effects[effectName];

    throw new Error(`You tried to access an inexistent effect!`);
  }

  trackAddedToLaneCb(bufferSourceNode, newTrackId, looperId) {
    if (this.tracks.has(newTrackId)) {
      const { chnl } = this.tracks.get(newTrackId);
      chnl.setBufferSourceNode(bufferSourceNode);
    } else {
      const audioBufferChnl = new AudioBufferChnl(this.audioCtx, bufferSourceNode);
      audioBufferChnl.connect(this.wmstr);

      this.tracks.set(newTrackId, {
        chnl: audioBufferChnl,
        looperId
      });
    }
  }

}
