import * as React from 'react';
import cx from 'classnames';
import GroupContext, { IRadioContext } from './GroupContext';
import { IRadioEvent } from './AbstractRadio';
import { DisabledContext } from '../disabled';

export interface IRadioGroupProps<Value> {
  value?: Value;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (e: IRadioEvent<Value>) => void;
  isValueEqual?: (value1: Value, value2: Value) => boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function RadioGroup<Value>(props: IRadioGroupProps<Value>) {
  const disabledCtx = React.useContext(DisabledContext);
  const {
    value,
    disabled = disabledCtx.value,
    readOnly = false,
    isValueEqual = Object.is,
    className,
    style,
    children,
    onChange,
  } = props;

  const ctx = React.useMemo<IRadioContext<Value>>(
    () => ({
      value,
      disabled,
      readOnly,
      isValueEqual,
      onRadioChange: onChange,
    }),
    [value, disabled, readOnly, isValueEqual, onChange]
  );
  return (
    <GroupContext.Provider value={ctx}>
      <div className={cx('zent-radio-group', className)} style={style}>
        {children}
      </div>
    </GroupContext.Provider>
  );
}

export default RadioGroup;
