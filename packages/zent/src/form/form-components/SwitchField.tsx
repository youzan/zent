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

export const FormSwitchField: React.FunctionComponent<
  IFormSwitchFieldProps
> = props => {
  return (
    <FormField
      {...props}
      defaultValue={
        typeof (props as $MergeParams<IFormSwitchFieldProps>).defaultValue ===
        'boolean'
          ? (props as $MergeParams<IFormSwitchFieldProps>).defaultValue
          : false
      }
    >
      {childProps => renderSwitch(childProps, props)}
    </FormField>
  );
};
