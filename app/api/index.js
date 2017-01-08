import SoundCycle from 'soundcyclejs';

export default class LoopstationAPI {

  MODES;
  soundcycle;

  tracks = [];
  loopers = [];
  currentLane = '';
  currentMode;
  projectName;

  masterChnlId = 'MASTER_ID';
  recorderChnlId = 'RECORDER_ID';

  constructor(readyCb = () => {}) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.soundcycle = new SoundCycle(audioCtx, readyCb);
    this.MODES = this.soundcycle.recorder.MODES;
    this.currentMode = this.MODES.NEW_LANE;
  }

  setProjectName(name) {
    this.projectName = name;
  }

  getProjectName() {
    if(!this.projectName) {
      const date = new Date();
      return `project-${ date.getDate() }-${ date.getMonth() + 1 }-${ date.getFullYear() }.wav`;
    }

    return this.projectName + '.wav';
  }

  getModes() {
    return this.MODES;
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
    this.soundcycle.recorder.startRecording();
  }

  async stopRecording() {

    let params = {};

    switch(this.currentMode) {

      case this.MODES.NEW_LANE:
        const { chnlId: firstTrackId, laneId: newLaneId, looper: newLooper, audioChnl: firstAudioChnl } = await this.soundcycle.recorder.stopRecording( this.currentMode, {
          onPlay: id => this.onTrackPlay(id),
          onStop: id => this.onTrackStop(id)
        });
        // Got looper and newly added chnl
        // add them to local arrays
        this.addTrack(firstAudioChnl, firstTrackId);
        this.addLooper(newLooper, newLaneId);

        return {
          chnlId: firstTrackId,
          laneId: newLaneId
        };


      case this.MODES.SINGLE_SEQUENCE:
        const { audioChnl: singleSeqChnl, id: singleSeqId } = await this.soundcycle.recorder.stopRecording(this.currentMode);
        this.addTrack(singleSeqChnl, singleSeqId);

        return {
          chnlId: singleSeqId
        };


      case this.MODES.ADD_TO_LANE:
        const looper = this.loopers.filter(l => l.id === this.currentLane)[0];

        if(!looper)
          throw new Error('No lane was selected!');

        const { audioChnl: newLaneChnl, chnlId: newLaneChnlId } = await this.soundcycle.recorder.stopRecording(this.currentMode, {
          pLooper: looper.looper,
          laneId: this.currentLane
        });



        this.addTrack(newLaneChnl, newLaneChnlId, this.currentLane);

        return {
          chnlId: newLaneChnlId
        };
    }

  }

  playTrack(id) {
    const track = this.tracks.filter(t => t.id === id)[0];

    if(!track)
      return;

    if(!track.laneId) {
      track.audioChnl.start();
      return;
    }

    // Start in looper
    const looper = this.loopers.filter(l => l.id === track.laneId)[0];

    if(!looper)
      throw new Error('You tried to start a track of an inexistent lane!');

    looper.play(id);

  }

  stopTrack(id) {
    const track = this.tracks.filter(t => t.id === id)[0];

    if(!track)
      return;

    if(!track.laneId) {
      track.audioChnl.stop();
      return;
    }

    // Stop in looper
    const looper = this.loopers.filter(l => l.id === track.laneId)[0];

    if(!looper)
      throw new Error('You tried to stop a track of an inexistent lane!');

    looper.stop(id);

  }

  removeTrack(id) {
    const track = this.tracks.filter(t => t.id === id)[0];
    if(!track)
      throw new Error('You tried to remove an inexistent track!');

    if(track.laneId) {
      // Remove from looper
      const looper = this.loopers.filter(looper => looper.id === track.laneId)[0];
      if(looper) {
        looper.remove({ id });
      }
    }
    track.audioChnl.stop();
    this.tracks = this.tracks.filter(t => t.id !== id);
  }

  removeLane(id) {
    this.loopers = this.loopers.filter(l => l.id !== id);
    // Remove all tracks which belong to this lane
    this.tracks = this.tracks.filter(t => t.laneId !== id);
  }

  enableEffect({ chnlId, effectName }) {
    const chnlToEdit = this.getChnlById(chnlId);
    this.getEffectByName(chnlToEdit, effectName).enable();
  }

  disableEffect({ chnlId, effectName }) {
    const chnlToEdit = this.getChnlById(chnlId);
    this.getEffectByName(chnlToEdit, effectName).disable();
  }

  setEffectValue({ chnlId, effectName, valueType, value }) {

    const chnlToEdit = this.getChnlById(chnlId);

    this.getEffectByName(chnlToEdit, effectName).setValue(valueType, value);

  }

  getMasterChnlId() {
    return this.masterChnlId;
  }

  getRecorderChnlId() {
    return this.recorderChnlId;
  }

  startProjectRecording() {
    this.soundcycle.master.startRecording();
  }

  stopProjectRecording() {
    this.soundcycle.master.stopRecording( this.getProjectName() );
  }

  /* INTERIOR FUNCTIONALITIES */

  getChnlById(id) {

    if(id === this.masterChnlId)
      return this.soundcycle.master;
    else if(id === this.recorderChnlId)
      return this.soundcycle.recorder;
    else {
      let chnl = this.tracks.filter(t => t.id === id)[0];
      if(chnl)
        return chnl.audioChnl;
    }

    throw new Error('You tried to access an inexistent track!');
  }

  getEffectByName(chnl, effectName) {
    if(chnl.effects[effectName])
      return chnl.effects[effectName];

    throw new Error('You tried to access an inexistent effect!');
  }

  onTrackPlay(id) {
    const track = this.tracks.filter(t => t.id === id)[0];
    if(track)
      track.audioChnl.start();
  }

  onTrackStop(id) {
    const track = this.tracks.filter(t => t.id === id)[0];
    if(track)
      track.audioChnl.stop();
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
