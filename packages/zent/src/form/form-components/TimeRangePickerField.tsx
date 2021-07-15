import { IFormComponentProps, dateRangeDefaultTimeFactory } from '../shared';
import {
  TimeRangePicker,
  ITimeRangePickerProps,
  RangeTime,
} from '../../date-picker';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';

export type IFormTimeRangePickerFieldProps = IFormComponentProps<
  RangeTime,
  Omit<ITimeRangePickerProps, 'value'>
>;

export const FormTimeRangePickerField: React.FunctionComponent<IFormTimeRangePickerFieldProps> =
  props => {
    return (
      <FormField
        {...props}
        defaultValue={
          (props as $MergeParams<IFormTimeRangePickerFieldProps>)
            .defaultValue ?? dateRangeDefaultTimeFactory
        }
      >
        {childProps => <TimeRangePicker {...props.props} {...childProps} />}
      </FormField>
    );
  };
