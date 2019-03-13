import { forwardRef } from 'react';
import * as React from 'react';

import QuarterPicker, {
  IQuarterPickerProps,
} from '../../datetimepicker/QuarterPicker';
import ControlGroup, {
  IControlGroupProps,
  pickControlGroupProps,
} from '../ControlGroup';

export type IQuarterPickerFieldProps = IControlGroupProps & IQuarterPickerProps;

const QuarterPickerField = forwardRef<HTMLDivElement, IQuarterPickerFieldProps>(
  (props, ref) => {
    const { controlGroupProps, otherProps } = pickControlGroupProps(props);
    return (
      <ControlGroup ref={ref} {...controlGroupProps}>
        <QuarterPicker {...otherProps} />
      </ControlGroup>
    );
  }
);

QuarterPickerField.displayName = 'QuarterPickerField';

export default QuarterPickerField;
