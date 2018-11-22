import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import setClass from 'classnames';

export default class Switch extends PureComponent {
  static propTypes = {
    size: PropTypes.oneOf(['default', 'small']),
    prefix: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    loading: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    size: 'default',
    prefix: 'zent',
    className: '',
    disabled: false,
    loading: false,
    checked: false,
    onChange() {},
  };

  // 处理点击时间，直接执行外部onChange方法
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
        [`${prefix}-switch-disabled`]: disabled,
        [`${prefix}-switch-loading`]: loading,
        [`${prefix}-switch-checked`]: checked,
      },
      `${prefix}-switch`,
      className
    );

    return (
      <span
        className={classNames}
        onClick={switchDisabled ? null : this.toggle}
      />
    );
  }
}
