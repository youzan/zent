import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';

import Portal, { IPortalProps } from '../portal';
import animatedClosable from '../utils/component/animatedClosable';
import isBrowser from '../utils/isBrowser';
import DialogEl from './DialogEl';
import { openDialog, closeDialog } from './open';

const { withNonScrollable, withESCToClose } = Portal;
const DialogPortal = withNonScrollable(Portal as React.ComponentType<
  IPortalProps
>);
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

export interface IDialogProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  visible?: boolean;
  closeBtn?: boolean;
  onClose?: (e: any) => void;
  mask?: boolean;
  maskClosable?: boolean;
  className?: string;
  prefix?: string;
  style?: React.CSSProperties;
}

export class Dialog extends Component<IDialogProps> {
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

  static openDialog = openDialog;
  static closeDialog = closeDialog;

  lastMousePosition = null;

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    const { visible, prefix, closeBtn, style } = this.props;

    // load default max/min-width value when width is not specified in style prop
    const elStyle = {
      ...(style.width ? {} : { minWidth: '560px', maxWidth: '75%' }),
      ...style,
    };

    if (visible) {
      this.lastMousePosition = this.lastMousePosition || mousePosition;
    } else {
      this.lastMousePosition = null;
    }

    // 有关闭按钮的时候同时具有ESC关闭的行为
    const PortalComponent: React.ComponentType<any> = closeBtn
      ? DialogPortalESCToClose
      : DialogPortal;

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

export default Dialog;
