import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import setClass from 'classnames';

import { I18nReciever as Reciever } from 'i18n';
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

  renderInner = i18n => {
    const { checkedText, uncheckedText } = i18n;
    const { prefix, checked } = this.props;
    const textClassName = `${prefix}-switch-inner`;
    return (
      <span className={textClassName}>
        {checked
          ? this.props.checkedText || checkedText
          : this.props.uncheckedText || uncheckedText}
      </span>
    );
  };

  // render span 标签
  renderSwitch(classNames) {
    const disabled = this.props.disabled || this.props.loading;
    return (
      <span className={classNames} onClick={disabled ? null : this.toggle}>
        <Reciever componentName="Switch" defaultI18n={I18nDefault}>
          {this.renderInner}
        </Reciever>
      </span>
    );
  }

  render() {
    const { className, size, disabled, loading, prefix, checked } = this.props;
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

    return this.renderSwitch(classNames);
  }
}
