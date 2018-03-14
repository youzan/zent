import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import assign from 'lodash/assign';
import getWidth from 'utils/getWidth';
import findIndex from './findIndex';

export default class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    indeterminate: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    prefix: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  static defaultProps = {
    prefix: 'zent',
    className: '',
    style: {},
    disabled: false,
    readOnly: false,
    onChange() {},
  };

  static contextTypes = {
    checkboxGroup: PropTypes.any,
  };

  onChange = evt => {
    const { props, context } = this;
    const e = {
      target: {
        ...props,
        type: 'checkbox',
        checked: evt.target.checked,
      },

      preventDefault() {
        evt.preventDefault();
      },

      stopPropagation() {
        evt.stopPropagation();
      },
    };

    if (context.checkboxGroup) {
      context.checkboxGroup.onCheckboxChange(e);
    } else {
      props.onChange(e);
    }
  };

  render() {
    const { props, context } = this;
    let {
      checked,
      className,
      style,
      prefix,
      disabled,
      readOnly,
      children,
      indeterminate,
      width,
      // value可以是任意类型，不要写到dom上去
      value,
      ...others
    } = props;
    const { checkboxGroup } = context;

    if (checkboxGroup) {
      checked =
        findIndex(checkboxGroup.value, val =>
          checkboxGroup.isValueEqual(val, value)
        ) !== -1;
      disabled = checkboxGroup.disabled || disabled;
      readOnly = checkboxGroup.readOnly || readOnly;
    }

    const classString = classNames({
      [className]: !!className,
      [`${prefix}-checkbox-wrap`]: true,
      [`${prefix}-checkbox-checked`]: !!checked,
      [`${prefix}-checkbox-disabled`]: disabled || readOnly,
      [`${prefix}-checkbox-indeterminate`]: indeterminate,
    });

    const widthStyle = getWidth(width);
    const wrapStyle = assign({}, style, widthStyle);

    return (
      <label className={classString} style={wrapStyle}>
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
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
