import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import CommonMenu from './CommonMenu';

export default class PopupMenu extends CommonMenu {
  static propTypes = {
    prefix: PropTypes.string,
    visible: PropTypes.bool,
    onClick: PropTypes.func,
    index: PropTypes.string,
    overlayCx: PropTypes.string
  };

  handleClick = (e, index) => {
    const { onClick } = this.props;
    onClick(e, index);
  };

  renderSubMenuItems = (c, i) => {
    if (!c) {
      return null;
    }
    const { index } = this.props;
    return this.renderCommonMenuItem(c, i, index);
  };

  render() {
    const { children, prefix, visible, overlayCx } = this.props;
    if (!visible) {
      return null;
    }

    return (
      <ul
        className={cx(`${prefix}-menu`, `${prefix}-submenu-content`, overlayCx)}
      >
        {React.Children.map(children, this.renderSubMenuItems)}
      </ul>
    );
  }
}
