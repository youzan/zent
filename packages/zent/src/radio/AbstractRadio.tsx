import { ReactNode, useCallback, useRef } from 'react';

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
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
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
  ctx: IRadioContext<Value> | null,
  props: IRadioProps<Value>
) {
  const propsRef = useRef(props);
  propsRef.current = props;
  const cxOnChange = ctx && ctx.onRadioChange;
  return useCallback(
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
  disabledCtx: IDisabledContext,
  groupCtx: IRadioContext<Value> | null,
  props: IRadioProps<Value>
): boolean {
  if (typeof props.disabled === 'boolean') {
    return props.disabled;
  }
  if (groupCtx && typeof groupCtx.disabled === 'boolean') {
    return groupCtx.disabled;
  }
  return disabledCtx.value;
}

function getReadOnly<Value>(
  groupCtx: IRadioContext<Value> | null,
  props: IRadioProps<Value>
): boolean {
  if (typeof props.readOnly === 'boolean') {
    return props.readOnly;
  }
  if (groupCtx) {
    return groupCtx.readOnly;
  }
  return false;
}

export function getRadioState<Value>(
  disabledCtx: IDisabledContext,
  groupCtx: IRadioContext<Value> | null,
  props: IRadioProps<Value>
) {
  const disabled = getDisabled(disabledCtx, groupCtx, props);
  const readOnly = getReadOnly(groupCtx, props);
  let checked: boolean;
  if (groupCtx) {
    checked = groupCtx.isValueEqual(groupCtx.value, props.value);
  } else {
    checked = !!props.checked;
  }
  return {
    checked,
    disabled,
    readOnly,
  };
}
