import warning from '../utils/warning';

export type $MergeParams<T> = (T extends any ? (t: T) => void : never) extends (
  t: infer V
) => void
  ? V
  : never;

export function warningIncorrectDefaultValueProp(
  condition: boolean,
  propsPropName: string,
  fieldCompName: string
) {
  warning(
    condition,
    `Do not use 'props.${propsPropName}' in '${fieldCompName}'.\nForm fields are controlled components, use 'defaultValue' prop on the field to set default value.`
  );
}
