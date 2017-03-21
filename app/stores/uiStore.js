import { observable, action } from 'mobx';

class UiStore {
  @observable visiblePanes = ['lanes'];
  @observable exclusivePane = ''; // If a pane is in there, all the other panes need to hide

  @observable effectsEditor = {
    currentChnl: null
  };

  @action('set position') setPosition(pos) {
    this.position = pos;
  }

  @action('set current chnl of effects-editor') setEffectsEditorChnl(chnlId) {
    this.effectsEditor.currentChnl = chnlId;
  }

  @action('add visible pane') addVisiblePane(name) {
    if(!this.visiblePanes.includes(name))
      this.visiblePanes.push(name);
  }

  @action('show effects editor') showEffectsEditor(chnlId) {
    this.setEffectsEditorChnl(chnlId);
    this.addVisiblePane('effects-editor');
  }

  @action('show exclusive pane') showExclusivePane(name) {
    this.exclusivePane = name;
  }

  @action('hide exclusive pane') hideExclusivePane() {
    this.exclusivePane = '';
  }

  @action('display menu') showMenu() {
    this.showExclusivePane('menu');
  }

}

const storeSingleton = new UiStore();

export default storeSingleton;
