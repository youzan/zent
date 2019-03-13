import { forwardRef } from 'react';
import * as React from 'react';

import MonthPicker, {
  IMonthPickerProps,
} from '../../datetimepicker/MonthPicker';
import ControlGroup, {
  IControlGroupProps,
  pickControlGroupProps,
} from '../ControlGroup';

export type IMonthPickerFieldProps = IControlGroupProps & IMonthPickerProps;

const MonthPickerField = forwardRef<HTMLDivElement, IMonthPickerFieldProps>(
  (props, ref) => {
    const { controlGroupProps, otherProps } = pickControlGroupProps(props);
    return (
      <ControlGroup ref={ref} {...controlGroupProps}>
        <MonthPicker {...otherProps} />
      </ControlGroup>
    );
  }
);

MonthPickerField.displayName = 'MonthPickerField';

export default MonthPickerField;
