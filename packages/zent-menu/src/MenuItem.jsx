import React, { Component, PropTypes } from 'react';
import cx from 'zent-utils/classnames';

class MenuItem extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    wrapperClassName: PropTypes.string,
  };

  static defaultProps = {
    prefix: 'zent'
  };

  onClick = (ev) => {
    const { index } = this.props;

    this.props.onClick(ev, index);
  }

  render() {
    const {
      prefix,
      className,
      children
    } = this.props;

    return (
      <li
        className={cx(`${prefix}-menu-item`, className)}
        onClick={this.onClick}
      >
        {children}
      </li>
    );
  }
}

export default MenuItem;
