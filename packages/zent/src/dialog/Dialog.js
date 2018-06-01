import React, { PureComponent } from 'react';
import Portal from 'portal';
import PropTypes from 'prop-types';

import animatedClosable from 'utils/component/animatedClosable';
import isBrowser from 'utils/isBrowser';
import DialogEl from './DialogEl';

const { withNonScrollable, withESCToClose } = Portal;
const DialogPortal = withNonScrollable(Portal);
const DialogPortalESCToClose = animatedClosable(withESCToClose(DialogPortal));

const TIMEOUT = 300; // ms

let mousePosition = null;

// Inspired by antd and rc-dialog
if (isBrowser) {
  document.documentElement.addEventListener('click', e => {
    mousePosition = {
      x: e.clientX,
      y: e.clientY,
    };
  });
}

export default class Dialog extends PureComponent {
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

  lastMousePosition = null;

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

    if (visible) {
      this.lastMousePosition = this.lastMousePosition || mousePosition;
    } else {
      this.lastMousePosition = null;
    }

    // 有关闭按钮的时候同时具有ESC关闭的行为
    const PortalComponent = closeBtn ? DialogPortalESCToClose : DialogPortal;

    return (
      // Here use animatedClosable to unmount content after a timeout.
      // Yet do not refClose here, call refClose in DialogEl instead.
      <PortalComponent
        open={visible}
        visible={visible}
        onClose={this.onClose}
        className={`${prefix}-dialog-r-anchor`}
        timeout={TIMEOUT} // animation timeout
      >
        <DialogEl
          {...this.props}
          onClose={this.onClose}
          style={elStyle}
          timeout={TIMEOUT}
          mousePosition={this.lastMousePosition}
        >
          {this.props.children}
        </DialogEl>
      </PortalComponent>
    );
  }
}
