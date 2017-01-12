import React, { Component } from 'react';
import Switch from '../src';
import '../assets/index.scss';

/*

  Switch组件checked属性（true or false）

*/

export default class Simple extends Component {

  state = {
    checked1: true,
    checked2: false
  }

  handleChange1 = (checked) => {
    this.setState({ checked1: checked });
  }

  handleChange2 = (checked) => {
    this.setState({ checked2: checked });
  }

  render() {
    return (
      <div>
        <Switch checked={this.state.checked1} onChange={this.handleChange1} />
        <hr />
        <Switch checked={this.state.checked2} onChange={this.handleChange2} />
      </div>
    );
  }
}
