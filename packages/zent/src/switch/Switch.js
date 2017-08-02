import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import setClass from 'classnames';

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
    checkedText: '开启',
    uncheckedText: '关闭'
  };

  // 处理点击时间，直接执行外部onChange方法
  toggle = () => {
    const { onChange, checked } = this.props;
    onChange(!checked);
  };

  getInnerText() {
    return this.props.checked
      ? this.props.checkedText
      : this.props.uncheckedText;
  }

  // render span 标签
  renderSwitch(classNames) {
    const disabled = this.props.disabled || this.props.loading;
    const textClassName = `${this.props.prefix}-switch-inner`;

    return (
      <span className={classNames} onClick={disabled ? null : this.toggle}>
        <span className={textClassName}>
          {this.getInnerText()}
        </span>
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
