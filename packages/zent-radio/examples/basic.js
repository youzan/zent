import React, { Component } from 'react';
import Radio from '../src';
import '../assets/index.scss';

const RadioGroup = Radio.Group;

/*
## 基本用法

简单的 Radio
*/

export default class Simple extends Component {

  state = {
    value: 'male'
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <RadioGroup onChange={this.onChange.bind(this)} value={this.state.value}>
        <Radio value="male">男</Radio>
        <Radio value="female">女</Radio>
      </RadioGroup>
    );
  }
}
