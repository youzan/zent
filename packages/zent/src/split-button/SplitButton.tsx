import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import camelCase from 'lodash-es/camelCase';
import upperFirst from 'lodash-es/upperFirst';
import capitalize from 'lodash-es/capitalize';
import Button from '../button';
import Popover from '../popover';
import Menu from '../menu';
import Icon from '../icon';
import { DisabledContext, IDisabledContext } from '../disabled';

const { MenuItem } = Menu;

export interface ISplitButtonProps<Value> {
  type?: 'default' | 'primary' | 'danger' | 'success';
  size?: 'medium' | 'large' | 'small';
  disabled?: boolean;
  loading?: boolean;
  dropdownData: Value[];
  dropdownTrigger?: 'click' | 'hover';
  dropdownText: keyof Value;
  dropdownValue: keyof Value;
  dropdownPosition?:
    | 'left-top'
    | 'left-center'
    | 'left-bottom'
    | 'right-top'
    | 'right-center'
    | 'right-bottom'
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'auto-bottom-center'
    | 'auto-bottom-left'
    | 'auto-bottom-right'
    | 'auto-top-center'
    | 'auto-top-left'
    | 'auto-top-right';
  className?: string;
  prefix?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSelect?: (key: string) => void;
}

export class SplitButton<Value> extends Component<ISplitButtonProps<Value>> {
  static defaultProps = {
    type: 'default',
    size: 'medium',
    dropdownTrigger: 'click',
    dropdownData: [],
    dropdownValue: 'value',
    dropdownText: 'text',
    dropdownPosition: 'auto-bottom-left',
    prefix: 'zent',
  };

  static contextType = DisabledContext;
  context!: IDisabledContext;

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
      disabled = this.context.value,
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

    const trigger = capitalize(dropdownTrigger) as keyof typeof Popover.Trigger;

    const Trigger =
      disabled || loading
        ? Popover.Trigger.Base
        : (Popover.Trigger[trigger] as any);

    const position = upperFirst(
      camelCase(dropdownPosition)
    ) as keyof typeof Popover.Position;

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
          wrapperClassName={cx(`${prefix}-split-button__dropdown-wrapper`)}
          visible={this.state.isShowDropdown}
          onVisibleChange={isShow => this.toggleDropdown(isShow)}
          position={Popover.Position[position] as any}
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
                  <MenuItem key={`${item[dropdownValue]}`}>
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

export default SplitButton;
