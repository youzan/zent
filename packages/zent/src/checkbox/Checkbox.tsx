import * as React from 'react';
import { Component } from 'react';
import classNames from 'classnames';
import assign from 'lodash-es/assign';

import getWidth from '../utils/getWidth';
import Group from './Group';
import GroupContext, { ICheckboxContext } from './GroupContext';
import { DisabledContext, IDisabledContext } from '../disabled';

export interface ICheckboxEventTarget<Value> extends ICheckboxProps<Value> {
  type: 'checkbox';
  checked: boolean;
}

export interface ICheckboxEvent<Value> {
  target: ICheckboxEventTarget<Value>;
  preventDefault(): void;
  stopPropagation(): void;
}

export interface ICheckboxProps<Value> {
  checked?: boolean;
  value?: Value;
  disabled?: boolean;
  readOnly?: boolean;
  indeterminate?: boolean;
  onChange?: (e: ICheckboxEvent<Value>) => void;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  prefix?: string;
}

export class Checkbox<Value> extends Component<ICheckboxProps<Value>> {
  static defaultProps = {
    prefix: 'zent',
  };

  static contextType = GroupContext;

  context!: ICheckboxContext<Value> | null;

  static Group = Group;

  onChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
    const { value, onChange } = this.props;
    if (this.context) {
      this.context.onChange(value);
      return;
    } else if (onChange) {
      const e: ICheckboxEvent<Value> = Object.create(evt);
      e.target = {
        ...this.props,
        type: 'checkbox',
        checked: evt.target.checked,
      };
      onChange(e);
    }
  };

  renderImpl(disabledCtx: IDisabledContext) {
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
    } = this.props;
    if (this.context) {
      const { value, isValueEqual } = this.context;
      checked =
        value.findIndex(it => isValueEqual(it, this.props.value)) !== -1;
      readOnly = readOnly || this.context.readOnly;
      disabled = disabled || this.context.disabled;
    } else {
      disabled = typeof disabled === 'boolean' ? disabled : disabledCtx.value;
    }

    const classString = classNames(
      {
        [`${prefix}-checkbox-wrap`]: true,
        [`${prefix}-checkbox-checked`]: !!checked,
        [`${prefix}-checkbox-disabled`]: disabled || readOnly,
        [`${prefix}-checkbox-indeterminate`]: indeterminate,
      },
      className
    );

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

  renderCheckbox = (disabledCtx: IDisabledContext) => {
    return this.renderImpl(disabledCtx);
  };

  render() {
    return (
      <DisabledContext.Consumer>{this.renderCheckbox}</DisabledContext.Consumer>
    );
  }
}

export default Checkbox;
