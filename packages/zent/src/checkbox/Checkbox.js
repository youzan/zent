import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Checkbox extends (PureComponent || Component) {
  static propTypes = {
    checked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    indeterminate: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    prefix: PropTypes.string
  };

  static defaultProps = {
    prefix: 'zent',
    className: '',
    style: {},
    onChange() {}
  };

  onChange = evt => {
    const props = this.props;

    props.onChange({
      target: {
        ...props,
        type: 'checkbox',
        checked: evt.target.checked
      },

      preventDefault() {
        evt.preventDefault();
      },

      stopPropagation() {
        evt.stopPropagation();
      }
    });
  };

  render() {
    const {
      checked,
      className,
      style,
      prefix,
      disabled,
      readOnly,
      children,
      indeterminate,

      // value可以是任意类型，不要写到dom上去
      value, // eslint-disable-line

      ...others
    } = this.props;

    const classString = classNames({
      [className]: !!className,
      [`${prefix}-checkbox-wrap`]: true,
      [`${prefix}-checkbox-checked`]: !!checked,
      [`${prefix}-checkbox-disabled`]: disabled || readOnly,
      [`${prefix}-checkbox-indeterminate`]: indeterminate
    });

    return (
      <label className={classString} style={style}>
        <span className={`${prefix}-checkbox`}>
          <span className={`${prefix}-checkbox-inner`} />
          <input
            {...others}
            type="checkbox"
            checked={checked && !indeterminate}
            disabled={disabled}
            readOnly={readOnly}
            onChange={this.onChange}
          />
        </span>
        {children !== undefined
          ? <span>
              {children}
            </span>
          : null}
      </label>
    );
  }
}
