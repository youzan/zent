import React, { Component } from 'react';
import Checkbox from '../src';
import '../assets/index.scss';

/*
## 基本用法

简单的 checkbox
*/

export default class Simple extends Component {

  state = {
    checked: false
  }

  onChange(e) {
    this.setState({ checked: e.target.checked });
  }

  render() {
    return (
      <Checkbox checked={this.state.checked} onChange={this.onChange.bind(this)} >
        Checkbox
      </Checkbox>
    );
  }
}
