import * as React from 'react';
import { Omit } from 'utility-types';
import { IFormComponentProps, IFormFieldChildProps } from '../shared';
import Select, { ISelectProps, ISelectItem } from '../../select';
import { FormField } from '../Field';

export type IFormSelectFieldProps<T extends ISelectItem> = IFormComponentProps<
  (T | null) | T[],
  Omit<ISelectProps<T>, 'value' | 'multiple' | 'onChange'>
> & {
  multiple?: boolean;
  options: T[];
};

function renderSelect(
  childProps: IFormFieldChildProps<any>,
  props: IFormSelectFieldProps<any>
) {
  return <Select {...(props as any)} {...childProps} />;
}

export function FormSelectField<T extends ISelectItem>(
  props: IFormSelectFieldProps<T>
) {
  return (
    <FormField {...props} defaultValue={props.multiple ? [] : null}>
      {childProps => renderSelect(childProps, props)}
    </FormField>
  );
}
