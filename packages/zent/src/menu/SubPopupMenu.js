import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import CommonMenu from './CommonMenu';

export default class PopupMenu extends CommonMenu {
  static propTypes = {
    prefix: PropTypes.string,
    visible: PropTypes.bool,
    onClick: PropTypes.func,
    specKey: PropTypes.string,
    overlayCx: PropTypes.string,
  };

  handleClick = (e, specKey) => {
    const { onClick } = this.props;
    onClick(e, specKey);
  };

  renderSubMenuItems = (component, index) => {
    if (!component) {
      return null;
    }
    const { specKey } = this.props;
    return this.renderCommonMenuItem(component, index, specKey);
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
