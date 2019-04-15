import * as React from 'react';
import { Omit } from 'utility-types';
import { ICheckboxGroupProps, CheckboxGroup } from '../../checkbox';
import { FormField, IFormFieldChildProps } from '../Field';
import { IFormComponentProps } from '../shared';
import { $MergeParams } from '../utils';

export type IFormCheckboxGroupFieldProps<T> = IFormComponentProps<
  T[],
  Omit<ICheckboxGroupProps<T>, 'value'>
> & {
  children?: React.ReactNode;
};

function renderCheckboxGroup<T>(
  childProps: IFormFieldChildProps<T[]>,
  props: IFormCheckboxGroupFieldProps<T>
) {
  return (
    <CheckboxGroup {...props.props} {...childProps}>
      {props.children}
    </CheckboxGroup>
  );
}

const DEFAULT_VALUE = [] as any[];

export function FormCheckboxGroupField<T>(
  props: IFormCheckboxGroupFieldProps<T>
) {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormCheckboxGroupFieldProps<T>>).defaultValue ||
        DEFAULT_VALUE
      }
    >
      {childProps => renderCheckboxGroup(childProps, props)}
    </FormField>
  );
}
