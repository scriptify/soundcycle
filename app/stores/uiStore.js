import { observable, action } from 'mobx';

class UiStore {
  @observable position = 2;

  @observable effectsEditor = {
    currentChnl: null
  };

  @action('set position') setPosition(pos) {
    this.position = pos;
  }

  @action('set current chnl of effects-editor') setEffectsEditorChnl(chnlId) {
    this.effectsEditor.currentChnl = chnlId;
  }

  @action('goto effect editor') gotoEffectEditor(chnlId) {
    this.setEffectsEditorChnl(chnlId);
    this.setPosition(3);
  }

}

const storeSingleton = new UiStore();

export default storeSingleton;
