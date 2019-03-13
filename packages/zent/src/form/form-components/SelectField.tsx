import { forwardRef } from 'react';
import * as React from 'react';

import Select, { ISelectProps } from '../../select';
import ControlGroup, {
  IControlGroupProps,
  pickControlGroupProps,
} from '../ControlGroup';
import { Omit } from 'utility-types';

export type ISelectFieldProps = IControlGroupProps &
  Omit<ISelectProps, 'onChange'> & {
    onChange(value: unknown): void;
  };

const SelectField = forwardRef<HTMLDivElement, ISelectFieldProps>(
  (props, ref) => {
    const {
      controlGroupProps,
      otherProps: { onChange, ...otherProps },
    } = pickControlGroupProps(props);
    const wrappedOnChange = (e, selectedItem) => {
      onChange(selectedItem.value);
    };
    return (
      <ControlGroup ref={ref} {...controlGroupProps}>
        <Select {...otherProps} onChange={wrappedOnChange} />
      </ControlGroup>
    );
  }
);

SelectField.displayName = 'SelectField';

export default SelectField;
