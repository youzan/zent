import { forwardRef } from 'react';
import * as React from 'react';

import DatePicker, { IDatePickerProps } from '../../datetimepicker/DatePicker';
import ControlGroup, {
  IControlGroupProps,
  pickControlGroupProps,
} from '../ControlGroup';

export type IDatePickerFieldProps = IControlGroupProps & IDatePickerProps;

const DatePickerField = forwardRef<HTMLDivElement, IDatePickerFieldProps>(
  (props, ref) => {
    const { controlGroupProps, otherProps } = pickControlGroupProps(props);
    return (
      <ControlGroup ref={ref} {...controlGroupProps}>
        <DatePicker {...otherProps} />
      </ControlGroup>
    );
  }
);

DatePickerField.displayName = 'DatePickerField';

export default DatePickerField;
