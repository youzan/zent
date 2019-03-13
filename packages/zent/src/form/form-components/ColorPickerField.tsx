import { forwardRef } from 'react';
import * as React from 'react';

import ColorPicker, { IColorPickerProps } from '../../colorpicker';
import ControlGroup, {
  IControlGroupProps,
  pickControlGroupProps,
} from '../ControlGroup';
import { Omit } from 'utility-types';

export interface IFormColorPickerWrapProps {
  value?: string;
}

export type IColorPickerFieldProps = IControlGroupProps &
  Omit<IColorPickerProps, 'color'> & {
    value: string;
  };

const ColorPickerField = forwardRef<HTMLDivElement, IColorPickerFieldProps>(
  (props, ref) => {
    const {
      controlGroupProps,
      otherProps: { value, ...otherProps },
    } = pickControlGroupProps(props);
    return (
      <ControlGroup ref={ref} {...controlGroupProps}>
        <ColorPicker {...otherProps} color={value} />
      </ControlGroup>
    );
  }
);

ColorPickerField.displayName = 'ColorPickerField';

export default ColorPickerField;
