import { Omit } from 'utility-types';
import { IFormComponentProps, dateRangeDefaultTimeFactory } from '../shared';
import {
  CombinedTimeRangePicker,
  ICombinedTimeRangePickerProps,
} from '../../date-picker';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';
import { RangeTime } from '../../date-picker';

export type ICombinedFormTimeRangePickerFieldProps = IFormComponentProps<
  RangeTime,
  Omit<ICombinedTimeRangePickerProps, 'value'>
>;

export const FormCombinedTimeRangePickerField: React.FC<ICombinedFormTimeRangePickerFieldProps> = props => {
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
