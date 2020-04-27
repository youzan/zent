import * as React from 'react';
import { Omit } from 'utility-types';
import Input, {
  IInputProps,
  IInputClearEvent,
  IInputCoreProps,
  ITextAreaProps,
} from '../../input';
import { FormField, IFormFieldChildProps } from '../Field';
import { IFormComponentProps, TouchWhen, ValidateOccasion } from '../shared';
import { $MergeParams } from '../utils';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';

/**
 * `Omit<IInputProps, ...>`无法得到正确的类型提示，因此每个类型单独Omit一次再联合
 */
export type IFormInputFieldProps = IFormComponentProps<
  string,
  | Omit<IInputCoreProps, 'value' | 'name' | 'defaultValue'>
  | Omit<ITextAreaProps, 'value' | 'name' | 'defaultValue'>
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
