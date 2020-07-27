import * as React from 'react';
import { Omit } from 'utility-types';
import {
  CombinedDateRangePicker,
  ICombinedDateRangePickerProps,
} from '../../date-picker';
import { FormField } from '../Field';
import { IFormComponentProps, dateRangeDefaultValueFactory } from '../shared';
import { $MergeParams } from '../utils';
import { RangeDate } from '../../date-picker';

export type IFormDateRangePickerFieldProps = IFormComponentProps<
  RangeDate,
  Omit<ICombinedDateRangePickerProps, 'value'>
>;

export const FormDateRangePickerField: React.FunctionComponent<IFormDateRangePickerFieldProps> = props => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormDateRangePickerFieldProps>).defaultValue ||
        dateRangeDefaultValueFactory
      }
    >
      {childProps => (
        <CombinedDateRangePicker {...props.props} {...childProps} />
      )}
    </FormField>
  );
};
