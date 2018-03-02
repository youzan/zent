import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import assign from 'lodash/assign';
import getWidth from 'utils/getWidth';

export default class Radio extends Component {
  static propTypes = {
    checked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    value: PropTypes.any,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
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
    radioGroup: PropTypes.any,
  };

  // event liftup
  // link: https://facebook.github.io/react/docs/lifting-state-up.html
  handleChange = evt => {
    const { props, context } = this;
    const { radioGroup } = context;
    const e = {
      target: {
        ...props,
        type: 'radio',
        checked: evt.target.checked,
      },

      preventDefault() {
        evt.preventDefault();
      },

      stopPropagation() {
        evt.stopPropagation();
      },
    };

    if (radioGroup) {
      radioGroup.onRadioChange(e);
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

      // value不要放到input上去
      value,
      width,
      ...others
    } = props;
    const { radioGroup } = context;

    if (radioGroup) {
      checked = radioGroup.isValueEqual(radioGroup.value, value);
      disabled = radioGroup.disabled || disabled;
      readOnly = radioGroup.readOnly || readOnly;
    }

    const classString = classNames({
      [className]: !!className,
      [`${prefix}-radio-wrap`]: true,
      [`${prefix}-radio-checked`]: !!checked,
      [`${prefix}-radio-disabled`]: disabled || readOnly,
    });
    const widthStyle = getWidth(width);
    const wrapStyle = assign({}, style, widthStyle);
    return (
      <label className={classString} style={wrapStyle}>
        <span className={`${prefix}-radio`}>
          <span className={`${prefix}-radio-inner`} />
          <input
            {...others}
            type="radio"
            checked={!!checked}
            disabled={disabled}
            readOnly={readOnly}
            onChange={this.handleChange}
          />
        </span>
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
