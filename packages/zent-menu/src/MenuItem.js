import React, { Component } from 'react';
import PropTypes from 'zent-utils/prop-types';
import cx from 'zent-utils/classnames';

export default class MenuItem extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string
  };

  static defaultProps = {
    prefix: 'zent'
  };

  onClick = (e) => {
    const { index, onClick, disabled } = this.props;

    if (disabled) return;

    onClick(e, index);
  }

  render() {
    const {
      prefix,
      className,
      children,
      disabled
    } = this.props;

    return (
      <li
        className={cx(`${prefix}-menu-item`, className, { [`${prefix}-menu-item-disabled`]: disabled })}
        onClick={this.onClick}
      >
        {children}
      </li>
    );
  }
}
