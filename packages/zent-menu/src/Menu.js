import React, { PropTypes } from 'react';
import cx from 'zent-utils/classnames';
import noop from 'zent-utils/lodash/noop';
import CommonMenu from './CommonMenu';

export default class Menu extends CommonMenu {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
  };

  static defaultProps = {
    prefix: 'zent',
    onClick: noop
  };

  onClick = (e, index) => {
    const { onClick } = this.props;

    onClick(index, e);
  }

  renderMenuItem = (c, i, index) => {
    if (!c) {
      return null;
    }

    return this.renderCommonMenuItem(c, i, index);
  };

  render() {
    const {
      children,
      prefix,
      className
    } = this.props;

    return (
      <ul className={cx(`${prefix}-menu`, className)}>
        {React.Children.map(children, this.renderMenuItem)}
      </ul>
    );
  }
}
