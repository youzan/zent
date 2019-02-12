import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'lodash-es/noop';

import getWidth from '../utils/getWidth';
import Group from './Group';
import Button from './RadioButton';
import GroupContext, { IRadioContext } from './GroupContext';

export interface IRadioEvent {
  target: {
    type: 'radio';
    checked: boolean;
  } & IRadioProps;
  preventDefault(): void;
  stopPropagation(): void;
}

export interface IRadioProps {
  value?: any;
  disabled?: boolean;
  readOnly?: boolean;
  width?: number | string;
  className?: string;
  prefix?: string;
  checked?: boolean;
  onChange?: (e: IRadioEvent) => void;
  style?: React.CSSProperties;
}

export class Radio extends Component<IRadioProps> {
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

  static Button: typeof Button;
  static Group: typeof Group;

  static contextType = GroupContext;
  context!: IRadioContext;

  // event liftup
  // link: https://facebook.github.io/react/docs/lifting-state-up.html
  handleChange = evt => {
    const { props, context } = this;
    const e: IRadioEvent = {
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
    const wrapStyle = {
      ...style,
      ...widthStyle,
    };

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

export default Radio;
