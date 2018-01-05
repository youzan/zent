import React, { Component, PureComponent } from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import Portal from 'portal';

export default class NotifyContent extends (PureComponent || Component) {
  static propTypes = {
    text: PropTypes.any,
    status: PropTypes.string
  };

  static defaultProps = {
    text: '',
    status: '',
    className: ''
  };

  onExited = () => {
    this.props.close();
  };

  render() {
    const { text, status, selector, isIn } = this.props;
    return (
      <Portal selector={selector}>
        <Transition timeout={300} in={isIn} onExited={this.onExited}>
          {state => {
            return (
              <div
                className={`zent-notify zent-notify-${status} zent-notify-${state}`}
              >
                {text}
              </div>
            );
          }}
        </Transition>
      </Portal>
    );
  }
}
