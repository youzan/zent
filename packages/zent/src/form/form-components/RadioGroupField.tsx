import * as React from 'react';
import { Omit } from 'utility-types';

import { IRadioGroupProps, RadioGroup, IRadioEvent } from '../../radio';
import { IFormComponentProps, IFormFieldChildProps } from '../shared';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';

export type IFormRadioGroupFieldProps<T> = IFormComponentProps<
  T | null,
  Omit<IRadioGroupProps<T>, 'value'>
> & {
  children?: React.ReactNode;
};

function renderRadioGroup<T>(
  childProps: IFormFieldChildProps<T | undefined>,
  props: IFormRadioGroupFieldProps<T>
) {
  const onChange = React.useCallback(
    (e: IRadioEvent<T>) => {
      childProps.onChange(e.target.value);
    },
    [childProps.onChange]
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
      defaultValue={
        (props as $MergeParams<IFormRadioGroupFieldProps<T>>).defaultValue ||
        null
      }
    >
      {childProps => renderRadioGroup(childProps, props)}
    </FormField>
  );
}
