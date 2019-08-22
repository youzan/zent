import * as React from 'react';
import cx from 'classnames';

import getWidth from '../utils/getWidth';
import GroupContext, { ICheckboxContext } from './GroupContext';
import { DisabledContext, IDisabledContext } from '../disabled';
import CheckboxGroup from './Group';

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
  children?: React.ReactNode;
}

function getDisabled<Value>(
  disabledCtx: IDisabledContext,
  groupCtx: ICheckboxContext<Value> | null,
  props: ICheckboxProps<Value>
) {
  if (typeof props.disabled === 'boolean') {
    return props.disabled;
  }
  if (groupCtx) {
    return groupCtx.disabled;
  }
  return disabledCtx.value;
}

function getReadOnly<Value>(
  groupCtx: ICheckboxContext<Value> | null,
  props: ICheckboxProps<Value>
) {
  if (typeof props.readOnly === 'boolean') {
    return props.readOnly;
  }
  if (groupCtx) {
    return groupCtx.readOnly;
  }
  return false;
}

export function Checkbox<Value>(props: ICheckboxProps<Value>) {
  const disabledCtx = React.useContext(DisabledContext);
  const groupCtx = React.useContext(GroupContext);
  const propsRef = React.useRef(props);
  propsRef.current = props;
  const ctxOnChange = groupCtx && groupCtx.onChange;
  const onChange: React.ChangeEventHandler<
    HTMLInputElement
  > = React.useCallback(
    evt => {
      const { value, onChange } = propsRef.current;
      if (ctxOnChange) {
        ctxOnChange(value);
        return;
      } else if (onChange) {
        const e: ICheckboxEvent<Value> = Object.create(evt);
        e.target = {
          ...propsRef.current,
          type: 'checkbox',
          checked: evt.target.checked,
        };
        onChange(e);
      }
    },
    [ctxOnChange]
  );

  const {
    checked: _3,
    className,
    style,
    disabled: _1,
    readOnly: _2,
    children,
    indeterminate,
    width,
    // value可以是任意类型，不要写到dom上去
    value,
    ...others
  } = props;
  const readOnly = getReadOnly(groupCtx, props);
  const disabled = getDisabled(disabledCtx, groupCtx, props);
  let checked: boolean;
  if (groupCtx) {
    const { value, isValueEqual } = groupCtx;
    checked = value.findIndex(it => isValueEqual(it, props.value)) !== -1;
  } else {
    checked = !!props.checked;
  }

  return (
    <label
      className={cx('zent-checkbox-wrap', className, {
        'zent-checkbox-checked': !!checked,
        'zent-checkbox-disabled': disabled || readOnly,
        'zent-checkbox-indeterminate': indeterminate,
      })}
      style={{
        ...getWidth(width),
      }}
    >
      <span className="zent-checkbox">
        <span className="zent-checkbox-inner" />
        <input
          {...others}
          type="checkbox"
          checked={checked && !indeterminate}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onChange}
        />
      </span>
      {children !== undefined &&
      children !== null &&
      children !== true &&
      children !== false ? (
        <div className="zent-checkbox-label">{children}</div>
      ) : null}
    </label>
  );
}

Checkbox.Group = CheckboxGroup;

export default Checkbox;
