import * as React from 'react';
import { Omit } from 'utility-types';
import Switch, { ISwitchProps } from '../../switch';
import { IFormComponentProps, IFormFieldChildProps } from '../shared';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';

export type IFormSwitchFieldProps = IFormComponentProps<
  boolean,
  Omit<ISwitchProps, 'checked'>
>;

function renderSwitch(
  childProps: IFormFieldChildProps<boolean>,
  props: IFormSwitchFieldProps
) {
  const { value, ...passedProps } = childProps;
  return <Switch {...props.props} {...passedProps} checked={value} />;
}

function switchDefaultValue(
  props: $MergeParams<IFormSwitchFieldProps>
): boolean {
  if (typeof props.defaultValue === 'boolean') {
    return props.defaultValue;
  }
  return false;
}

export const FormSwitchField: React.FunctionComponent<
  IFormSwitchFieldProps
> = props => {
  return (
    <FormField
      {...props}
      defaultValue={switchDefaultValue(props as $MergeParams<
        IFormSwitchFieldProps
      >)}
    >
      {childProps => renderSwitch(childProps, props)}
    </FormField>
  );
};
