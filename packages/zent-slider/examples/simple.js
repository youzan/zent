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
      <Slide value={[10, 20]} marks={marks} range />
      <Slide value={20} />
    </div>);
  }
}
