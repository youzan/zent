import { isValidElementType } from 'react-is';

export function validElementType<T extends {}>(props: T, propName: string, componentName: string) {
  if (!isValidElementType(props[propName])) {
    return new Error(
      `Invalid prop '${propName}' is supplied to '${componentName}'  . Validation failed.`
    );
  }
}
