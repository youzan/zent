import React from 'react';
import cx from 'classnames';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';

import CommonMenu from './CommonMenu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

export default class Menu extends CommonMenu {
  static MenuItem = MenuItem;
  static SubMenu = SubMenu;

  static propTypes = {
    onClick: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string,
    prefix: PropTypes.string
  };

  static defaultProps = {
    prefix: 'zent',
    onClick: noop
  };

  handleClick = (e, key) => {
    const { onClick } = this.props;
    onClick && onClick(e, key);
  };

  renderMenuItem = (c, i, index) => {
    if (!c) {
      return null;
    }

    return this.renderCommonMenuItem(c, i, index);
  };

  render() {
    const { children, prefix, className, style } = this.props;

    return (
      <ul className={cx(`${prefix}-menu`, className)} style={style}>
        {React.Children.map(children, this.renderMenuItem)}
      </ul>
    );
  }
}
