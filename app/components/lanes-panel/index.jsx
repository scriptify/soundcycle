import Inferno from 'inferno';
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'

import './style.css';

@connect(['uiStore'])
export default class App extends Component {

  render({ uiStore }) {
    return (
      <div>Position: { uiStore.position }</div>
    );
  }

}
