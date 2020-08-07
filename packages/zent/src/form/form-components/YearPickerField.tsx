import * as React from 'react';
import { Omit } from 'utility-types';
import { dateDefaultValueFactory, IFormComponentProps } from '../shared';
import { YearPicker, IYearPickerProps } from '../../date-picker';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';
import { SingleDate } from '../../date-picker';

export type IFormYearPickerFieldProps = IFormComponentProps<
  SingleDate,
  Omit<IYearPickerProps, 'value'>
>;

export const FormYearPickerField: React.FunctionComponent<IFormYearPickerFieldProps> = props => {
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
