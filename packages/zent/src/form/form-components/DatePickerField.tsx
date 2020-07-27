import * as React from 'react';
import { Omit } from 'utility-types';
import { DatePicker, IDatePickerProps } from '../../date-picker';
import { dateDefaultValueFactory, IFormComponentProps } from '../shared';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';
import { SingleDate } from '../../date-picker';

export type IFormDatePickerField = IFormComponentProps<
  SingleDate,
  Omit<IDatePickerProps, 'value'>
>;

export const FormDatePickerField: React.FunctionComponent<IFormDatePickerField> = props => {
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
