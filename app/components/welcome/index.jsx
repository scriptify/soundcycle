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
    fetchJSON(`getVersionInfo`)
      .then(obj => this.setState({
        version: obj
      }));
  }

  render() {
    return (
      <div className={`welcome`}>
        <div className={`logo`}>
          <img src={logo} alt={`Soundcycle icon`} />
        </div>
        <div className={`text`}>
          <div className={`v-title`}>{ this.state.version.title }</div>
          <div className={`description`}>{ this.state.version.description }</div>
        </div>
        <div className={`buttons`}>
          <div className={`btn`}>Tutorial</div>
          <div className={`btn`} onClick={this.props.onHide}>Let's go!</div>
        </div>
      </div>
    );
  }
}
