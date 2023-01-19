import { IFormComponentProps, dateRangeDefaultTimeFactory } from '../shared';
import {
  CombinedTimeRangePicker,
  ICombinedTimeRangePickerProps,
  RangeTime,
} from '../../date-picker';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';
import { FC, PropsWithChildren } from 'react';

export type ICombinedFormTimeRangePickerFieldProps = IFormComponentProps<
  RangeTime,
  Omit<ICombinedTimeRangePickerProps, 'value'>
>;

export const FormCombinedTimeRangePickerField: FC<
  PropsWithChildren<ICombinedFormTimeRangePickerFieldProps>
> = props => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<ICombinedFormTimeRangePickerFieldProps>)
          .defaultValue ?? dateRangeDefaultTimeFactory
      }
    >
      {childProps => (
        <CombinedTimeRangePicker {...props.props} {...childProps} />
      )}
    </FormField>
  );
};
