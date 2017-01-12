import React, { Component } from 'react';

import Portal, { withESCToClose } from '../src';

import '../assets/esc.scss';

const MyPortal = withESCToClose(Portal);

export default class Esc extends Component {
  state = {
    visible: false
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  onOpen = () => {
    this.setState({
      visible: true
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <div className="esc-close-example">
        {visible ?
          <button onClick={this.onClose} className="btn-close">close</button> :
          <button onClick={this.onOpen} className="btn-open">open</button>
        }
        <MyPortal className="esc-close-portal" visible={this.state.visible} onClose={this.onClose}>
          <div className="close-hint">Press ESC to close portal</div>
        </MyPortal>
      </div>
    );
  }
}
