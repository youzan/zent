import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Portal from 'portal';

export default class NotifyContent extends (PureComponent || Component) {
  static propTypes = {
    text: PropTypes.any,
    status: PropTypes.string,
    visible: PropTypes.bool
  };

  static defaultProps = {
    text: '',
    visible: false,
    status: ''
  };

  render() {
    const { visible, text, status, selector } = this.props;

    return (
      <Portal
        visible={visible}
        className="zent-image-p-anchor"
        selector={selector}
      >
        <div className={`zent-notify zent-notify-${status}`}>{text}</div>
      </Portal>
    );
  }
}
