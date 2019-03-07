import * as React from 'react';
import { Component } from 'react';
import classNames from 'classnames';
import assign from 'lodash-es/assign';
import findIndex from 'lodash-es/findIndex';
import getWidth from '../utils/getWidth';
import Group from './Group';
import GroupContext from './GroupContext';

export interface ICheckboxEventTarget extends ICheckboxProps {
  type: 'checkbox';
  checked: boolean;
}

export interface ICheckboxEvent {
  target: ICheckboxEventTarget;
  preventDefault(): void;
  stopPropagation(): void;
}

export interface ICheckboxProps {
  checked?: boolean;
  value?: any;
  disabled?: boolean;
  readOnly?: boolean;
  indeterminate?: boolean;
  onChange?: (e: ICheckboxEvent) => void;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  prefix?: string;
}

export class Checkbox extends Component<ICheckboxProps> {
  static defaultProps = {
    prefix: 'zent',
    className: '',
    style: {},
    disabled: false,
    readOnly: false,
    onChange() {},
  };

  static contextType = GroupContext;

  static Group = Group;

  onChange = evt => {
    const { props, context } = this;
    const e: ICheckboxEvent = {
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

    if (context.onCheckboxChange) {
      context.onCheckboxChange(e);
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

    if (context.onCheckboxChange) {
      checked =
        findIndex(context.value, val => context.isValueEqual(val, value)) !==
        -1;
      disabled = context.disabled || disabled;
      readOnly = context.readOnly || readOnly;
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

export default Checkbox;
