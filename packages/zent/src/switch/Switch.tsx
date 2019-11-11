import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import { DisabledContext, IDisabledContext } from '../disabled';

export interface ISwitchProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  checkedText?: string;
  uncheckedText?: string;
  loading?: boolean;
  size: 'default' | 'small';
  className?: string;
}

export class Switch extends Component<ISwitchProps> {
  static defaultProps = {
    size: 'default',
    prefix: 'zent',
  };

  static contextType = DisabledContext;
  context!: IDisabledContext;

  // 处理点击事件，直接执行外部onChange方法
  toggle = () => {
    const { onChange, checked } = this.props;
    onChange && onChange(!checked);
  };

  render() {
    const {
      className,
      size,
      disabled = this.context.value,
      loading,
      checked,
    } = this.props;
    const switchDisabled = disabled || loading;
    const classNames = cx(
      {
        [`zent-switch-${size}`]: size !== 'default',
        'zent-switch-disabled': switchDisabled,
        'zent-switch-loading': loading,
        'zent-switch-checked': checked,
      },
      'zent-switch',
      className
    );

    return (
      <div
        className={classNames}
        onClick={switchDisabled ? undefined : this.toggle}
      />
    );
  }
}

export default Switch;
