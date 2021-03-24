import { warningOnce } from '../utils/warningOnce';

export type $MergeParams<T> = (T extends any ? (t: T) => void : never) extends (
  t: infer V
) => void
  ? V
  : never;

export function warningDefaultValueProp(
  condition: boolean,
  propName: string,
  componentName: string
) {
  warningOnce(
    condition,
    `${componentName}-${propName}`,
    `Do not use 'props.${propName}' in '${componentName}'.\n` +
      `Form fields are controlled components, use 'defaultValue' prop in '${componentName}' to set default value.`
  );
}
