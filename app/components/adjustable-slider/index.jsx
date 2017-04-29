import React, { Component } from 'react';

import './style.css';

import Slider from 'components/slider';

export default class AdjustableSlider extends Component {

  static INTERVAL_TIME = 50;

  constructor(props) {
    super(props);
    this.state = {
      interval: null
    };
  }

  onLess(e) {
    const less = () => {
      const newVal = this.props.value - this.props.step;
      if (newVal >= 0)
        this.props.onLess(e);
      else if(newVal < 0)
        this.props.onChange(0);
    };

    const interval = window.setInterval(less, AdjustableSlider.INTERVAL_TIME);

    this.setState({
      ...this.state,
      interval
    });

    less();
  }

  onMore(e) {

    const more = () => {
      const newVal = this.props.value + this.props.step;
      if (newVal <= this.props.max)
        this.props.onMore(e);
      else if (newVal > this.props.max)
        this.props.onChange(this.props.max);
    };

    const interval = window.setInterval(more, AdjustableSlider.INTERVAL_TIME);

    this.setState({
      ...this.state,
      interval
    });

    more();
  }

  onMouseUp() {
    if (this.state.interval)
      window.clearInterval(this.state.interval);
  }

  render() {
    return (
      <div className={'adjustable-slider'}>
        <div
          className={'adjust-btn'}
          onMouseUp={() => this.onMouseUp()}
          onMouseDown={(e) => {
            this.onLess(e);
          }}>
          -
        </div>
        <div className={'inner-slider'}>
          <Slider { ...this.props } />
        </div>
        <div
          className={'adjust-btn'}
          onMouseUp={() => this.onMouseUp()}
          onMouseDown={(e) => {
            this.onMore(e);
          }}>
            +
          </div>
      </div>
    );
  }
}
