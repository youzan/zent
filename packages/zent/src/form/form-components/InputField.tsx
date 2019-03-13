import { forwardRef } from 'react';
import * as React from 'react';

import Input, { IInputProps } from '../../input';
import ControlGroup, {
  IControlGroupProps,
  pickControlGroupProps,
} from '../ControlGroup';

export type IInputFieldProps = IControlGroupProps & IInputProps;

const InputField = forwardRef<HTMLDivElement, IInputFieldProps>(
  (props, ref) => {
    const { controlGroupProps, otherProps } = pickControlGroupProps(props);
    return (
      <ControlGroup ref={ref} {...controlGroupProps}>
        <Input {...otherProps} />
      </ControlGroup>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
