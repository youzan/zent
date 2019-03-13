import { forwardRef } from 'react';
import * as React from 'react';

import WeekPicker, { IWeekPickerProps } from '../../datetimepicker/WeekPicker';
import ControlGroup, {
  IControlGroupProps,
  pickControlGroupProps,
} from '../ControlGroup';

export type IWeekPickerFieldProps = IControlGroupProps & IWeekPickerProps;

export const WeekPickerField = forwardRef<
  HTMLDivElement,
  IWeekPickerFieldProps
>((props, ref) => {
  const { controlGroupProps, otherProps } = pickControlGroupProps(props);
  return (
    <ControlGroup ref={ref} {...controlGroupProps}>
      <WeekPicker {...otherProps} />
    </ControlGroup>
  );
});

WeekPickerField.displayName = 'WeekPickerField';

export default WeekPickerField;
