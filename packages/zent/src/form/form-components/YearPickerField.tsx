import * as React from 'react';
import { Omit } from 'utility-types';
import { dateDefaultValueFactory, IFormComponentProps } from '../shared';
import YearPicker, { IYearPickerProps } from '../../datetimepicker/YearPicker';
import { DatePickers } from '../../datetimepicker/common/types';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';

export type IFormYearPickerFieldProps = IFormComponentProps<
  DatePickers.Value,
  Omit<IYearPickerProps, 'value'>
>;

export const FormYearPickerField: React.FunctionComponent<
  IFormYearPickerFieldProps
> = props => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormYearPickerFieldProps>).defaultValue ||
        dateDefaultValueFactory
      }
    >
      {childProps => <YearPicker {...props.props} {...childProps} />}
    </FormField>
  );
};
