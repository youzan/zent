import * as React from 'react';
import { Omit } from 'utility-types';

import { IRadioGroupProps, RadioGroup, IRadioEvent } from '../../radio';
import { IFormComponentProps, IFormFieldChildProps } from '../shared';
import { FormField } from '../Field';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';

export type IFormRadioGroupFieldProps<T> = IFormComponentProps<
  T | null,
  Omit<IRadioGroupProps<T>, 'value'>
> & {
  children?: React.ReactNode;
};

function RadioGroupField<T>({
  childProps,
  props,
}: {
  childProps: IFormFieldChildProps<T | undefined>;
  props: IFormRadioGroupFieldProps<T>;
}) {
  const onChangeRef = useEventCallbackRef(childProps.onChange);
  const onChange = React.useCallback(
    (e: IRadioEvent<T>) => {
      onChangeRef.current?.(e.target.value);
    },
    [onChangeRef]
  );
  return (
    <RadioGroup {...props.props} {...childProps} onChange={onChange}>
      {props.children}
    </RadioGroup>
  );
}

export function FormRadioGroupField<T>(
  props: IFormRadioGroupFieldProps<T | null>
) {
  return (
    <FormField
      {...props}
      defaultValue={'defaultValue' in props ? props.defaultValue : null}
    >
      {childProps => <RadioGroupField childProps={childProps} props={props} />}
    </FormField>
  );
}
