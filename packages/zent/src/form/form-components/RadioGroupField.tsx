import { forwardRef } from 'react';
import * as React from 'react';

import { RadioGroup, IRadioGroupProps } from '../../radio';
import ControlGroup, {
  IControlGroupProps,
  pickControlGroupProps,
} from '../ControlGroup';

export type IRadioGroupFieldProps = IControlGroupProps & IRadioGroupProps;

const RadioGroupField = forwardRef<HTMLDivElement, IRadioGroupFieldProps>(
  (props, ref) => {
    const { controlGroupProps, otherProps } = pickControlGroupProps(props);
    return (
      <ControlGroup ref={ref} {...controlGroupProps}>
        <RadioGroup {...otherProps} />
      </ControlGroup>
    );
  }
);

RadioGroupField.displayName = 'RadioGroupField'

export default RadioGroupField;
