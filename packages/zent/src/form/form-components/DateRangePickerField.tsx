import { forwardRef } from 'react';
import * as React from 'react';

import DateRangePicker, {
  IDateRangePickerProps,
} from '../../datetimepicker/DateRangePicker';
import ControlGroup, {
  IControlGroupProps,
  pickControlGroupProps,
} from '../ControlGroup';

export type IDateRangePickerFieldProps = IControlGroupProps &
  IDateRangePickerProps;

const DateRangePickerField = forwardRef<
  HTMLDivElement,
  IDateRangePickerFieldProps
>((props, ref) => {
  const { controlGroupProps, otherProps } = pickControlGroupProps(props);
  return (
    <ControlGroup ref={ref} {...controlGroupProps}>
      <DateRangePicker {...otherProps} />
    </ControlGroup>
  );
});

DateRangePickerField.displayName = 'DateRangePickerField';

export default DateRangePickerField;
