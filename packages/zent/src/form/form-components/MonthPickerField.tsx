import * as React from 'react';
import { Omit } from 'utility-types';
import MonthPicker, {
  IMonthPickerProps,
} from '../../datetimepicker/MonthPicker';
import { DatePickers } from '../../datetimepicker/common/types';
import { dateDefaultValueFactory, IFormComponentProps } from '../shared';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';

export type IFormMonthPickerFieldProps = IFormComponentProps<
  DatePickers.Value,
  Omit<IMonthPickerProps, 'value'>
>;

export const FormMonthPickerField: React.FunctionComponent<
  IFormMonthPickerFieldProps
> = props => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormMonthPickerFieldProps>).defaultValue ||
        dateDefaultValueFactory
      }
    >
      {childProps => <MonthPicker {...props.props} {...childProps} />}
    </FormField>
  );
};
