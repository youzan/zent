import * as React from 'react';
import { ReactNode } from 'react';
import { Omit } from 'utility-types';

import { IRadioContext } from './GroupContext';
import { IDisabledContext } from '../disabled';

export interface IRadioEvent<Value>
  extends Omit<React.ChangeEvent<HTMLInputElement>, 'target'> {
  target: {
    type: 'radio';
    checked: boolean;
  } & IRadioProps<Value>;
}

export interface IRadioProps<Value> {
  value?: Value;
  disabled?: boolean;
  readOnly?: boolean;
  width?: number | string;
  className?: string;
  checked?: boolean;
  onChange?: (e: IRadioEvent<Value>) => void;
  style?: React.CSSProperties;
  children?: ReactNode;
}

function makeEvent<Value>(
  event: React.ChangeEvent<HTMLInputElement>,
  props: IRadioProps<Value>
) {
  const e: IRadioEvent<Value> = Object.create(event);
  e.target = {
    ...props,
    type: 'radio',
    checked: event.target.checked,
  };
  return e;
}

export function useRadioHandler<Value>(
  cx: IRadioContext<Value> | null,
  props: IRadioProps<Value>
) {
  const propsRef = React.useRef(props);
  propsRef.current = props;
  const cxOnChange = cx && cx.onRadioChange;
  return React.useCallback(
    event => {
      const e = makeEvent(event, propsRef.current);
      if (cxOnChange) {
        cxOnChange(e);
      } else {
        const { onChange } = propsRef.current;
        onChange && onChange(e);
      }
    },
    [cxOnChange]
  );
}

function getDisabled<Value>(
  disabledCx: IDisabledContext,
  groupCx: IRadioContext<Value> | null,
  props: IRadioProps<Value>
): boolean {
  if (typeof props.disabled === 'boolean') {
    return props.disabled;
  }
  if (groupCx && typeof groupCx.disabled === 'boolean') {
    return groupCx.disabled;
  }
  return disabledCx.value;
}

function getReadOnly<Value>(
  groupCx: IRadioContext<Value> | null,
  props: IRadioProps<Value>
): boolean {
  if (typeof props.readOnly === 'boolean') {
    return props.readOnly;
  }
  if (groupCx) {
    return groupCx.readOnly;
  }
  return false;
}

export function getRadioState<Value>(
  disabledCx: IDisabledContext,
  groupCx: IRadioContext<Value> | null,
  props: IRadioProps<Value>
) {
  const disabled = getDisabled(disabledCx, groupCx, props);
  const readOnly = getReadOnly(groupCx, props);
  let checked: boolean;
  if (groupCx) {
    checked = groupCx.isValueEqual(groupCx.value, props.value);
  } else {
    checked = !!props.checked;
  }
  return {
    checked,
    disabled,
    readOnly,
  };
}
