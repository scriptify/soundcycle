import React, { Component } from 'react';

import './style.css';
import logo from 'icons/logo.png';
import { fetchJSON } from 'stores/util';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      version: {
        title: ``,
        version: ``,
        description: ``
      }
    }
  }

  render() {

    let show = (
      <div className={`welcome`}>
        <div className={`logo`}>
          <img src={logo} alt={`Soundcycle icon`} />
        </div>
        <div className={`text`}>
          <div className={`v-title`}>Soundcycle</div>
          <div className={`description`}>A software loopstation for musicians. Completely online.</div>
        </div>
        <div className={`buttons`}>
          <div className={`btn`} onClick={this.props.onHide}>Let's go!</div>
        </div>
      </div>
    );

    return (
      <div>
        {show}
      </div>
    );
  }
}
