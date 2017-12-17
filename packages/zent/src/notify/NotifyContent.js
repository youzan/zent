import React, { Component, PureComponent } from 'react';
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

  state = {
    transition: ''
  };

  onAnimationEnd = () => {
    const { className, close } = this.props;
    if (className) {
      // 过渡样式设为display:none 防止动画效果消失后还未unmount掉
      this.setState(
        {
          transition: 'zent-notify-hidden'
        },
        close
      );
    }
  };

  render() {
    const { text, status, selector, className } = this.props;
    const { transition } = this.state;
    return (
      <Portal className="zent-image-p-anchor" selector={selector}>
        <div
          className={`zent-notify zent-notify-${status} ${className} ${transition}`}
          onAnimationEnd={this.onAnimationEnd}
        >
          {text}
        </div>
      </Portal>
    );
  }
}
