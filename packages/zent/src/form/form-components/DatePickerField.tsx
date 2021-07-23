import {
  DatePicker,
  IDatePickerProps,
  SingleDate,
  IValueType,
} from '../../date-picker';
import { dateDefaultValueFactory, IFormComponentProps } from '../shared';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';

export type IFormDatePickerField<T extends IValueType> = IFormComponentProps<
  SingleDate,
  Omit<IDatePickerProps<T>, 'value'>
>;

export const FormDatePickerField = <T extends IValueType = 'string'>(
  props: IFormDatePickerField<T>
) => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormDatePickerField<T>>).defaultValue ??
        dateDefaultValueFactory
      }
    >
      {childProps => <DatePicker {...props.props} {...childProps} />}
    </FormField>
  );
};
