import { forwardRef } from 'react';
import * as React from 'react';

import TimeRangePicker, {
  ITimeRangePickerProps,
} from '../../datetimepicker/TimeRangePicker';
import ControlGroup, {
  IControlGroupProps,
  pickControlGroupProps,
} from '../ControlGroup';

export type ITimeRangePickerFieldProps = IControlGroupProps &
  ITimeRangePickerProps;

const TimeRangePickerField = forwardRef<
  HTMLDivElement,
  ITimeRangePickerFieldProps
>((props, ref) => {
  const { controlGroupProps, otherProps } = pickControlGroupProps(props);
  return (
    <ControlGroup ref={ref} {...controlGroupProps}>
      <TimeRangePicker {...otherProps} />
    </ControlGroup>
  );
});

TimeRangePickerField.displayName = 'TimeRangePickerField';

export default TimeRangePickerField;
