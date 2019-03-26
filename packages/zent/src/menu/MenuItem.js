import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getExtraStyle } from './utils';

export default class MenuItem extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    prefix: PropTypes.string,
    className: PropTypes.string,
    isInline: PropTypes.bool,

    // inline模式独有props
    depth: PropTypes.number,
    inlineIndent: PropTypes.number,
    selectedKey: PropTypes.string,
    handleSelect: PropTypes.func,
  };

  static defaultProps = {
    prefix: 'zent',
  };

  handleClick = e => {
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
