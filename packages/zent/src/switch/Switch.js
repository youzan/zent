import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import setClass from 'classnames';

import { I18nReceiver as Receiver } from 'i18n';
import { Switch as I18nDefault } from 'i18n/default';

export default class Switch extends (PureComponent || Component) {
  static propTypes = {
    size: PropTypes.oneOf(['large', 'default', 'small']),
    prefix: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    loading: PropTypes.bool,
    onChange: PropTypes.func,
    checkedText: PropTypes.any,
    uncheckedText: PropTypes.any
  };

  static defaultProps = {
    size: 'default',
    prefix: 'zent',
    className: '',
    disabled: false,
    loading: false,
    checked: false,
    onChange() {},
    checkedText: '',
    uncheckedText: ''
  };

  // 处理点击时间，直接执行外部onChange方法
  toggle = () => {
    const { onChange, checked } = this.props;
    onChange(!checked);
  };

  render() {
    const {
      className,
      size,
      disabled,
      loading,
      prefix,
      checked,
      checkedText,
      uncheckedText
    } = this.props;
    const switchDisabled = disabled || loading;
    const classNames = setClass(
      {
        [`${prefix}-switch-${size}`]: size !== 'default',
        [`${prefix}-switch-disabled`]: disabled,
        [`${prefix}-switch-loading`]: loading,
        [`${prefix}-switch-checked`]: checked
      },
      `${prefix}-switch`,
      className
    );

    return (
      <span
        className={classNames}
        onClick={switchDisabled ? null : this.toggle}
      >
        <Receiver componentName="Switch" defaultI18n={I18nDefault}>
          {i18n => (
            <span className={`${prefix}-switch-inner`}>
              {checked
                ? checkedText || i18n.checked
                : uncheckedText || i18n.unchecked}
            </span>
          )}
        </Receiver>
      </span>
    );
  }
}
