import * as React from 'react';
import { Omit } from 'utility-types';
import QuarterPicker, {
  IQuarterPickerProps,
} from '../../date-picker/QuarterPicker';
import { IFormComponentProps, dateRangeDefaultValueFactory } from '../shared';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';
import { RangeDate } from '../../date-picker/types';

export type IFormQuarterPickerFieldProps = IFormComponentProps<
  RangeDate,
  Omit<IQuarterPickerProps, 'value'>
>;

export const FormQuarterPickerField: React.FunctionComponent<IFormQuarterPickerFieldProps> = props => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormQuarterPickerFieldProps>).defaultValue ||
        dateRangeDefaultValueFactory
      }
    >
      {childProps => <QuarterPicker {...props.props} {...childProps} />}
    </FormField>
  );
};
