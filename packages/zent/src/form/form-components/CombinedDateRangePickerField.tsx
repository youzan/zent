import {
  CombinedDateRangePicker,
  ICombinedDateRangePickerProps,
  RangeDate,
  IValueType,
} from '../../date-picker';
import { FormField } from '../Field';
import { IFormComponentProps, dateRangeDefaultValueFactory } from '../shared';
import { $MergeParams } from '../utils';

export type IFormCombinedDateRangePickerFieldProps<T extends IValueType> =
  IFormComponentProps<
    RangeDate,
    Omit<ICombinedDateRangePickerProps<T>, 'value'>
  >;

export const FormCombinedDateRangePickerField = <
  T extends IValueType = 'string'
>(
  props: IFormCombinedDateRangePickerFieldProps<T>
) => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormCombinedDateRangePickerFieldProps<T>>)
          .defaultValue ?? dateRangeDefaultValueFactory
      }
    >
      {childProps => (
        <CombinedDateRangePicker {...props.props} {...childProps} />
      )}
    </FormField>
  );
};
