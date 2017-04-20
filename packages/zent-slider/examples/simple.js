import React, { Component } from 'react';
import Slide from '../src';
import '../assets/index.scss';
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
      100: '100°C'
    };
    return (<div>
      <Slide value={[30, 100]} marks={marks} range dots />
      <Slide value={[-15, -5]} range max={-1} min={-20} />
      <Slide value={1} max={2} min={1} step={0.1} />
    </div>);
  }
}
