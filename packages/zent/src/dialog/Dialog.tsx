import { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import Portal from '../portal';
import isBrowser from '../utils/isBrowser';
import { DialogElWrapper, DialogInnerEl, IMousePosition } from './DialogEl';
import { openDialog, closeDialog } from './open';
import { addEventListener } from '../utils/component/event-handler';

const TIMEOUT = 300; // ms

let mousePosition: IMousePosition | null = null;

if (isBrowser) {
  addEventListener(
    document.documentElement,
    'click',
    (e: MouseEvent) => {
      mousePosition = {
        x: e.clientX,
        y: e.clientY,
      };
    },
    { capture: true }
  );
}

export interface IDialogProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  visible: boolean;
  closeBtn?: boolean;
  onClose?: (e: KeyboardEvent | MouseEvent | TouchEvent) => void;
  mask?: boolean;
  maskClosable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onOpened?: () => void;
  onClosed?: () => void;
}

export interface IDialogState {
  prevOpen: boolean;
  exiting: boolean;
}

export class Dialog extends Component<IDialogProps, IDialogState> {
  static defaultProps = {
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

  onClose = (e: KeyboardEvent | MouseEvent | TouchEvent) => {
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

    if (visible) {
      this.lastMousePosition = this.lastMousePosition || mousePosition;
    } else {
      this.lastMousePosition = null;
    }

    return (
      <Portal
        visible={visible || exiting}
        onClose={this.onClose}
        className="zent-dialog-r-anchor"
        closeOnESC={closeBtn}
        blockPageScroll
      >
        <DialogElWrapper
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
            classNames="zent-zoom"
            onEntered={onOpened}
            onExited={this.onExited}
          >
            <DialogInnerEl
              {...props}
              style={style}
              closeBtn={closeBtn}
              mousePosition={this.lastMousePosition}
            >
              {children}
            </DialogInnerEl>
          </CSSTransition>
        </DialogElWrapper>
      </Portal>
    );
  }
}

export default Dialog;
