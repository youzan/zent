import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from 'button';
import Popover from 'popover';
import Menu from 'menu';
import Icon from 'icon';

const { MenuItem } = Menu;

function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase());
}

export default class SplitButton extends (PureComponent || Component) {
  static propTypes = {
    type: PropTypes.oneOf(['default', 'primary', 'success', 'danger', 'link']),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    size: PropTypes.oneOf(['large', 'medium', 'small']),
    dropdownTrigger: PropTypes.oneOf(['click', 'hover']),
    dropdownData: PropTypes.array,
    dropdownValue: PropTypes.string,
    dropdownText: PropTypes.string,
    className: PropTypes.string,
    prefix: PropTypes.string,
    onClick: PropTypes.func,
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    type: 'default',
    size: 'medium',
    disabled: false,
    loading: false,
    dropdownTrigger: 'click',
    dropdownData: [],
    dropdownValue: 'value',
    dropdownText: 'text',
    className: '',
    prefix: 'zent',
  };

  state = {
    isShowDropdown: false,
  };

  toggleDropdown = isShow => {
    this.setState({ isShowDropdown: isShow });
  };

  handleSelect = (e, key) => {
    this.props.onSelect && this.props.onSelect(key);
    this.toggleDropdown(false);
  };

  render() {
    const {
      type,
      size,
      disabled,
      loading,
      dropdownTrigger,
      dropdownData,
      dropdownValue,
      dropdownText,
      className,
      prefix,
      children,
      onClick,
    } = this.props;

    const classString = cx(`${prefix}-split-button`, className);

    const trigger = titleCase(dropdownTrigger);

    const Trigger =
      disabled || loading ? Popover.Trigger.Base : Popover.Trigger[trigger];

    return (
      <div className={classString}>
        <Button
          className={`${prefix}-split-button__main`}
          type={type}
          size={size}
          onClick={onClick}
          disabled={disabled}
          loading={loading}
        >
          {children}
        </Button>
        <Popover
          visible={this.state.isShowDropdown}
          onVisibleChange={isShow => this.toggleDropdown(isShow)}
          position={Popover.Position.AutoBottomLeft}
          display="inline"
          cushion={5}
        >
          <Trigger>
            <Button
              className={cx(`${prefix}-split-button__dropdown`, {
                [`${prefix}-split-button__dropdown-disabled`]: loading,
              })}
              type={type}
              size={size}
              disabled={disabled}
            >
              <Icon
                className={`${prefix}-split-button__dropdown-icon`}
                type="caret-down"
              />
            </Button>
          </Trigger>
          <Popover.Content>
            <Menu onClick={this.handleSelect}>
              {dropdownData.map(item => {
                return (
                  <MenuItem key={item[dropdownValue]}>
                    {item[dropdownText]}
                  </MenuItem>
                );
              })}
            </Menu>
          </Popover.Content>
        </Popover>
      </div>
    );
  }
}
