import * as React from 'react';
import cx from 'classnames';

import CommonMenu from './CommonMenu';

export default class PopupMenu extends CommonMenu<any, any> {
  handleClick = (e, specKey) => {
    const { onClick } = this.props;
    onClick(e, specKey);
  };

  onSubMenuClick = () => {
    if (this.props.onSubMenuClick) {
      this.props.onSubMenuClick(this.props.specKey);
    }
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
        onClick={this.onSubMenuClick}
      >
        {React.Children.map(children, this.renderSubMenuItems)}
      </ul>
    );
  }
}
