import * as React from 'react';
import { Component } from 'react';
import setClass from 'classnames';

export interface ISwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  checkedText?: string;
  uncheckedText?: string;
  loading?: boolean;
  size?: 'default' | 'small';
  className?: string;
  prefix?: string;
}

export class Switch extends Component<ISwitchProps> {
  static defaultProps = {
    size: 'default',
    prefix: 'zent',
    className: '',
    disabled: false,
    loading: false,
    checked: false,
    onChange() {},
  };

  // 处理点击事件，直接执行外部onChange方法
  toggle = () => {
    const { onChange, checked } = this.props;
    onChange(!checked);
  };

  render() {
    const { className, size, disabled, loading, prefix, checked } = this.props;
    const switchDisabled = disabled || loading;
    const classNames = setClass(
      {
        [`${prefix}-switch-${size}`]: size !== 'default',
        [`${prefix}-switch-disabled`]: switchDisabled,
        [`${prefix}-switch-loading`]: loading,
        [`${prefix}-switch-checked`]: checked,
      },
      `${prefix}-switch`,
      className
    );

    return (
      <div
        className={classNames}
        onClick={switchDisabled ? null : this.toggle}
      />
    );
  }
}

export default Switch;
