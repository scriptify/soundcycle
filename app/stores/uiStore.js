import { observable, action } from 'mobx';

class UiStore {
  @observable position = 1;

  @action('set position') setPosition(pos) {
    this.position = pos;
  }
}

const storeSingleton = new UiStore();

export default storeSingleton;
