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

export type IFormCombinedDateRangePickerFieldProps = IFormComponentProps<
  RangeDate,
  Omit<ICombinedDateRangePickerProps, 'value'>
>;

export const FormCombinedDateRangePickerField: React.FunctionComponent<IFormCombinedDateRangePickerFieldProps> = props => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormCombinedDateRangePickerFieldProps>)
          .defaultValue ?? dateRangeDefaultValueFactory
      }
    >
      {childProps => (
        <CombinedDateRangePicker {...props.props} {...childProps} />
      )}
    </FormField>
  );
};
