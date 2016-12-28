import SoundCycle from 'soundcyclejs';

export default class LoopstationAPI {

  MODES;
  soundcycle;

  tracks = [];
  loopers = [];
  currentLane = '';
  currentMode;

  masterChnlId = 'MASTER_ID';
  recorderChnlId = 'RECORDER_ID';

  constructor(readyCb = () => {}) {
    const audioCtx = new (window.webkitAudioContext || window.AudioContext)();
    this.soundcycle = new SoundCycle(audioCtx, readyCb);
    this.MODES = this.soundcycle.MODES;
    this.currentMode = this.MODES.NEW_LANE;
  }

  getModes() {
    return this.soundcycle.modes;
  }

  setMode(mode) {
    this.currentMode = mode;
  }

  setCurrentLane(laneId) {
    this.currentLane = laneId;
  }

  startRecording() {
    this.soundcycle.recorder.startRecording();
  }

  async stopRecording() {

    let params = {};

    switch(this.currentMode) {

      case this.MODES.NEW_LANE:
        const { chnlId, laneId, looper, audioChnl } = await this.soundcycle.recorder.stopRecording( this.currentMode, {
          onPlay: id => this.onTrackPlay(id),
          onStop: id => this.onTrackStop(id)
        });
        // Got looper and newly added chnl
        // add them to local arrays
        this.addTrack(audioChnl, chnlId);
        this.addLooper(looper, laneId);

        return {
          chnlId,
          laneId
        };


      case this.MODES.SINGLE_SEQUENCE:
        const { audioChnl, id } = await this.soundcycle.recorder.stopRecording(this.currentMode);
        this.addTrack(audioChnl, id);

        return {
          chnlId: id
        };


      case this.MODE.ADD_TO_LANE:
        const looper = this.loopers.filter(l => l.id === this.currentLane)[0];

        if(!looper)
          throw new Error('No lane was selected!');

        const { audioChnl, chnlId } = await this.soundcycle.recorder.stopRecording(this.currentMode, {
          looper,
          laneId: this.currentLane
        });

        this.addTrack(audioChnl, chnlId, this.currentLane);

        return {
          chnlId
        };
    }

  }

  playTrack(id) {
    const track = this.tracks.filter(t => t.id === id)[0];

    if(!track)
      return;

    if(!track.laneId) {
      track.start();
      return;
    }

    // Start in looper
    const looper = this.loopers.filter(l => l.id === track.laneId)[0];

    if(!looper)
      throw new Error('You tried to start a track of an inexistent lane!');

    looper.play(id):

  }

  stopTrack(id) {
    const track = this.tracks.filter(t => t.id === id)[0];

    if(!track)
      return;

    if(!track.laneId) {
      track.stop();
      return;
    }

    // Stop in looper
    const looper = this.loopers.filter(l => l.id === track.laneId)[0];

    if(!looper)
      throw new Error('You tried to stop a track of an inexistent lane!');

    looper.stop(id):

  }

  removeTrack(id) {
    this.tracks = this.tracks.filter(t => t.id !== id);
  }

  removeLane(id) {
    this.loopers = this.loopers.filter(l => l.id !== id);
    // Remove all tracks which belong to this lane
    this.tracks = this.tracks.filter(t => t.laneId !== id);
  }

  setEffectValue({ chnlId, effectName, valueType, value }) {

    let chnlToEdit;

    if(chnlId === this.masterChnlId)
      chnlToEdit = this.soundcycle.master;
    else if(chnlId === this.recorderChnlId)
      chnlToEdit = this.soundcycle.recorder;
    else
      chnlToEdit = this.tracks.filter(t => t.id === chnlId);

    if(!chnlToEdit)
      throw new Error('You tried to edit an inexistent track!');

    if(!chnlToEdit[effectName])
      throw new Error('You tried to edit an inexistent effect!');

    chnlToEdit[effectName].setValue(valueType, value);

  }

  getMasterChnlId() {
    return this.masterChnlId;
  }

  getRecorderChnlId() {
    return this.recorderChnlId;
  }

  /* INTERIOR FUNCTIONALITIES */
  onTrackPlay(id) {
    const track = this.tracks.filter(t => t.id === id)[0];
    if(track)
      track.start();
  }

  onTrackStop(id) {
    const track = this.tracks.filter(t => t.id === id)[0];
    if(track)
      track.stop();
  }

  addTrack(audioChnl, id, laneId = null) {
    this.tracks.push({
      audioChnl,
      id,
      laneId
    });
  }

  addLooper(looper, id) {
    this.loopers.push({
      looper,
      id
    });
  }

}
