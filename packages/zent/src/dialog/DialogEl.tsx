import * as React from 'react';
import { Component, createRef } from 'react';
import cx from 'classnames';
import focusWithoutScroll from '../utils/dom/focusWithoutScroll';

export interface IMousePosition {
  x: number;
  y: number;
}

export interface IDialogInnerElProps {
  prefix?: string;
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
    let { prefix, title } = this.props;
    if (!title) {
      return null;
    }

    title =
      typeof title === 'number' || typeof title === 'string' ? (
        <span className={`${prefix}-dialog-r-title-text`}>{title}</span>
      ) : (
        title
      );

    return (
      <div className={`${prefix}-dialog-r-header`}>
        <div className={`${prefix}-dialog-r-title`}>{title}</div>
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
    const { className, prefix, closeBtn, footer, style, children } = this.props;

    const Header = this.renderHeader();

    const closeBtnCls = cx(`${prefix}-dialog-r-close`, {
      [`${prefix}-dialog-r-has-title`]: !!Header,
    });
    const Closer = closeBtn && (
      <button type="button" className={closeBtnCls} onClick={this.onClickClose}>
        ×
      </button>
    );

    const Footer = footer && (
      <div className={`${prefix}-dialog-r-footer`}>{footer}</div>
    );

    return (
      <div
        className={`${prefix}-dialog-r ${className}`}
        style={style}
        ref={el => (this.dialogEl = el)}
      >
        {Closer}
        {Header}
        <div className={`${prefix}-dialog-r-body`}>{children}</div>
        {Footer}
      </div>
    );
  }
}

export interface IDialogElWrapper {
  prefix?: string;
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
    const { prefix, mask, visible, children } = this.props;

    return (
      <div
        ref={this.rootRef}
        tabIndex={-1}
        className={`${prefix}-dialog-r-root`}
      >
        {visible && mask && <div className={`${prefix}-dialog-r-backdrop`} />}
        <div className={`${prefix}-dialog-r-wrap`} onClick={this.onMaskClick}>
          {children}
        </div>
      </div>
    );
  }
}
