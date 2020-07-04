import * as React from 'react';
import { Omit } from 'utility-types';
import { IFormComponentProps, dateRangeDefaultTimeFactory } from '../shared';
import CombinedTimeRangePicker, {
  ICombinedTimeRangePickerProps,
} from '../../date-picker/CombinedTimeRangePicker';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';
import { RangeTime } from '../../date-picker/types';

export type IFormTimeRangePickerFieldProps = IFormComponentProps<
  RangeTime,
  Omit<ICombinedTimeRangePickerProps, 'value'>
>;

export const FormTimeRangePickerField: React.FunctionComponent<IFormTimeRangePickerFieldProps> = props => {
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
