import React, { Component } from 'react';
import Slider from '../src';
import '../assets/index.scss';
import '../assets/example.scss';
import 'zent-input/assets/index.scss';
/*
## Write Something here

You can write guides for users here
*/

export default class Simple extends Component {
  render() {
    const marks = {
      0: '0°C',
      30: '30°C',
      60: '60°C',
      100: '100°C'
    };
    return (<div>
      <Slider />
      <Slider value={[30, 100]} range />
      <Slider value={[30, 100]} marks={marks} range dots />
      <Slider value={[-15, -5]} range max={-1} min={-20} />
      <Slider value={1.3} max={2} min={1} step={0.1} disabled />
    </div>);
  }
}
