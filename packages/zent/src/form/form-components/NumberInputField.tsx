import * as React from 'react';
import { Omit } from 'utility-types';

import NumberInput, { INumberInputProps } from '../../number-input';
import { IFormComponentProps } from '../shared';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';

export type IFormNumberInputFieldProps = IFormComponentProps<
  number | string | null,
  Omit<INumberInputProps, 'value'>
>;

export const FormNumberInputField: React.FunctionComponent<IFormNumberInputFieldProps> = props => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormNumberInputFieldProps>).defaultValue || ''
      }
    >
      {childProps => <NumberInput {...props.props} {...(childProps as any)} />}
    </FormField>
  );
};
