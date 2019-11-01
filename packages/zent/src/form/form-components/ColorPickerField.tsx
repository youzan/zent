import * as React from 'react';
import { Omit } from 'utility-types';
import ColorPicker, { IColorPickerProps } from '../../colorpicker';
import { FormField, IFormFieldChildProps } from '../Field';
import { IFormComponentProps } from '../shared';
import { $MergeParams } from '../utils';

export type IFormColorPickerFieldProps = IFormComponentProps<
  string,
  Omit<IColorPickerProps, 'color'>
>;

function renderColorPicker(
  childProps: IFormFieldChildProps<string>,
  props: IFormColorPickerFieldProps
) {
  const { value, ...passedProps } = childProps;
  return <ColorPicker {...props.props} {...passedProps} color={value} />;
}

export const FormColorPickerField: React.FunctionComponent<
  IFormColorPickerFieldProps
> = props => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormColorPickerFieldProps>).defaultValue || ''
      }
    >
      {childProps => renderColorPicker(childProps, props)}
    </FormField>
  );
};
