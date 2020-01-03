import * as React from 'react';
import { Omit } from 'utility-types';

import Input, { IInputProps, IInputClearEvent } from '../../input';
import { FormField, IFormFieldChildProps } from '../Field';
import { IFormComponentProps, TouchWhen, ValidateOccasion } from '../shared';
import { $MergeParams } from '../utils';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';

export type IFormInputFieldProps = IFormComponentProps<
  string,
  Omit<IInputProps, 'value' | 'name' | 'defaultValue'>
>;

const InputField: React.FC<{
  childProps: IFormFieldChildProps<string>;
  props: IFormInputFieldProps;
}> = ({ childProps, props }) => {
  const onChangeRef = useEventCallbackRef(childProps.onChange);

  const onChange = React.useCallback(
    (
      e:
        | IInputClearEvent
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      onChangeRef.current?.(e.target.value);
    },
    [onChangeRef]
  );
  return (
    <Input
      {...(props.props as IInputProps)}
      {...childProps}
      onChange={onChange}
    />
  );
};

export const FormInputField: React.FunctionComponent<IFormInputFieldProps> = props => {
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
      {childProps => <InputField childProps={childProps} props={props} />}
    </FormField>
  );
};
