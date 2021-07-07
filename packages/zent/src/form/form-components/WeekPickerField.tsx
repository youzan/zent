import { IFormComponentProps, dateRangeDefaultValueFactory } from '../shared';
import {
  WeekPicker,
  IWeekPickerProps,
  IValueType,
  RangeDate,
} from '../../date-picker';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';

export type IFormWeekPickerFieldProps<T extends IValueType> =
  IFormComponentProps<RangeDate, Omit<IWeekPickerProps<T>, 'value'>>;

export const FormWeekPickerField = <T extends IValueType = 'string'>(
  props: IFormWeekPickerFieldProps<T>
) => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormWeekPickerFieldProps<T>>).defaultValue ??
        dateRangeDefaultValueFactory
      }
    >
      {childProps => <WeekPicker {...props.props} {...childProps} />}
    </FormField>
  );
};
