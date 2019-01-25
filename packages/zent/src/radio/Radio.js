import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import assign from 'lodash/assign';
import getWidth from 'utils/getWidth';
import noop from 'lodash/noop';

import GroupContext from './GroupContext';

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
    onChange: noop,
  };

  static contextType = GroupContext;

  // event liftup
  // link: https://facebook.github.io/react/docs/lifting-state-up.html
  handleChange = evt => {
    const { props, context } = this;
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

    if (context.onRadioChange) {
      context.onRadioChange(e);
    } else {
      props.onChange(e);
    }
  };

  getRadioState() {
    let { checked, disabled, readOnly, value } = this.props;
    const { context } = this;

    if (context.onRadioChange) {
      checked = context.isValueEqual(context.value, value);
      disabled = context.disabled || disabled;
      readOnly = context.readOnly || readOnly;
    }

    return {
      checked,
      disabled,
      readOnly,
    };
  }

  render() {
    const {
      className,
      style,
      prefix,
      children,

      // value 不要放到 input 上去
      value,
      width,
      ...others
    } = this.props;
    const { checked, disabled, readOnly } = this.getRadioState();

    const classString = classNames(className, `${prefix}-radio-wrap`, {
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
        {children !== undefined && <span>{children}</span>}
      </label>
    );
  }
}
