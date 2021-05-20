import cx from 'classnames';
import { Children } from 'react';
import isEqual from '../utils/isEqual';

import noop from '../utils/noop';
import CommonMenu from './CommonMenu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

export interface IMenuBaseProps {
  mode?: 'inline' | 'pop';
  onClick?: (
    e: React.MouseEvent<HTMLDivElement | HTMLLIElement>,
    key: string
  ) => void;
  onSubMenuClick?: (id?: string | number) => void;
  style?: React.CSSProperties;
  className?: string;
}

export interface IMenuInlineProps extends IMenuBaseProps {
  mode: 'inline';
  /**
   * @deprecated use `defaultExpandedKeys`
   */
  defaultExpandKeys?: string[];
  defaultExpandedKeys?: string[];
  defaultSelectedKey?: string;
  expandedKeys?: string[];
  onExpandChange?: (expanded?: string[]) => void;
  selectedKey?: string;
  onSelectChange?: (selected: string) => void;
  inlineIndent?: number;
}

export interface IMenuPopProps extends IMenuBaseProps {
  mode: 'pop';
}

// the I prefix is for backward compatibility
export type IMenuProps = IMenuPopProps | IMenuInlineProps;

interface IMenuState {
  selectedKey?: string;
  expandedKeys?: string[];
  prevSelectedKeyProp?: string;
  prevExpandedKeysProp?: string[];
}

export class Menu extends CommonMenu<IMenuProps, IMenuState> {
  static MenuItem = MenuItem;

  static SubMenu = SubMenu;

  static defaultProps = {
    onClick: noop,
    mode: 'pop',
    inlineIndent: 24,
    defaultExpandKeys: [],
    onSubMenuClick: noop,
  };

  constructor(props: IMenuProps) {
    super(props);

    if (props.mode === 'inline') {
      this.state = {
        selectedKey: props.selectedKey ?? props.defaultSelectedKey,
        expandedKeys:
          props.expandedKeys ??
          props.defaultExpandedKeys ??
          props.defaultExpandKeys,
        prevExpandedKeysProp: props.expandedKeys,
        prevSelectedKeyProp: props.selectedKey,
      };
    } else {
      this.state = {};
    }
  }

  static getDerivedStateFromProps(props: IMenuProps, state: IMenuState) {
    if (props.mode !== 'inline') {
      return null;
    }

    const newState = {
      prevSelectedKeyProp: props.selectedKey,
      prevExpandedKeysProp: props.expandedKeys,
    } as Partial<IMenuState>;
    if (
      props.selectedKey !== state.prevSelectedKeyProp &&
      props.selectedKey !== state.selectedKey
    ) {
      newState.selectedKey = props.selectedKey;
    }
    if (
      !isEqual(props.expandedKeys, state.prevExpandedKeysProp) &&
      !isEqual(props.expandedKeys, state.expandedKeys)
    ) {
      newState.expandedKeys = props.expandedKeys;
    }
    return newState;
  }

  toggleExpand = (key: string) => {
    const { expandedKeys } = this.state;
    const isCurrentKeyExpand = expandedKeys.indexOf(key) !== -1;
    const newExpandKeys = isCurrentKeyExpand
      ? expandedKeys.filter(item => item !== key)
      : [key, ...expandedKeys];

    this.setState({
      expandedKeys: newExpandKeys,
    });
    (this.props as IMenuInlineProps).onExpandChange?.(newExpandKeys);
  };

  handleSelect = (key: string) => {
    this.setState({
      selectedKey: key,
    });
    (this.props as IMenuInlineProps).onSelectChange?.(key);
  };

  handleClick = (
    e: React.MouseEvent<HTMLDivElement | HTMLLIElement>,
    key: string
  ) => {
    const { onClick } = this.props;
    onClick && onClick(e, key);
  };

  renderMenuItem = (component, index: number) => {
    if (!component) {
      return null;
    }

    return this.renderCommonMenuItem(component, index, undefined, {
      depth: 1,
      isInline: this.props.mode === 'inline',
      inlineIndent: (this.props as IMenuInlineProps).inlineIndent,
      selectedKey: this.state.selectedKey,
      expandKeys: this.state.expandedKeys,
      handleSelect: this.handleSelect,
      toggleExpand: this.toggleExpand,
      onSubMenuClick: this.props.onSubMenuClick,
    });
  };

  render() {
    const { children, className, style, mode } = this.props;
    const isInline = mode === 'inline';
    const classString = cx('zent-menu', className, {
      'zent-menu__inline': isInline,
    });

    return (
      <ul className={classString} style={style}>
        {Children.map(children, this.renderMenuItem)}
      </ul>
    );
  }
}

export default Menu;
