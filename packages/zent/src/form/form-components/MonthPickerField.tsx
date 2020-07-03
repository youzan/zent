import * as React from 'react';
import { Omit } from 'utility-types';
import MonthPicker, { IMonthPickerProps } from '../../date-picker/MonthPicker';
import { dateDefaultValueFactory, IFormComponentProps } from '../shared';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';
import { SingleDate } from '../../date-picker/types';

export type IFormMonthPickerFieldProps = IFormComponentProps<
  SingleDate,
  Omit<IMonthPickerProps, 'value'>
>;

export const FormMonthPickerField: React.FunctionComponent<IFormMonthPickerFieldProps> = props => {
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
