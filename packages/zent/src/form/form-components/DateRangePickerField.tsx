import {
  DateRangePicker,
  IDateRangePickerProps,
  IValueType,
  RangeDate,
} from '../../date-picker';
import { FormField } from '../Field';
import { IFormComponentProps, dateRangeDefaultValueFactory } from '../shared';
import { $MergeParams } from '../utils';

export type IFormDateRangePickerFieldProps<T extends IValueType> =
  IFormComponentProps<RangeDate, Omit<IDateRangePickerProps<T>, 'value'>>;

export const FormDateRangePickerField = <T extends IValueType = 'string'>(
  props: IFormDateRangePickerFieldProps<T>
) => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormDateRangePickerFieldProps<T>>)
          .defaultValue ?? dateRangeDefaultValueFactory
      }
    >
      {childProps => <DateRangePicker {...props.props} {...childProps} />}
    </FormField>
  );
};
