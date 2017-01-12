import React, { Component } from 'react';
import Switch from '../src';
import '../assets/index.scss';

/*

  Switch组件size属性（default / small）

*/

export default class Simple extends Component {

  state = {
    checked: true,
    smallChecked: false
  }

  handleChange1 = (checked) => {
    this.setState({ checked });
  }

  handleChange2 = (checked) => {
    this.setState({ smallChecked: checked });
  }

  render() {
    return (
      <div>
        <Switch checked={this.state.checked} onChange={this.handleChange1} checkedText={'开'} uncheckedText={'关'} />
        <hr />
        <Switch size="small" checked={this.state.smallChecked} onChange={this.handleChange2} />
      </div>
    );
  }
}
