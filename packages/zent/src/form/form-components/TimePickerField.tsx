import * as React from 'react';
import { Omit } from 'utility-types';
import { DatePickers } from '../../datetimepicker/common/types';
import { dateDefaultValueFactory, IFormComponentProps } from '../shared';
import TimePicker, { ITimePickerProps } from '../../datetimepicker/TimePicker';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';

export type IFormTimePickerField = IFormComponentProps<
  DatePickers.Value,
  Omit<ITimePickerProps, 'value'>
>;

export const FormTimePickerField: React.FunctionComponent<
  IFormTimePickerField
> = props => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormTimePickerField>).defaultValue ||
        dateDefaultValueFactory
      }
    >
      {childProps => <TimePicker {...props.props} {...childProps} />}
    </FormField>
  );
};
