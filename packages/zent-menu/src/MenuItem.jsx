import React, { Component, PropTypes } from 'react';
import cx from 'zent-utils/classnames';
import { noop } from './utils';

class MenuItem extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    wrapperClassName: PropTypes.string,
  };

  static defaultProps = {
    prefix: 'zent'
  };

  onClick = (ev) => {
    const { index, onClick } = this.props;

    onClick(ev, index);
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
        onClick={disabled ? noop : this.onClick}
      >
        {children}
      </li>
    );
  }
}

export default MenuItem;
