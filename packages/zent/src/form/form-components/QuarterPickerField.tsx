import * as React from 'react';
import { Omit } from 'utility-types';
import QuarterPicker, {
  IQuarterPickerProps,
} from '../../datetimepicker/QuarterPicker';
import { IFormComponentProps, dateRangeDefaultValueFactory } from '../shared';
import { FormField } from '../Field';
import { DatePickers } from '../../datetimepicker/common/types';
import { $MergeParams } from '../utils';

export type IFormQuarterPickerFieldProps = IFormComponentProps<
  DatePickers.RangeValue,
  Omit<IQuarterPickerProps, 'value'>
>;

export const FormQuarterPickerField: React.FunctionComponent<
  IFormQuarterPickerFieldProps
> = props => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormQuarterPickerFieldProps>).defaultValue ||
        dateRangeDefaultValueFactory
      }
    >
      {childProps => <QuarterPicker {...props.props} {...childProps} />}
    </FormField>
  );
};
