import React, { Component, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import focusWithoutScroll from 'utils/dom/focusWithoutScroll';

export default class DialogEl extends (PureComponent || Component) {
  onMaskClick = e => {
    if (
      e.target === e.currentTarget &&
      this.props.mask &&
      this.props.maskClosable
    ) {
      this.props.onClose(e);
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

  render() {
    let {
      onClose,
      className,
      prefix,
      closeBtn,
      footer,
      mask,
      style,
      children
    } = this.props;

    let Header = this.renderHeader();

    const closeBtnCls = cx(`${prefix}-dialog-r-close`, {
      [`${prefix}-dialog-r-has-title`]: !!Header
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
      <div tabIndex={-1} className={`${prefix}-dialog-r-root`}>
        {mask && <div className={`${prefix}-dialog-r-backdrop`} />}
        <div className={`${prefix}-dialog-r-wrap`} onClick={this.onMaskClick}>
          <div className={`${prefix}-dialog-r ${className}`} style={style}>
            {Closer}
            {Header}
            <div className={`${prefix}-dialog-r-body`}>{children}</div>
            {Footer}
          </div>
        </div>
      </div>
    );
  }
}
