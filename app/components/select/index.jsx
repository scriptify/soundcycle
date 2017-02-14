import React, { Component } from 'react';

import './style.css';

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({
      value
    });
    this.props.onSelect(value);
  }

  render() {
    return (
      <select className="select" value={ this.state.value } onInput={ this.handleChange } { ...this.props }>
        { this.props.children }
      </select>
    );
  }
}
