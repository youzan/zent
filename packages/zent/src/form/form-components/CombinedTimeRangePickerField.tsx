import * as React from 'react';
import { Omit } from 'utility-types';
import { IFormComponentProps, dateRangeDefaultTimeFactory } from '../shared';
import {
  CombinedTimeRangePicker,
  ICombinedTimeRangePickerProps,
} from '../../date-picker';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';
import { RangeTime } from '../../date-picker';

export type IFormTimeRangePickerFieldProps = IFormComponentProps<
  RangeTime,
  Omit<ICombinedTimeRangePickerProps, 'value'>
>;

export const FormCombinedTimeRangePickerField: React.FunctionComponent<IFormTimeRangePickerFieldProps> = props => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormTimeRangePickerFieldProps>).defaultValue ||
        dateRangeDefaultTimeFactory
      }
    >
      {childProps => (
        <CombinedTimeRangePicker {...props.props} {...childProps} />
      )}
    </FormField>
  );
};
