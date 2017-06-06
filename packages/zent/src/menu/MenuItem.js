import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class MenuItem extends (PureComponent || Component) {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string
  };

  static defaultProps = {
    prefix: 'zent'
  };

  onClick = e => {
    const { index, onClick, disabled } = this.props;

    if (disabled) return;

    onClick(e, index);
  };

  render() {
    const { prefix, className, children, disabled } = this.props;

    return (
      <li
        className={cx(`${prefix}-menu-item`, className, {
          [`${prefix}-menu-item-disabled`]: disabled
        })}
        onClick={this.onClick}
      >
        {children}
      </li>
    );
  }
}
