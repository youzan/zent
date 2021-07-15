import cx from 'classnames';
import Switch, { ISwitchProps } from '../../switch';
import { IFormComponentProps, IFormFieldChildProps } from '../shared';
import { FormField } from '../Field';

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

export const FormSwitchField: React.FunctionComponent<IFormSwitchFieldProps> =
  props => {
    const { className, ...rest } = props;

    return (
      <FormField
        {...rest}
        className={cx(className, 'zent-form-switch-field')}
        defaultValue={
          typeof props.defaultValue === 'boolean' ? props.defaultValue : false
        }
      >
        {childProps => renderSwitch(childProps, props)}
      </FormField>
    );
  };
