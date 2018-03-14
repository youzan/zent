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
    mode: PropTypes.string,
    className: PropTypes.string,
    prefix: PropTypes.string,

    // inline模式独有props
    defaultExpandKeys: PropTypes.array,
    defaultSelectedKey: PropTypes.string,
    inlineIndent: PropTypes.number,
  };

  static defaultProps = {
    prefix: 'zent',
    onClick: noop,
    mode: 'pop',
    inlineIndent: 24,
    defaultExpandKeys: [],
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
