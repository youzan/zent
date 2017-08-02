import React, { Component, PureComponent } from 'react';
import Icon from 'icon';
import cx from 'classnames';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';

// 支持的color style
const colorTypes = ['red', 'green', 'yellow', 'blue', 'darkgreen'];

export default class Tag extends (PureComponent || Component) {
  static propTypes = {
    color: PropTypes.string,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    borderColor: PropTypes.string,
    bgColor: PropTypes.string,
    fontColor: PropTypes.string,
    closable: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string,
    prefix: PropTypes.string
  };

  static defaultProps = {
    color: 'red',
    outline: false,
    rounded: true,
    closable: false,
    className: '',
    prefix: 'zent'
  };

  state = {
    closed: false
  };

  onClose = e => {
    e.persist();
    this.setState(
      {
        closed: true
      },
      () => {
        // onClose是在*关闭以后*被调用的
        const { onClose } = this.props;
        if (isFunction(onClose)) {
          onClose(e);
        }
      }
    );
  };

  render() {
    const { closed } = this.state;
    if (closed) {
      return null;
    }

    const {
      color,
      outline,
      rounded,
      borderColor,
      bgColor,
      fontColor,
      closable,
      children,
      className,
      prefix,
      style
    } = this.props;
    const containerCls = cx(
      `${prefix}-tag`,
      `${prefix}-tag-style${colorTypes.indexOf(color) >= 0
        ? `-${color}`
        : ''}${outline ? '-outline' : ''}`,
      {
        [className]: !!className,
        [`${prefix}-tag-rounded`]: rounded,
        [`${prefix}-tag-closable`]: closable
      }
    );

    let styles = style || {};
    if (colorTypes.indexOf(color) < 0) {
      styles.borderColor = color;
      outline ? (styles.color = color) : (styles.background = color);
    }
    borderColor && (styles.borderColor = borderColor);
    bgColor && (styles.background = bgColor);
    fontColor && (styles.color = fontColor);

    return (
      <div className={containerCls} style={styles}>
        <div className={`${prefix}-tag-content`}>
          {children}
        </div>
        {closable &&
          <Icon
            type="close"
            className={`${prefix}-tag-close-btn`}
            onClick={this.onClose}
          />}
      </div>
    );
  }
}
