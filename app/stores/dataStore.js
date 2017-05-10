import { observable, action, computed } from 'mobx';
import { EFFECT_DATA } from 'webaudio-effect-units-collection';

import SoundCycle from 'soundcyclejs';

import { createStoreableEffects } from './util';
import uiStore from './uiStore';

const api = new SoundCycle(() => {
  console.log('Ready.');
});

class DataStore {

  EFFECT_DATA = EFFECT_DATA;
  MAX_CHNL_NAME_LENGTH = 8;
  MODES = api.getModes();

  getEffectValueData(effectName, valueName) {
    return this.EFFECT_DATA.filter(eff => eff.name === effectName)[0].values.filter(val => val.name === valueName)[0].options;
  }

  getChnlById(chnlId) {
    let chnlData;

    if(chnlId === this.recorder.id)
      chnlData = this.recorder;

    if(chnlId === this.master.id)
      chnlData = this.master;

    if(!chnlData) {

      this.lanes.forEach(lane => {

        if(chnlData)
          return 0;

        lane.chnls.forEach(chnl => {
          if(chnl.id === chnlId) {
            chnlData = chnl;
            return 0;
          }
        });

      });

      if(!chnlData) {
        chnlData = this.singleSeqChnls.filter(chnl => chnl.id === chnlId)[0];
      }


      if(!chnlData) {
        chnlData = this.freeChnls.filter(chnl => chnl.id === chnlId)[0];
      }

    }

    return chnlData;
  }

  getEffectValueObject(effects, effectName, valueName) {
    const effect = effects.filter(eff => eff.name === effectName)[0];

    if(!effect)
      throw new Error(`You tried to access an inexistent effect!`);

    const value = effect.values.filter(val => val.name === valueName)[0];

    if(!value)
      throw new Error(`You tried to access an inexistent value!`);

    return value;
  }

  getAnalyser(chnlId) {
    return api.getAnalyser({ chnlId });
  }

  @observable recorder = {
    id: api.getRecorderChnlId(),
    isRecording: false,
    currentMode: api.getCurrentMode(),
    currentLane: null,
    effects: createStoreableEffects(this.EFFECT_DATA),
    name: 'Recorder'
  };

  @observable master = {
    id: api.getMasterChnlId(),
    isRecording: false,
    filename: '',
    effects: createStoreableEffects(this.EFFECT_DATA),
    name: 'Master',
    frequencyData: []
  };

  @observable singleSeqChnls = [];

  @observable lanes = [];

  @observable freeChnls = [];

  @action('set project name') setProjectName(name) {
    this.master.filename = name;
    api.setProjectName(name);
  }

  @action('start project recording') toggleProjectRecording() {
    this.master.isRecording = !this.master.isRecording

    if(this.master.isRecording) {
      api.startProjectRecording();
    } else {
      api.stopProjectRecording();
    }
  }

  @action('add new lane') addLane({ laneId, chnlId }) {
    this.lanes.push({
      id: laneId,
      name: `Lane ${ this.lanes.length + 1 }`,
      chnls: []
    });
    this.addToLane({ laneId, chnlId });
    // Auto select lane
    this.setCurrentLane(laneId);
  }

  @action('add chnl to lane') addToLane({ laneId, chnlId }) {
    const lane = this.lanes.filter(lane => lane.id === laneId)[0];
    lane.chnls.push({
      id: chnlId,
      isPlaying: true,
      name: `Track ${ lane.chnls.length + 1 }`,
      isEdited: false,
      effects: createStoreableEffects(this.EFFECT_DATA),
      frequencyData: []
    });
    this.setMode(this.MODES.ADD_TO_LANE);
  }

  @action(`add free looping chnl`) addFreeChnl({ chnlId }) {
    this.freeChnls.push({
      id: chnlId,
      isPlaying: true,
      name: `Free ${ this.freeChnls.length + 1 }`,
      isEdited: false,
      effects: createStoreableEffects(this.EFFECT_DATA),
      frequencyData: []
    });
  }

  @action('toggle edit mode for a chnl name') toggleChnlEditMode({ chnlId }) {
    const chnl = this.getChnlById(chnlId);
    chnl.isEdited = !chnl.isEdited;
  }

  @action('change chnl name') changeChnlName({ chnlId, name }) {
    const chnl = this.getChnlById(chnlId);
    chnl.name = name.substring(0, this.MAX_CHNL_NAME_LENGTH);
  }

  @action('add chnl to singleSeqChnls') addToSingleSeqChnls(chnlId) {
    this.singleSeqChnls.push({
      id: chnlId,
      isPlaying: false,
      effects: createStoreableEffects(this.EFFECT_DATA)
    });
  }

  @action('toggle recording') toggleRecording() {
    this.recorder.isRecording = !this.recorder.isRecording;
    if(this.recorder.isRecording) {
      api.startRecording();
    } else {
      api.stopRecording()
        .then(({ chnlId, laneId }) => {
          const { NEW_LANE, ADD_TO_LANE, SINGLE_SEQUENCE, FREE_LOOPING } = this.MODES;
          switch(this.recorder.currentMode) {
            case NEW_LANE:
              this.addLane({
                laneId,
                chnlId
              });
            break;

            case ADD_TO_LANE:
              this.addToLane({
                laneId: this.recorder.currentLane,
                chnlId
              });
            break;

            case FREE_LOOPING:
              this.addFreeChnl({
                chnlId
              });
            break;

            case SINGLE_SEQUENCE:
              this.addToSingleSeqChnls(chnlId);
            break;
          }
        });
    }
  }

  @action('set mode') setMode(mode) {
    this.recorder.currentMode = mode;
    api.setMode(mode);
  }

  @action('set current lane') setCurrentLane(laneId) {
    this.recorder.currentLane = laneId;
    api.setCurrentLane(laneId);
  }

  @action('toggle play status') togglePlayStatus(chnlId) {
    const chnlData = this.getChnlById(chnlId);

    chnlData.isPlaying = !chnlData.isPlaying;

    if(chnlData.isPlaying) {
      // Track started
      api.playTrack({ id: chnlId });
    } else {
      api.stopTrack({ id: chnlId });
    }
  }

  @action('remove track') removeTrack(chnlId) {
    this.lanes = this.lanes.map(lane => {
      return {
        ...lane,
        chnls: lane.chnls.filter(chnl => chnl.id !== chnlId)
      }
    });

    this.singleSeqChnls = this.singleSeqChnls.filter(chnl => chnl.id !== chnlId);

    this.freeChnls = this.freeChnls.filter(chnl => chnl.id !== chnlId);

    api.removeTrack({ id: chnlId });

    if(uiStore.effectsEditor.currentChnl === chnlId) {
      uiStore.hideEffectsEditor();
    }
  }

  @action('remove lane') removeLane(laneId) {

    // If a chnl of this lane is open in the effect editor, close if
    const lane = this.lanes.find(lane => lane.id === laneId);
    const chnls = lane.chnls.filter(chnl => chnl.id === uiStore.effectsEditor.currentChnl);

    if(chnls.length > 0)
      uiStore.hideEffectsEditor();

    this.lanes = this.lanes.filter(lane => lane.id !== laneId);
    api.removeLane({ looperId: laneId });

    if(this.recorder.currentLane === laneId) {
      this.recorder.currentLane = (this.lanes.length > 0) ? this.lanes[0] : null;
      this.setMode(this.MODES.NEW_LANE);
    }
  }

  @action('toggle effect') toggleEffect({ chnlId, effectName }) {
    const chnlData = this.getChnlById(chnlId);
    const effect = chnlData.effects.filter(effect => effect.name === effectName)[0];

    effect.enabled = !effect.enabled;

    if(effect.enabled) {
      api.enableEffect({
        chnlId,
        effectName
      });
    } else {
      api.disableEffect({
        chnlId,
        effectName
      });
    }
  }

  @action('set effect value') setEffectValue({ chnlId, effectName, valueType, value }) {
    const chnlData = this.getChnlById(chnlId);
    const effect = chnlData.effects.filter(effect => effect.name === effectName)[0];
    const effectValue = effect.values.filter(val => val.name === valueType)[0];
    effectValue.value = value;

    api.setEffectValue({
      chnlId,
      effectName,
      valueType,
      value
    });
  }

}

const storeSingleton = new DataStore();

export default storeSingleton;
