import React, { Component, PropTypes } from 'react';
import cx from 'zent-utils/classnames';
import noop from 'zent-utils/lodash/noop';

export default class MenuItem extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string
  };

  static defaultProps = {
    prefix: 'zent'
  };

  onClick = (ev) => {
    const { index, onClick, disabled } = this.props;

    if (disabled) return;

    onClick(index, ev);
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
