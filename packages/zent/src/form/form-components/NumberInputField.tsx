import { forwardRef } from 'react';
import * as React from 'react';

import NumberInput, { INumberInputProps } from '../../number-input';
import ControlGroup, {
  IControlGroupProps,
  pickControlGroupProps,
} from '../ControlGroup';

export type INumberInputFieldProps = IControlGroupProps & INumberInputProps;

const NumberInputField = forwardRef<HTMLDivElement, INumberInputFieldProps>(
  (props, ref) => {
    const { controlGroupProps, otherProps } = pickControlGroupProps(props);
    return (
      <ControlGroup ref={ref} {...controlGroupProps}>
        <NumberInput {...otherProps} />
      </ControlGroup>
    );
  }
);

NumberInputField.displayName = 'NumberInputField';

export default NumberInputField;
