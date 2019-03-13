import { forwardRef } from 'react';
import * as React from 'react';

import Checkbox, { ICheckboxProps } from '../../checkbox';
import ControlGroup, {
  IControlGroupProps,
  pickControlGroupProps,
} from '../ControlGroup';
import { Omit } from 'utility-types';

export type ICheckboxFieldProps = IControlGroupProps &
  Omit<ICheckboxProps, 'value' | 'checked'> & {
    value: boolean;
  };

const CheckboxField = forwardRef<HTMLDivElement, ICheckboxFieldProps>(
  (props, ref) => {
    const {
      controlGroupProps,
      otherProps: { value, ...otherProps },
    } = pickControlGroupProps(props);
    return (
      <ControlGroup ref={ref} {...controlGroupProps}>
        <Checkbox {...otherProps} checked={value} />
      </ControlGroup>
    );
  }
);

CheckboxField.displayName = 'CheckboxField';

export default CheckboxField;
