import { Omit } from 'utility-types';
import { dateDefaultTimeFactory, IFormComponentProps } from '../shared';
import { TimePicker, ITimePickerProps } from '../../date-picker';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';
import { SingleTime } from '../../date-picker';

export type IFormTimePickerField = IFormComponentProps<
  SingleTime,
  Omit<ITimePickerProps, 'value'>
>;

export const FormTimePickerField: React.FunctionComponent<IFormTimePickerField> = props => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormTimePickerField>).defaultValue ??
        dateDefaultTimeFactory
      }
    >
      {childProps => <TimePicker {...props.props} {...childProps} />}
    </FormField>
  );
};
