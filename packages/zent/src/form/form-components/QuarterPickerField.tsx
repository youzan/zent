import {
  QuarterPicker,
  IQuarterPickerProps,
  IValueType,
  RangeDate,
} from '../../date-picker';
import { IFormComponentProps, dateRangeDefaultValueFactory } from '../shared';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';

export type IFormQuarterPickerFieldProps<T extends IValueType> =
  IFormComponentProps<RangeDate, Omit<IQuarterPickerProps<T>, 'value'>>;

export const FormQuarterPickerField = <T extends IValueType = 'string'>(
  props: IFormQuarterPickerFieldProps<T>
) => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormQuarterPickerFieldProps<T>>).defaultValue ??
        dateRangeDefaultValueFactory
      }
    >
      {childProps => <QuarterPicker {...props.props} {...childProps} />}
    </FormField>
  );
};
