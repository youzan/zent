import React, { Component } from 'react';
import Checkbox from '../src';
import '../assets/index.scss';

const CheckboxGroup = Checkbox.Group;

/*
## Checkbox 组
*/

export default class Simple extends Component {

  state = {
    checkedValue1: ['Apple'],
    checkedValue2: ['Apple'],
    checkedValue3: ['Apple'],
    checkedValue4: ['Apple']
  }

  onChange1(checkedValue) {
    this.setState({ checkedValue1: checkedValue });
  }

  onChange2(checkedValue) {
    this.setState({ checkedValue2: checkedValue });
  }

  onChange3(checkedValue) {
    this.setState({ checkedValue3: checkedValue });
  }

  onChange4(checkedValue) {
    this.setState({ checkedValue4: checkedValue });
  }

  render() {
    return (
      <div>
        <p>正常状态</p>
        <CheckboxGroup value={this.state.checkedValue1} onChange={this.onChange1.bind(this)}>
          <Checkbox value="Apple">苹果</Checkbox>
          <Checkbox value="Pear">梨</Checkbox>
          <Checkbox value="Orange">橘</Checkbox>
        </CheckboxGroup>
        <br />

        <p>Checkbox不可用</p>
        <CheckboxGroup value={this.state.checkedValue2} onChange={this.onChange2.bind(this)}>
          <Checkbox value="Apple" disabled>苹果</Checkbox>
          <Checkbox value="Pear">梨</Checkbox>
          <Checkbox value="Orange">橘</Checkbox>
        </CheckboxGroup>
        <br />

        <p>CheckboxGroup不可用，部分Checkbox可用</p>
        <CheckboxGroup disabled value={this.state.checkedValue3} onChange={this.onChange3.bind(this)}>
          <Checkbox value="Apple">苹果</Checkbox>
          <Checkbox value="Pear">梨</Checkbox>
          <Checkbox value="Orange" disabled={false}>橘</Checkbox>
        </CheckboxGroup>
        <br />

        <p>CheckboxGroup不可用</p>
        <CheckboxGroup disabled value={this.state.checkedValue4} onChange={this.onChange4.bind(this)}>
          <Checkbox value="Apple">苹果</Checkbox>
          <Checkbox value="Pear">梨</Checkbox>
          <Checkbox value="Orange">橘</Checkbox>
        </CheckboxGroup>
        <br />
      </div>
    );
  }
}
