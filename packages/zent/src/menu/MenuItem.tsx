import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import { getExtraStyle } from './utils';

export interface IMenuItemProps {
  key?: string;
  disabled?: boolean;
  className?: string;
  prefix?: string;
  specKey?: unknown;
  onClick?: (e: React.MouseEvent, index: unknown) => void;
  isInline?: boolean;
  handleSelect?: (specKey: unknown) => void;
  selectedKey?: unknown[];
  depth?: number;
  inlineIndent?: boolean;
}

export class MenuItem extends Component<IMenuItemProps> {
  static defaultProps = {
    prefix: 'zent',
  };

  handleClick = (e: React.MouseEvent) => {
    const { specKey, onClick, disabled, isInline, handleSelect } = this.props;

    if (disabled) return;

    if (isInline) {
      handleSelect(specKey);
    }

    onClick(e, specKey);
  };

  render() {
    const {
      specKey,
      prefix,
      className,
      children,
      disabled,
      isInline,
      selectedKey,
      depth,
      inlineIndent,
    } = this.props;
    const isSelected = selectedKey === specKey;
    const styleObj = getExtraStyle({
      isInline,
      depth,
      inlineIndent,
    });

    return (
      <li
        className={cx(`${prefix}-menu-item`, className, {
          [`${prefix}-menu__inline-item`]: isInline,
          [`${prefix}-menu__inline-item-selected`]: isSelected,
          [`${prefix}-menu-item-disabled`]: disabled,
        })}
        style={styleObj}
        onClick={this.handleClick}
      >
        {children}
      </li>
    );
  }
}

export default MenuItem;
