import { forwardRef } from 'react';
import * as React from 'react';

import Switch, { ISwitchProps } from '../../switch';
import ControlGroup, {
  IControlGroupProps,
  pickControlGroupProps,
} from '../ControlGroup';
import { Omit } from 'utility-types';

export type ISwitchFieldProps = IControlGroupProps &
  Omit<ISwitchProps, 'checked'> & {
    value: boolean;
  };

const SwitchField = forwardRef<HTMLDivElement, ISwitchFieldProps>(
  (props, ref) => {
    const {
      controlGroupProps,
      otherProps: { value, ...otherProps },
    } = pickControlGroupProps(props);
    return (
      <ControlGroup ref={ref} {...controlGroupProps}>
        <Switch {...otherProps} checked={value} />
      </ControlGroup>
    );
  }
);

SwitchField.displayName = 'SwitchField';

export default SwitchField;
