import warning from '../utils/warning';

export type $MergeParams<T> = (T extends any ? (t: T) => void : never) extends (
  t: infer V
) => void
  ? V
  : never;

export function warningUncontrolledComponentProp(
  condition: boolean,
  propsPropName: string
) {
  warning(
    condition,
    `Not use 'props.${propsPropName}' prop because Form Field's value must be controlled, it will be ineffective or emit some Error, You can use 'Form.initialize' method or 'defaultValue' prop on Field to initialize Field value`
  );
}
