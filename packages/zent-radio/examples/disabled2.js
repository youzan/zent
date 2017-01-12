import React, { Component } from 'react';
import Radio from '../src';
import '../assets/index.scss';

const RadioGroup = Radio.Group;

/*
## 不可用

部分选项不可用
*/

export default class Simple extends Component {

  state = {
    value: 'apple'
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <RadioGroup onChange={this.onChange.bind(this)} value={this.state.value}>
        <Radio value="apple">苹果</Radio>
        <Radio value="pears">梨子</Radio>
        <Radio value="cucumber" disabled>黄瓜</Radio>
      </RadioGroup>
    );
  }
}
