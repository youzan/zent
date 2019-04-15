import * as React from 'react';
import { Omit } from 'utility-types';
import Checkbox, { ICheckboxProps, ICheckboxEvent } from '../../checkbox';
import { IFormComponentProps } from '../shared';
import { FormField, IFormFieldChildProps } from '../Field';
import { $MergeParams } from '../utils';

export type IFormCheckboxFieldProps<Value> = IFormComponentProps<
  boolean,
  Omit<ICheckboxProps<Value>, 'checked'>
>;

function renderCheckbox<Value>(
  childProps: IFormFieldChildProps<boolean>,
  props: IFormCheckboxFieldProps<Value>
) {
  const { value, ...passedProps } = childProps;
  const onChange = React.useCallback(
    (e: ICheckboxEvent<Value>) => {
      childProps.onChange(e.target.checked);
    },
    [childProps.onChange]
  );
  return (
    <Checkbox
      {...props.props}
      {...passedProps}
      checked={value}
      onChange={onChange}
    />
  );
}

export function FormCheckboxField<Value>(
  props: IFormCheckboxFieldProps<Value>
) {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormCheckboxFieldProps<Value>>).defaultValue ||
        false
      }
    >
      {childProps => renderCheckbox(childProps, props)}
    </FormField>
  );
}
