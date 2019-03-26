import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import capitalize from 'lodash/capitalize';
import Button from 'button';
import Popover from 'popover';
import Menu from 'menu';
import Icon from 'icon';

const { MenuItem } = Menu;

export default class SplitButton extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['default', 'primary', 'success', 'danger', 'link']),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    size: PropTypes.oneOf(['large', 'medium', 'small']),
    dropdownTrigger: PropTypes.oneOf(['click', 'hover']),
    dropdownData: PropTypes.array,
    dropdownValue: PropTypes.string,
    dropdownText: PropTypes.string,
    dropdownPosition: PropTypes.oneOf([
      'left-top',
      'left-center',
      'left-bottom',
      'right-top',
      'right-center',
      'right-bottom',
      'top-left',
      'top-center',
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
      'auto-bottom-center',
      'auto-bottom-left',
      'auto-bottom-right',
      'auto-top-center',
      'auto-top-left',
      'auto-top-right',
    ]),
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
    dropdownPosition: 'auto-bottom-left',
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
      dropdownPosition,
      className,
      prefix,
      children,
      onClick,
    } = this.props;

    const classString = cx(`${prefix}-split-button`, className);

    const trigger = capitalize(dropdownTrigger);

    const Trigger =
      disabled || loading ? Popover.Trigger.Base : Popover.Trigger[trigger];

    const position = upperFirst(camelCase(dropdownPosition));

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
          position={Popover.Position[position]}
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
