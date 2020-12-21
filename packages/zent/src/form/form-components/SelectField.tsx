import { IFormComponentProps, IFormFieldChildProps } from '../shared';
import Select, { ISelectProps, ISelectItem } from '../../select';
import { FormField } from '../Field';

export type IFormSelectFieldProps<
  Key extends string | number = string | number,
  T extends ISelectItem<Key> = ISelectItem<Key>
> = IFormComponentProps<
  (T | null) | T[],
  Omit<ISelectProps<Key, T>, 'value' | 'onChange'>
>;

function renderSelect(
  childProps: IFormFieldChildProps<any>,
  props: IFormSelectFieldProps<any>
) {
  return <Select {...(props.props as any)} {...childProps} />;
}

export function FormSelectField<
  Key extends string | number = string | number,
  T extends ISelectItem<Key> = ISelectItem<Key>
>(props: IFormSelectFieldProps<Key, T>) {
  return (
    <FormField
      {...props}
      defaultValue={props.defaultValue ?? (props.props?.multiple ? [] : null)}
    >
      {childProps => renderSelect(childProps, props)}
    </FormField>
  );
}
