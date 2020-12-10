import { Component, createRef } from 'react';
import cx from 'classnames';
import focusWithoutScroll from '../utils/dom/focusWithoutScroll';
import Icon from '../icon';

export interface IMousePosition {
  x: number;
  y: number;
}

export interface IDialogInnerElProps {
  title?: React.ReactNode;
  onClose?: (e: KeyboardEvent | MouseEvent | TouchEvent) => void;
  className?: string;
  closeBtn?: boolean;
  style?: React.CSSProperties;
  footer?: React.ReactNode;
  mousePosition?: IMousePosition | null;
}

export class DialogInnerEl extends Component<IDialogInnerElProps> {
  dialogEl: HTMLDivElement | null = null;

  componentDidMount() {
    this.resetTransformOrigin();
  }

  componentDidUpdate() {
    this.resetTransformOrigin();
  }

  resetTransformOrigin(props = this.props) {
    const { mousePosition } = props;
    if (
      mousePosition &&
      mousePosition.x >= 0 &&
      mousePosition.y >= 0 &&
      this.dialogEl &&
      this.dialogEl.getBoundingClientRect
    ) {
      const { left: x, top: y } = this.dialogEl.getBoundingClientRect();
      const origin = `${mousePosition.x - x}px ${mousePosition.y - y}px 0`;
      const style = this.dialogEl.style;
      ['Webkit', 'Moz', 'Ms', 'ms'].forEach(prefix => {
        style[`${prefix}TransformOrigin` as any] = origin;
      });
      style.transformOrigin = origin;
    }
  }

  renderHeader() {
    let { title } = this.props;
    if (!title) {
      return null;
    }

    title =
      typeof title === 'number' || typeof title === 'string' ? (
        <span className="zent-dialog-r-title-text">{title}</span>
      ) : (
        title
      );

    return (
      <div className="zent-dialog-r-header">
        <div className="zent-dialog-r-title">{title}</div>
      </div>
    );
  }

  onClickClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onClose } = this.props;
    if (onClose) {
      onClose(e as any);
    }
  };

  render() {
    const { className, closeBtn, footer, style, children } = this.props;

    const Header = this.renderHeader();

    const closeBtnCls = cx('zent-dialog-r-close', {
      'zent-dialog-r-has-title': !!Header,
    });
    const Closer = closeBtn && (
      <button type="button" className={closeBtnCls} onClick={this.onClickClose}>
        <Icon type="close" />
      </button>
    );

    const Footer = footer && (
      <div className="zent-dialog-r-footer">{footer}</div>
    );

    return (
      <div
        className={cx('zent-dialog-r', className, {
          'zent-dialog-r--has-header': !!Header,
          'zent-dialog-r--has-footer': !!Footer,
          'zent-dialog-r--no-close-btn': !Closer,
        })}
        style={style}
        ref={el => (this.dialogEl = el)}
      >
        {Closer}
        {Header}
        <div className="zent-dialog-r-body">
          <div className="zent-dialog-r-body-content">{children}</div>
        </div>
        {Footer}
      </div>
    );
  }
}

export interface IDialogElWrapper {
  mask?: boolean;
  maskClosable?: boolean;
  visible?: boolean;
  onClose(e: MouseEvent | TouchEvent | KeyboardEvent): void;
}

export class DialogElWrapper extends Component<IDialogElWrapper> {
  rootRef = createRef<HTMLDivElement>();

  componentDidMount() {
    // Set focus to dialog iff focus is outside of dialog itself
    const activeElement = document.activeElement;
    const dialogNode = this.rootRef.current;
    if (
      dialogNode !== activeElement &&
      dialogNode &&
      !dialogNode.contains(activeElement)
    ) {
      focusWithoutScroll(dialogNode);
    }
  }

  onMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      e.target === e.currentTarget &&
      this.props.mask &&
      this.props.maskClosable
    ) {
      this.props.onClose(e as any);
    }
  };

  render() {
    const { mask, visible, children } = this.props;

    return (
      <div ref={this.rootRef} tabIndex={-1} className="zent-dialog-r-root">
        {visible && mask && <div className="zent-dialog-r-backdrop" />}
        <div className="zent-dialog-r-wrap" onClick={this.onMaskClick}>
          {children}
        </div>
      </div>
    );
  }
}
