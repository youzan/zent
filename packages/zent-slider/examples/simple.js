import React, { Component } from 'react';
import Slider from '../src';
import '../assets/index.scss';
import '../assets/example.scss';
import 'zent-input/assets/index.scss';
/*
## Write Something here

You can write guides for users here
*/

const marks = {
  0: '0°C',
  30: '30°C',
  60: '60°C',
  100: '100°C'
};

export default class Simple extends Component {
  state = {
    value1: 0,
    value2: [30, 100],
    value3: [30, 100],
    value4: [-15, -5],
    value5: 1.3
  }

  onChange1 = (value) => {
    this.setState({ value1: value });
  }
  onChange2 = (value) => {
    this.setState({ value2: value });
  }
  onChange3 = (value) => {
    this.setState({ value3: value });
  }
  onChange4 = (value) => {
    this.setState({ value4: value });
  }
  onChange5 = (value) => {
    this.setState({ value5: value });
  }
  render() {
    const { value1, value2, value3, value4, value5 } = this.state;
    return (<div>
      <Slider value={value1} onChange={this.onChange1} />
      <Slider value={value2} onChange={this.onChange2} range />
      <Slider value={value3} onChange={this.onChange3} marks={marks} range dots />
      <Slider value={value4} onChange={this.onChange4} range max={-1} min={-20} />
      <Slider value={value5} onChange={this.onChange5} max={2} min={1} step={0.1} disabled />
    </div>);
  }
}
