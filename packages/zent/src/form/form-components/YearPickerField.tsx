import { forwardRef } from 'react';
import * as React from 'react';

import YearPicker, { IYearPickerProps } from '../../datetimepicker/YearPicker';
import ControlGroup, {
  IControlGroupProps,
  pickControlGroupProps,
} from '../ControlGroup';

export type IYearPickerFieldProps = IControlGroupProps & IYearPickerProps;

const YearPickerField = forwardRef<HTMLDivElement, IYearPickerFieldProps>(
  (props, ref) => {
    const { controlGroupProps, otherProps } = pickControlGroupProps(props);
    return (
      <ControlGroup ref={ref} {...controlGroupProps}>
        <YearPicker {...otherProps} />
      </ControlGroup>
    );
  }
);

YearPickerField.displayName = 'YearPickerField';

export default YearPickerField;
