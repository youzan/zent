import * as React from 'react';
import { Omit } from 'utility-types';

import Input, { IInputProps, IInputClearEvent } from '../../input';
import { FormField, IFormFieldChildProps } from '../Field';
import { IFormComponentProps, TouchWhen, ValidateOccasion } from '../shared';
import { $MergeParams } from '../utils';

export type IFormInputFieldProps = IFormComponentProps<
  string,
  Omit<IInputProps, 'value' | 'name' | 'defaultValue'>
>;

function renderInput(
  childProps: IFormFieldChildProps<string>,
  props: IFormInputFieldProps
) {
  const onChange = React.useCallback(
    (
      e:
        | IInputClearEvent
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      childProps.onChange(e.target.value);
    },
    [childProps.onChange]
  );
  return (
    <Input
      {...(props.props as IInputProps)}
      {...childProps}
      onChange={onChange}
    />
  );
}

export const FormInputField: React.FunctionComponent<
  IFormInputFieldProps
> = props => {
  const { validateOccasion = ValidateOccasion.Blur } = props;
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormInputFieldProps>).defaultValue || ''
      }
      touchWhen={TouchWhen.Blur}
      validateOccasion={validateOccasion}
    >
      {childProps => renderInput(childProps, props)}
    </FormField>
  );
};
