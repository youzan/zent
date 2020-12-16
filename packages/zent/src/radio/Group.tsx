import cx from 'classnames';
import { useContext, useMemo } from 'react';

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
  const disabledCtx = useContext(DisabledContext);
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

  const ctx = useMemo<IRadioContext<Value>>(
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
