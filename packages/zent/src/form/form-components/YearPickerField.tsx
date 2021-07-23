import { dateDefaultValueFactory, IFormComponentProps } from '../shared';
import {
  YearPicker,
  IYearPickerProps,
  IValueType,
  SingleDate,
} from '../../date-picker';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';

export type IFormYearPickerFieldProps<T extends IValueType> =
  IFormComponentProps<SingleDate, Omit<IYearPickerProps<T>, 'value'>>;

export const FormYearPickerField = <T extends IValueType = 'string'>(
  props: IFormYearPickerFieldProps<T>
) => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormYearPickerFieldProps<T>>).defaultValue ??
        dateDefaultValueFactory
      }
    >
      {childProps => <YearPicker {...props.props} {...childProps} />}
    </FormField>
  );
};
