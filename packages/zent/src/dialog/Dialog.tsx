import * as React from 'react';
import { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import Portal, { IPortalProps } from '../portal';
import isBrowser from '../utils/isBrowser';
import { DialogElWrapper, DialogInnerEl, IMousePosition } from './DialogEl';
import { openDialog, closeDialog } from './open';

const { withNonScrollable, withESCToClose } = Portal;
const DialogPortal = withNonScrollable(Portal as React.ComponentType<
  IPortalProps
>);
const DialogPortalESCToClose = withESCToClose(DialogPortal);

const TIMEOUT = 300; // ms

let mousePosition: IMousePosition | null = null;

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
  visible: boolean;
  closeBtn?: boolean;
  onClose?: (
    e:
      | KeyboardEvent
      | React.MouseEvent<HTMLDivElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => void;
  mask?: boolean;
  maskClosable?: boolean;
  className?: string;
  prefix?: string;
  style: React.CSSProperties;
  onOpened?: () => void;
  onClosed?: () => void;
}

export interface IDialogState {
  prevOpen: boolean;
  exiting: boolean;
}

export class Dialog extends Component<IDialogProps, IDialogState> {
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

  lastMousePosition: IMousePosition | null = null;

  constructor(props: IDialogProps) {
    super(props);
    this.state = {
      prevOpen: props.visible,
      exiting: false,
    };
  }

  onClose = (e: KeyboardEvent | React.MouseEvent<HTMLDivElement>) => {
    const { onClose } = this.props;
    onClose && onClose(e);
  };

  onExited = () => {
    const { onClosed } = this.props;
    this.setState({
      exiting: false,
    });
    onClosed && onClosed();
  };

  static getDerivedStateFromProps(
    props: IDialogProps,
    { prevOpen }: IDialogState
  ): Partial<IDialogState> | null {
    if (props.visible === prevOpen) {
      return null;
    }
    if (props.visible) {
      return {
        prevOpen: props.visible,
        exiting: false,
      };
    }
    return {
      prevOpen: props.visible,
      exiting: true,
    };
  }

  render() {
    const {
      visible,
      prefix,
      closeBtn,
      style,
      onOpened,
      onClosed,
      mask,
      maskClosable,
      children,
      ...props
    } = this.props;
    const { exiting } = this.state;

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
    const PortalComponent = closeBtn
      ? DialogPortalESCToClose
      : (DialogPortal as any);

    return (
      <PortalComponent
        visible={visible || exiting}
        onClose={this.onClose}
        className={`${prefix}-dialog-r-anchor`}
      >
        <DialogElWrapper
          prefix={prefix}
          mask={mask}
          maskClosable={maskClosable}
          visible={visible}
          onClose={this.onClose}
        >
          <CSSTransition
            appear
            mountOnEnter
            unmountOnExit
            in={visible}
            timeout={TIMEOUT}
            classNames={`${prefix}-zoom`}
            onEntered={onOpened}
            onExited={this.onExited}
          >
            <DialogInnerEl
              {...props}
              prefix={prefix}
              style={elStyle}
              closeBtn={closeBtn}
              mousePosition={this.lastMousePosition}
            >
              {children}
            </DialogInnerEl>
          </CSSTransition>
        </DialogElWrapper>
      </PortalComponent>
    );
  }
}

export default Dialog;
