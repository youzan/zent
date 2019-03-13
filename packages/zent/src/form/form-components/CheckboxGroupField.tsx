import * as React from 'react';
import { forwardRef } from 'react';

import { CheckboxGroup, ICheckboxGroupProps } from '../../checkbox';
import ControlGroup, {
  IControlGroupProps,
  pickControlGroupProps,
} from '../ControlGroup';

export type ICheckboxGroupFieldProps = IControlGroupProps & ICheckboxGroupProps;

const CheckboxGroupField = forwardRef<HTMLDivElement, ICheckboxGroupFieldProps>(
  (props, ref) => {
    const { controlGroupProps, otherProps } = pickControlGroupProps(props);
    return (
      <ControlGroup ref={ref} {...controlGroupProps}>
        <CheckboxGroup {...otherProps} />
      </ControlGroup>
    );
  }
);

CheckboxGroupField.displayName = 'CheckboxGroupField';

export default CheckboxGroupField;
