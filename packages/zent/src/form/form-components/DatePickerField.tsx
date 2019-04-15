import * as React from 'react';
import { Omit } from 'utility-types';
import DatePicker, { IDatePickerProps } from '../../datetimepicker/DatePicker';
import { DatePickers } from '../../datetimepicker/common/types';
import { dateDefaultValueFactory, IFormComponentProps } from '../shared';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';

export type IFormDatePickerField = IFormComponentProps<
  DatePickers.Value,
  Omit<IDatePickerProps, 'value'>
>;

export const FormDatePickerField: React.FunctionComponent<
  IFormDatePickerField
> = props => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormDatePickerField>).defaultValue ||
        dateDefaultValueFactory
      }
    >
      {childProps => <DatePicker {...props.props} {...childProps} />}
    </FormField>
  );
};
