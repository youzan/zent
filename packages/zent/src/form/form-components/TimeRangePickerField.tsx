import { Omit } from 'utility-types';
import { IFormComponentProps, dateRangeDefaultTimeFactory } from '../shared';
import { TimeRangePicker, ITimeRangePickerProps } from '../../date-picker';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';
import { RangeTime } from '../../date-picker';

export type IFormTimeRangePickerFieldProps = IFormComponentProps<
  RangeTime,
  Omit<ITimeRangePickerProps, 'value'>
>;

export const FormTimeRangePickerField: React.FunctionComponent<IFormTimeRangePickerFieldProps> = props => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormTimeRangePickerFieldProps>).defaultValue ??
        dateRangeDefaultTimeFactory
      }
    >
      {childProps => <TimeRangePicker {...props.props} {...childProps} />}
    </FormField>
  );
};
