import * as React from 'react';
import { Omit } from 'utility-types';
import { DatePickers } from '../../datetimepicker/common/types';
import { IFormComponentProps, dateRangeDefaultValueFactory } from '../shared';
import TimeRangePicker, {
  ITimeRangePickerProps,
} from '../../datetimepicker/TimeRangePicker';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';

export type IFormTimeRangePickerFieldProps = IFormComponentProps<
  DatePickers.RangeValue,
  Omit<ITimeRangePickerProps, 'value'>
>;

export const FormTimeRangePickerField: React.FunctionComponent<
  IFormTimeRangePickerFieldProps
> = props => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormTimeRangePickerFieldProps>).defaultValue ||
        dateRangeDefaultValueFactory
      }
    >
      {childProps => <TimeRangePicker {...props.props} {...childProps} />}
    </FormField>
  );
};
