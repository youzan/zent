import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import focusWithoutScroll from 'utils/dom/focusWithoutScroll';
import animatedClosable from 'utils/component/animatedClosable';

class DialogInnerEl extends PureComponent {
  componentDidMount() {
    this.resetTransformOrigin();
  }

  componentDidUpdate() {
    this.resetTransformOrigin();
  }

  resetTransformOrigin = (props = this.props) => {
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
        style[`${prefix}TransformOrigin`] = origin;
      });
      style[`transformOrigin`] = origin;
    }
  };

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

  render() {
    let {
      onClose,
      className,
      prefix,
      closeBtn,
      footer,
      style,
      children,
    } = this.props;

    let Header = this.renderHeader();

    const closeBtnCls = cx(`${prefix}-dialog-r-close`, {
      [`${prefix}-dialog-r-has-title`]: !!Header,
    });
    let Closer = closeBtn && (
      <button type="button" className={closeBtnCls} onClick={onClose}>
        ×
      </button>
    );

    let Footer = footer && (
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

class DialogElWrapper extends PureComponent {
  componentDidMount() {
    // Set focus to dialog iff focus is outside of dialog itself
    const activeElement = document.activeElement;
    const dialogNode = findDOMNode(this);
    if (
      dialogNode !== activeElement &&
      dialogNode &&
      !dialogNode.contains(activeElement)
    ) {
      focusWithoutScroll(dialogNode);
    }
  }

  onMaskClick = e => {
    if (
      e.target === e.currentTarget &&
      this.props.mask &&
      this.props.maskClosable
    ) {
      this.props.onClose(e);
    }
  };

  render() {
    let { prefix, mask, visible, closing, children } = this.props;

    return (
      <div tabIndex={-1} className={`${prefix}-dialog-r-root`}>
        {visible &&
          !closing &&
          mask && <div className={`${prefix}-dialog-r-backdrop`} />}
        <div className={`${prefix}-dialog-r-wrap`} onClick={this.onMaskClick}>
          {children}
        </div>
      </div>
    );
  }
}

// Make DialogWrapper a animated closable wrapper,
// so that its children have css transition classes during closing
// and the wrapper itself unmount after a timeout.
const AnimatedClosableDialogElWrapper = animatedClosable(DialogElWrapper);

// Compose all dialog components
export default class DialogEl extends PureComponent {
  render() {
    const { prefix, visible, origin, refClose, timeout } = this.props;

    return (
      <AnimatedClosableDialogElWrapper
        animationClassName={`${prefix}-zoom`}
        timout={timeout || 300}
        {...this.props}
        refClose={refClose}
        origin={origin}
        open={visible}
      >
        <DialogInnerEl {...this.props} />
      </AnimatedClosableDialogElWrapper>
    );
  }
}
