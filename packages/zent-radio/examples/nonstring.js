import React, { Component } from 'react';
import Radio from '../src';
import '../assets/index.scss';

const RadioGroup = Radio.Group;

/*
value可以是任意类型，可以使用isValueEqual来自定义比较函数
*/
export default class NonString extends Component {

  state = {
    number: 1,
    obj: { foo: 1 }
  }

  onNumberChange = (e) => {
    this.setState({ number: e.target.value });
  }

  onObjectChange = (e) => {
    this.setState({ obj: e.target.value });
  }

  // demo only, not a deepEqual
  isObjectEqual(a, b) {
    return a && b && a.foo === b.foo;
  }

  render() {
    return (
      <div>
        <p>value是数字:</p>
        <RadioGroup onChange={this.onNumberChange} value={this.state.number}>
          <Radio value={1}>1</Radio>
          <Radio value={2}>2</Radio>
        </RadioGroup>

        <p>value是object:</p>
        <RadioGroup onChange={this.onObjectChange} value={this.state.obj} isValueEqual={this.isObjectEqual}>
          <Radio value={{ foo: 1 }}>foo: 1</Radio>
          <Radio value={{ foo: 2 }}>foo: 2</Radio>
        </RadioGroup>
      </div>
    );
  }
}
