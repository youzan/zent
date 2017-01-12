import React, { Component } from 'react';

import Portal, { withNonScrollable } from '../src';

import '../assets/nonscrollable.scss';

const MyPortal = withNonScrollable(Portal);

export default class NonScrollable extends Component {
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
      <div className="non-scrollable-example">
        {visible ?
          <button onClick={this.onClose} className="btn-close">close</button> :
          <button onClick={this.onOpen} className="btn-open">open</button>
        }
        <MyPortal className="non-scrollable-body-portal" visible={this.state.visible} onClose={this.onClose}>
          <div className="inspect-hint">Toggle the portal and inspect body.style.overflow in devtool</div>
        </MyPortal>
      </div>
    );
  }
}
