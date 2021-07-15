import {
  MonthPicker,
  IMonthPickerProps,
  IValueType,
  SingleDate,
} from '../../date-picker';
import { dateDefaultValueFactory, IFormComponentProps } from '../shared';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';

export type IFormMonthPickerFieldProps<T extends IValueType> =
  IFormComponentProps<SingleDate, Omit<IMonthPickerProps<T>, 'value'>>;

export const FormMonthPickerField = <T extends IValueType = 'string'>(
  props: IFormMonthPickerFieldProps<T>
) => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormMonthPickerFieldProps<T>>).defaultValue ??
        dateDefaultValueFactory
      }
    >
      {childProps => <MonthPicker {...props.props} {...childProps} />}
    </FormField>
  );
};
