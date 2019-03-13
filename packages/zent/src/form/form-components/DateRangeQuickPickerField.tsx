import { forwardRef } from 'react';
import * as React from 'react';

import DateRangeQuickPicker, {
  IDateRangeQuickPickerProps,
} from '../../date-range-quick-picker';
import ControlGroup, {
  IControlGroupProps,
  pickControlGroupProps,
} from '../ControlGroup';

export type IDateRangePickerFieldProps = IControlGroupProps &
  IDateRangeQuickPickerProps;

const DateRangeQuickPickerField = forwardRef<
  HTMLDivElement,
  IDateRangePickerFieldProps
>((props, ref) => {
  const { controlGroupProps, otherProps } = pickControlGroupProps(props);
  return (
    <ControlGroup ref={ref} {...controlGroupProps}>
      <DateRangeQuickPicker {...otherProps} />
    </ControlGroup>
  );
});

DateRangeQuickPickerField.displayName = 'DateRangeQuickPickerField';

export default DateRangeQuickPickerField;
