import * as React from 'react';
import cx from 'classnames';
import noop from 'lodash-es/noop';

import CommonMenu from './CommonMenu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

export interface IMenuProps {
  onClick?: (
    e: React.MouseEvent<HTMLDivElement | HTMLLIElement>,
    key: string
  ) => void;
  onSubMenuClick?: (id?: string | number) => void;
  onExpandChange?: (expanded?: string[]) => void;
  style?: React.CSSProperties;
  mode?: 'pop' | 'inline';
  defaultExpandKeys?: string[];
  defaultSelectedKey?: string;
  inlineIndent?: number;
  className?: string;
  prefix?: string;
}

export class Menu extends CommonMenu<IMenuProps, any> {
  static MenuItem = MenuItem;

  static SubMenu = SubMenu;

  static defaultProps = {
    prefix: 'zent',
    onClick: noop,
    mode: 'pop',
    inlineIndent: 24,
    defaultExpandKeys: [],
    onSubMenuClick: noop,
    onExpandChange: noop,
  };

  state = {
    selectedKey: this.props.defaultSelectedKey,
    expandKeys: this.props.defaultExpandKeys,
  };

  toggleExpand = key => {
    const { expandKeys } = this.state;
    const isCurrentKeyExpand = expandKeys.indexOf(key) !== -1;
    const newExpandKeys = isCurrentKeyExpand
      ? expandKeys.filter(item => item !== key)
      : [key, ...expandKeys];

    this.setState({
      expandKeys: newExpandKeys,
    });
    this.props.onExpandChange(newExpandKeys);
  };

  handleSelect = key => {
    this.setState({
      selectedKey: key,
    });
  };

  handleClick = (e, key) => {
    const { onClick } = this.props;
    onClick && onClick(e, key);
  };

  renderMenuItem = (component, index) => {
    if (!component) {
      return null;
    }

    return this.renderCommonMenuItem(component, index, undefined, {
      depth: 1,
      isInline: this.props.mode === 'inline',
      inlineIndent: this.props.inlineIndent,
      selectedKey: this.state.selectedKey,
      expandKeys: this.state.expandKeys,
      handleSelect: this.handleSelect,
      toggleExpand: this.toggleExpand,
      onSubMenuClick: this.props.onSubMenuClick,
    });
  };

  render() {
    const { children, prefix, className, style, mode } = this.props;
    const isInline = mode === 'inline';
    const classString = cx(`${prefix}-menu`, className, {
      [`${prefix}-menu__inline`]: isInline,
    });

    return (
      <ul className={classString} style={style}>
        {React.Children.map(children, this.renderMenuItem)}
      </ul>
    );
  }
}

export default Menu;
