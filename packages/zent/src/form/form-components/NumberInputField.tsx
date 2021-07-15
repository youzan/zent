import NumberInput, {
  INumberInputDecimalProps,
  INumberInputIntegerProps,
} from '../../number-input';
import { IFormComponentProps } from '../shared';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';

export type IFormNumberInputFieldProps<T> = IFormComponentProps<
  T,
  | Omit<INumberInputDecimalProps, 'value'>
  | Omit<INumberInputIntegerProps, 'value'>
>;

export function FormNumberInputField<T extends number | string | null = number>(
  props: IFormNumberInputFieldProps<T>
) {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormNumberInputFieldProps<T>>).defaultValue ||
        ''
      }
    >
      {childProps => <NumberInput {...props.props} {...(childProps as any)} />}
    </FormField>
  );
}
<NumberInput />;
