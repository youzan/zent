import { forwardRef } from 'react';
import * as React from 'react';

import TimePicker, { ITimePickerProps } from '../../datetimepicker/TimePicker';
import ControlGroup, {
  IControlGroupProps,
  pickControlGroupProps,
} from '../ControlGroup';

export type ITimePickerFieldProps = IControlGroupProps & ITimePickerProps;

const TimePickerField = forwardRef<HTMLDivElement, ITimePickerFieldProps>(
  (props, ref) => {
    const { controlGroupProps, otherProps } = pickControlGroupProps(props);

    return (
      <ControlGroup ref={ref} {...controlGroupProps}>
        <TimePicker {...otherProps} />
      </ControlGroup>
    );
  }
);

TimePickerField.displayName = 'TimePickerField';

export default TimePickerField;
