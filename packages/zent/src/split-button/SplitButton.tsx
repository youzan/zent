import { Component, createRef } from 'react';
import cx from 'classnames';

import capitalize from '../utils/capitalize';
import Button from '../button';
import Popover from '../popover';
import Menu from '../menu';
import Icon, { IconType } from '../icon';
import { DisabledContext, IDisabledContext } from '../disabled';
import * as React from 'react';

const { MenuItem } = Menu;

export interface ISplitButtonProps<Value> {
  type?: 'default' | 'primary' | 'danger' | 'success' | 'text';
  size?: 'medium' | 'large' | 'small';
  disabled?: boolean;
  loading?: boolean;
  dropdownData: Value[];
  dropdownTrigger?: 'click' | 'hover';
  dropdownText: keyof Value;
  dropdownValue: keyof Value;
  dropdownIcon: IconType;
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
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSelect?: (key: string) => void;
}

export class SplitButton<Value> extends Component<
  React.PropsWithChildren<ISplitButtonProps<Value>>
> {
  static defaultProps = {
    type: 'default',
    size: 'medium',
    dropdownTrigger: 'click',
    dropdownData: [],
    dropdownValue: 'value',
    dropdownText: 'text',
    dropdownIcon: 'down',
    dropdownPosition: 'auto-bottom-right',
  };

  static contextType = DisabledContext;
  context!: IDisabledContext;

  splitButton = createRef<HTMLDivElement>();

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
      dropdownIcon,
      className,
      children,
      onClick,
    } = this.props;

    const classString = cx('zent-split-button', className);

    const trigger = capitalize(dropdownTrigger) as keyof typeof Popover.Trigger;

    const Trigger =
      disabled || loading
        ? Popover.Trigger.Base
        : (Popover.Trigger[trigger] as any);

    const position = dropdownPosition
      .split('-')
      .map(s => capitalize(s))
      .join('') as keyof typeof Popover.Position;
    return (
      <div ref={this.splitButton} className={classString}>
        {children && (
          <Button
            className="zent-split-button__main"
            type={type}
            size={size}
            onClick={onClick}
            disabled={disabled}
            loading={loading}
          >
            {children}
          </Button>
        )}
        <div
          className={cx('zent-split-button__dropdown-wrapper', {
            'zent-split-button__dropdown-wrapper-text': type === 'text',
          })}
        >
          <Popover
            visible={this.state.isShowDropdown}
            onVisibleChange={isShow => this.toggleDropdown(isShow)}
            position={Popover.Position[position] as any}
            cushion={5}
          >
            <Trigger>
              <Button
                className={cx('zent-split-button__dropdown', {
                  'zent-split-button__dropdown-disabled': loading,
                  'zent-split-button__dropdown-icononly': !children,
                })}
                type={type}
                size={size}
                disabled={disabled}
              >
                <Icon
                  className="zent-split-button__dropdown-icon"
                  type={dropdownIcon}
                />
              </Button>
            </Trigger>
            <Popover.Content>
              <Menu
                className="zent-split-button__dropdown-menu"
                onClick={this.handleSelect}
              >
                {dropdownData.map(item => {
                  return (
                    <MenuItem
                      className={`zent-split-button__dropdown-menu-item-${type}`}
                      key={`${item[dropdownValue]}`}
                    >
                      {item[dropdownText] as unknown as React.ReactNode}
                    </MenuItem>
                  );
                })}
              </Menu>
            </Popover.Content>
          </Popover>
        </div>
      </div>
    );
  }
}

export default SplitButton;
