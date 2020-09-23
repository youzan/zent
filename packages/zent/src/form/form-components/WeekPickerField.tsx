import * as React from 'react';
import { Omit } from 'utility-types';
import { IFormComponentProps, dateRangeDefaultValueFactory } from '../shared';
import { WeekPicker, IWeekPickerProps } from '../../date-picker';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';
import { RangeDate } from '../../date-picker';

export type IFormWeekPickerFieldProps = IFormComponentProps<
  RangeDate,
  Omit<IWeekPickerProps, 'value'>
>;

export const FormWeekPickerField: React.FunctionComponent<IFormWeekPickerFieldProps> = props => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormWeekPickerFieldProps>).defaultValue ||
        dateRangeDefaultValueFactory
      }
    >
      {childProps => <WeekPicker {...props.props} {...childProps} />}
    </FormField>
  );
};
