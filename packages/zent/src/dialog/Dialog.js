import React, { Component, PureComponent } from 'react';
import Portal from 'portal';
import PropTypes from 'prop-types';

import animatedClosable from '../internal/animatedClosable';
import DialogEl from './DialogEl';

const { withNonScrollable, withESCToClose } = Portal;
const DialogPortal = withNonScrollable(Portal);
const DialogPortalESCToClose = animatedClosable(withESCToClose(DialogPortal));

const TIMEOUT = 300; // ms

let mousePosition = null;

// Inspired by antd and rc-dialog
document.documentElement.addEventListener('click', e => {
  mousePosition = {
    x: e.clientX,
    y: e.clientY,
  };
});

export default class Dialog extends (PureComponent || Component) {
  static propTypes = {
    prefix: PropTypes.string,
    onClose: PropTypes.func,
    visible: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.node,
    closeBtn: PropTypes.bool,
    mask: PropTypes.bool,
    maskClosable: PropTypes.bool,
    footer: PropTypes.node,
  };

  static defaultProps = {
    prefix: 'zent',
    onClose() {},
    visible: false,
    className: '',
    style: {},
    title: '',
    closeBtn: true,
    mask: true,
    maskClosable: true,
    footer: null,
  };

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    const { visible, prefix, closeBtn, style } = this.props;

    // load default max/min-width value when width is not specified in style prop
    const elStyle = {
      ...(style.width ? {} : { minWidth: '450px', maxWidth: '75%' }),
      ...style,
    };

    // 有关闭按钮的时候同时具有ESC关闭的行为
    const PortalComponent = closeBtn ? DialogPortalESCToClose : DialogPortal;

    return (
      <PortalComponent
        open={visible}
        visible={visible}
        onClose={this.onClose}
        className={`${prefix}-dialog-r-anchor`}
        refClose={this.props.refClose}
        origin={this.props.origin}
        timeout={TIMEOUT} // animation timeout
      >
        <DialogEl
          {...this.props}
          onClose={this.onClose}
          style={elStyle}
          timeout={TIMEOUT}
          mousePosition={mousePosition}
        >
          {this.props.children}
        </DialogEl>
      </PortalComponent>
    );
  }
}
