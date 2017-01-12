import React, { Component } from 'react';
import Switch from '../src';
import '../assets/index.scss';

/*

  Switch组件可以通过'onChange'直接绑定点击事件

*/
export default class Simple extends Component {

  state = {
    checked: true,
    loading: false
  }

  handleChange = (checked) => {
    const view = this;
    this.setState({ loading: true });
    setTimeout(() => {
      view.setState({
        checked,
        loading: false
      });
    }, 1000);
  }

  render() {
    return (
      <Switch checked={this.state.checked} loading={this.state.loading} onChange={this.handleChange} />
    );
  }
}
